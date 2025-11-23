import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { COLLECTIONS } from "../firestore-structure";
import { toast } from "sonner";

type CreateBountyPayload = {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  bountyBTC: number;
  deadline: string;
};

class BountyService {
  async createBounty({
    title,
    description,
    category,
    difficulty,
    bountyBTC,
    deadline,
  }: CreateBountyPayload): Promise<
    { success: true } | { success: false; error: string }
  > {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return { success: false, error: "User profile not found" };
      }

      const userData = userSnap.data();

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
        bountyData,
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

  async getAllBounties() {
    try {
      const bountyCollection = collection(db, COLLECTIONS.BOUNTIES);
      const snapshot = await getDocs(bountyCollection);

      const bounties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        bounties,
      };
    } catch (error: any) {
      console.error("Error fetching bounties:", error);
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
        where("companyUid", "==", companyUid),
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

      const userData = userSnap.data();

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
}

export const bountyService = new BountyService();
