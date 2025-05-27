import { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import type { TBounty } from "../dev-bounties/DevBountyCard";
import { authService } from "../../services/authService";
import { Bitcoin, Users } from "lucide-react";

export const CompanyBounties = () => {
  const [bounties, setBounties] = useState<TBounty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAppContext();

  const uid = user?.success && user?.user?.uid;

  useEffect(() => {
    const fetchCompanyBounties = async () => {
      if (!user?.success) return;

      setLoading(true);

      const response = await authService.getBountiesByCompanyId(uid as string);

      if (response.success && response.bounties) {
        const fetchedBounties = response.bounties.map((bounty: any) => ({
          id: bounty.id,
          title: bounty.title,
          description: bounty.description || "",
          bountyBTC: bounty.bountyBTC || 0.001,
          category: bounty.category || "",
          difficulty: bounty.difficulty || "",
          company: bounty.companyName || "",
          deadline: bounty.deadline || "",
        }));

        setBounties(fetchedBounties);
        setError(null);
      } else {
        console.error(response.error);
        setError("Failed to load bounties.");
      }

      setLoading(false);
    };

    fetchCompanyBounties();
  }, [user?.success, uid]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8 gap-6 flex-wrap">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Active Bounties
            </h1>
            <p className="text-gray-600 mt-1">
              Choose your next challenge and earn Bitcoin
            </p>
          </div>

          <div className="flex items-center space-x-4">
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
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : bounties.length === 0 ? (
          <p className="text-center text-gray-500">No bounties found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
            {bounties.map((bounty) => {
              return (
                <div
                  key={bounty.id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400"
                >
                  <header className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {bounty.title}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        bounty.difficulty === "beginner"
                          ? "bg-green-100 text-green-800"
                          : bounty.difficulty === "intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bounty.difficulty}
                    </span>
                  </header>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {bounty.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-orange-600">
                        <Bitcoin className="w-5 h-5 mr-1" />
                        <span className="font-bold">
                          {bounty.bountyBTC} BTC
                        </span>
                      </div>
                      {/* <span className="text-gray-500">(≈ ${bounty.bountyUSD})</span> */}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {/* {bounty.submissions} */}
                      submissions
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {/* <span>By {bounty.}</span> */}
                    <span>Deadline: {bounty.deadline}</span>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <button className=" bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                      Close bounty
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
