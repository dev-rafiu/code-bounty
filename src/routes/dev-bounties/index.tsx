import { BountyCard } from "./DevBountyCard";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { COLLECTIONS } from "../../services/firestore-structure";
import { toast } from "sonner";
import { useAppContext } from "../../hooks/useAppContext";
import { Navigate } from "react-router-dom";

export const DevBountiesPage = () => {
  const [bounties, setBounties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAppContext();

  useEffect(() => {
    const fetchBounties = async () => {
      setLoading(true);
      try {
        const bountyCollection = collection(db, COLLECTIONS.BOUNTIES);
        const snapshot = await getDocs(bountyCollection);
        const fetchedBounties = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // use Firestore doc id as id
            title: data.title,
            description: data.description || "", // add fallback if missing
            bountyBTC: data.bountyBTC || 0, // adjust these fields to match your data
            bountyUSD: data.bountyUSD || 0,
            category: data.category || "",
            difficulty: data.difficulty || "",
            company: data.companyName || "", // assuming companyName in your data
            submissions: data.submissions || 0,
            deadline: data.deadline || "",
            status: data.status || "open",
          };
        });

        setBounties(fetchedBounties);
      } catch (err) {
        toast.error(`Failed to fetch bounties, ${err} `);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  return !user?.success ? (
    <Navigate to="/" />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8 gap-6 flex-wrap">
          <div className="space-y-2 mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">
              Active Bounties
            </h1>
            <p className="text-gray-600 mt-1">
              Choose your next challenge and earn Bitcoin
            </p>
          </div>

          {/* 
          <div className="items-center space-x-4 hidden">
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Categories</option>
              <option>Coding</option>
              <option>Data Analysis</option>
              <option>Blockchain</option>
            </select>

            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Difficulties</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div> */}
        </header>

        {loading && (
          <div className="text-center text-gray-500">Loading bounties...</div>
        )}

        {!loading && bounties.length === 0 && (
          <div className="text-center text-gray-500">
            No bounties available at the moment.
          </div>
        )}

        {!loading && bounties.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
            {bounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
