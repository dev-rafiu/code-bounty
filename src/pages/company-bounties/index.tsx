import { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { Link } from "react-router-dom";

import { Bitcoin, Plus, Users } from "lucide-react";
import { useGetCompanyBounties } from "../../hooks/useCompanyBounties";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const CompanyBounties = () => {
  const [_category, setCategory] = useState<string>("all");
  const [_difficulty, setDifficulty] = useState<string>("all");

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Bounties</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Select
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className="rounded-lg border border-gray-300 px-3 py-2">
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
              <SelectTrigger className="rounded-lg border border-gray-300 px-3 py-2">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Button asChild>
              <Link to="/company-bounties/create">
                <Plus className="h-4 w-4" />
                Create Bounty
              </Link>
            </Button>
          </div>
        </header>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-1">
          {bounties.map((bounty) => {
            return (
              <div
                key={bounty.id}
                className="border-primary-400 rounded-lg border-l-4 bg-white p-6 shadow-md"
              >
                <header className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {bounty.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
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

                <p className="mb-4 line-clamp-3 text-gray-600">
                  {bounty.description}
                </p>

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-primary-600 flex items-center">
                      <Bitcoin className="mr-1 h-5 w-5" />
                      <span className="font-bold">{bounty.bountyBTC} BTC</span>
                    </div>
                    {/* <span className="text-gray-500">(≈ ${bounty.bountyUSD})</span> */}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-1 h-4 w-4" />
                    {/* {bounty.submissions} */}
                    submissions
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                  {/* <span>By {bounty.}</span> */}
                  <span>Deadline: {bounty.deadline}</span>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="bg-primary text-primary-foreground hover:bg-primary-hover flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 transition-colors">
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
