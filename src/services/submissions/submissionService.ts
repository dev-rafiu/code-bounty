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
import { bountyService } from "../bounties/bountyService";

class SubmissionService {
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

      const userData = userSnap.data();

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

      const userData = userSnap.data();

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
      const companyBountiesResult = await bountyService.getBountiesByCompanyId(
        companyUid
      );

      if (!companyBountiesResult.success || !companyBountiesResult.bounties) {
        return {
          success: false,
          error: "Failed to fetch company bounties",
        };
      }

      const bountyIds = companyBountiesResult.bounties.map(
        (bounty: any) => bounty.id
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

          const bountyResult = await bountyService.getBountyById(
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

export const submissionService = new SubmissionService();

