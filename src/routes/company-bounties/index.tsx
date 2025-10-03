import { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";

import { Bitcoin, Users } from "lucide-react";
import { useGetCompanyBounties } from "../../hooks/useCompanyBounties";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const CompanyBounties = () => {
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  const { user } = useAppContext();

  const uid = user?.success && user?.user?.uid;

  const { data: bounties, isPending: isBountiesPending } =
    useGetCompanyBounties(uid as string, user ?? null);

  if (!bounties || isBountiesPending) {
    return (
      <div className="">
        <LoadingIndicator />
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8 gap-6 flex-wrap">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Bounties</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Select
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-lg">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="data-analysis">Data Analysis</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => {
                setDifficulty(value);
              }}
            >
              <SelectTrigger className="px-3 py-2 border border-gray-300 rounded-lg">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

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
                      <span className="font-bold">{bounty.bountyBTC} BTC</span>
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
      </div>
    </div>
  );
};
