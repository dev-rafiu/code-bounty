import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { COLLECTIONS, USER_ROLES } from "./firestore-structure";

import type {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
  UserData,
} from "../definitions/auth";
import { toast } from "sonner";

class AuthService {
  async signUp({
    email,
    password,
    name,
    companyName,
    role,
  }: SignUpPayload): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: role === USER_ROLES.COMPANY ? companyName : name,
      });

      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        role,
        createdAt: serverTimestamp(),
      };

      if (role === "COMPANY") {
        userData.companyName = companyName;
      } else if (role === "DEVELOPER") {
        userData.name = name;
      }

      await setDoc(doc(db, COLLECTIONS.USERS, user.uid), userData);

      return {
        success: true,
        user: {
          ...userData,
          displayName: user.displayName,
        },
      };
    } catch (error: any) {
      let errorMessage = error.message;

      // Handle specific Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "An account with this email already exists. Please try signing in instead.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async signIn({ email, password }: SignInPayload): Promise<AuthResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
      if (!userDoc.exists()) throw new Error("User profile not found");

      const userData = userDoc.data() as UserData;

      return {
        success: true,
        user: {
          ...userData,
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
        },
      };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async signOut(): Promise<
    { success: true } | { success: false; error: string }
  > {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error("Sign out error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getCurrentUserData(): Promise<
    (UserData & { displayName?: string | null }) | null
  > {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));
      if (!userDoc.exists()) return null;

      const userData = userDoc.data() as UserData;
      return {
        ...userData,
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error("Get user data error:", error);
      return null;
    }
  }

  onAuthStateChange(
    callback: (
      user: (UserData & { displayName?: string | null }) | null
    ) => void
  ) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await this.getCurrentUserData();
        callback(userData);
      } else {
        callback(null);
      }
    });
  }

  async updateUserProfile(
    updates: Partial<
      Omit<UserData, "uid" | "email" | "createdAt" | "stats">
    > & { displayName?: string }
  ): Promise<{ success: true } | { success: false; error: string }> {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    try {
      await setDoc(
        doc(db, COLLECTIONS.USERS, user.uid),
        {
          ...updates,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      if (updates.name || updates.companyName) {
        await updateProfile(user, {
          displayName: updates.companyName || updates.name || "",
        });
      }

      return { success: true };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async submitSolution({
    githubUrl,
    bitcoinAddress,
    bountyId,
  }: {
    githubUrl: string;
    bitcoinAddress: string;
    bountyId: string;
  }): Promise<{ success: true } | { success: false; error: string }> {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return { success: false, error: "User profile not found" };
      }

      const userData = userSnap.data() as UserData;

      if (userData.role !== "DEVELOPER") {
        return {
          success: false,
          error: "Only developers can submit solutions",
        };
      }

      const submissionData = {
        bountyId,
        githubUrl,
        bitcoinAddress,
        developerUid: user.uid,
        createdAt: serverTimestamp(),
      };

      const submissionRef = await addDoc(
        collection(db, COLLECTIONS.SUBMISSIONS),
        submissionData
      );
      console.log(submissionRef.id, "Submission created with ID");

      return { success: true };
    } catch (error: any) {
      console.error("Submit solution error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createBounty({
    title,
    description,
    category,
    difficulty,
    bountyBTC,
    deadline,
  }: {
    title: string;
    description: string;
    category: string;
    difficulty: string;
    bountyBTC: number;
    deadline: string;
  }): Promise<{ success: true } | { success: false; error: string }> {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return { success: false, error: "User profile not found" };
      }

      const userData = userSnap.data() as UserData;

      if (userData.role !== "COMPANY") {
        toast.error("not company");
        return { success: false, error: "Only companies can create bounties" };
      }

      const bountyData = {
        title,
        description,
        category,
        difficulty,
        bountyBTC,
        deadline,
        companyName: userData.companyName,
        companyUid: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      //doc ref
      const docRef = await addDoc(
        collection(db, COLLECTIONS.BOUNTIES),
        bountyData
      );
      console.log("Bounty created with ID:", docRef.id);
      return { success: true };
    } catch (error: any) {
      console.error("Create bounty error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getBountyById(bountyId: string) {
    try {
      const bountyDocRef = doc(db, COLLECTIONS.BOUNTIES, bountyId);
      const bountySnap = await getDoc(bountyDocRef);

      if (!bountySnap.exists()) {
        return {
          success: false,
          error: "Bounty not found",
        };
      }

      const bountyData = bountySnap.data();

      return {
        success: true,
        bounty: {
          id: bountySnap.id,
          ...bountyData,
        },
      };
    } catch (error: any) {
      console.error("Error fetching bounty:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getBountiesByCompanyId(companyUid: string) {
    try {
      const bountiesQuery = query(
        collection(db, COLLECTIONS.BOUNTIES),
        where("companyUid", "==", companyUid)
      );

      const querySnapshot = await getDocs(bountiesQuery);

      const bounties = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        bounties,
      };
    } catch (error: any) {
      console.error("Error fetching company bounties:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getCompanyById(companyUid: string) {
    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, companyUid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return {
          success: false,
          error: "Company not found",
        };
      }

      const userData = userSnap.data() as UserData;

      if (userData.role !== "COMPANY") {
        return {
          success: false,
          error: "User is not a company",
        };
      }

      return {
        success: true,
        company: {
          id: userSnap.id,
          ...userData,
        },
      };
    } catch (error: any) {
      console.error("Error fetching company details:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getSubmissionsByDeveloperId(developerUid: string) {
    try {
      const submissionsQuery = query(
        collection(db, COLLECTIONS.SUBMISSIONS),
        where("developerUid", "==", developerUid)
      );

      const querySnapshot = await getDocs(submissionsQuery);

      const submissions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        submissions,
      };
    } catch (error: any) {
      console.error("Error fetching developer submissions:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getDeveloperById(developerUid: string) {
    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, developerUid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return {
          success: false,
          error: "Developer not found",
        };
      }

      const userData = userSnap.data() as UserData;

      // Verify that this user is actually a developer
      if (userData.role !== "DEVELOPER") {
        return {
          success: false,
          error: "User is not a developer",
        };
      }

      return {
        success: true,
        developer: {
          id: userSnap.id,
          ...userData,
        },
      };
    } catch (error: any) {
      console.error("Error fetching developer details:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getSubmissionsForCompany(companyUid: string) {
    try {
      const companyBountiesResult = await this.getBountiesByCompanyId(
        companyUid
      );

      if (!companyBountiesResult.success || !companyBountiesResult.bounties) {
        return {
          success: false,
          error: "Failed to fetch company bounties",
        };
      }

      const bountyIds = companyBountiesResult.bounties.map(
        (bounty) => bounty.id
      );

      if (bountyIds.length === 0) {
        return {
          success: true,
          submissions: [],
        };
      }

      const submissionsQuery = query(
        collection(db, COLLECTIONS.SUBMISSIONS),
        where("bountyId", "in", bountyIds)
      );

      const querySnapshot = await getDocs(submissionsQuery);

      const submissionsWithDetails = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const submissionData = doc.data();

          const bountyResult = await this.getBountyById(
            submissionData.bountyId
          );

          // FIX: Use getDeveloperById instead of getCompanyById
          const developerResult = await this.getDeveloperById(
            submissionData.developerUid
          );

          return {
            id: doc.id,
            ...submissionData,
            bountyDetails: bountyResult.success ? bountyResult.bounty : null,
            developerDetails: developerResult.success
              ? developerResult.developer
              : null,
          };
        })
      );

      return {
        success: true,
        submissions: submissionsWithDetails,
      };
    } catch (error: any) {
      console.error("Error fetching company submissions:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const authService = new AuthService();
