import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import { COLLECTIONS, USER_ROLES } from "../firestore-structure";

import type {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
  UserData,
} from "../../types/auth";
import { toast } from "sonner";

class AuthService {
  async signUp({
    email,
    password,
    name,
    companyName,
    role,
  }: SignUpPayload): Promise<AuthResponse> {
    let userCredential: any = null;

    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
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

      // Create user document in Firestore
      try {
        await setDoc(doc(db, COLLECTIONS.USERS, user.uid), userData);
      } catch (firestoreError: any) {
        console.error("Error creating user document:", firestoreError);
        // If Firestore write fails, delete the auth user to prevent orphaned accounts
        // Note: This requires additional permissions, so we'll just log and continue
        // The signIn method will handle creating the profile if it's missing
        toast.error(
          "Account created but profile setup incomplete. Please sign in to complete setup.",
        );
      }

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
      } else if (
        error.code === "permission-denied" ||
        error.message?.includes("permission")
      ) {
        errorMessage =
          "Permission denied. Please check your Firestore security rules.";
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
        password,
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, user.uid));

      if (!userDoc.exists()) {
        const basicUserData: UserData = {
          uid: user.uid,
          email: user.email!,
          role: "DEVELOPER",
          name: user.displayName || "User",
          createdAt: serverTimestamp(),
        };

        try {
          await setDoc(doc(db, COLLECTIONS.USERS, user.uid), basicUserData);

          return {
            success: true,
            user: {
              ...basicUserData,
              displayName: user.displayName,
            },
          };
        } catch (createError: any) {
          console.error("Error creating user profile:", createError);
          return {
            success: false,
            error:
              "Failed to create user profile. Please try signing up again.",
          };
        }
      }

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

      let errorMessage = error.message;
      if (error.code === "auth/user-not-found") {
        errorMessage =
          "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      return {
        success: false,
        error: errorMessage,
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
      user: (UserData & { displayName?: string | null }) | null,
    ) => void,
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
    > & { displayName?: string },
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
        { merge: true },
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
}

export const authService = new AuthService();
