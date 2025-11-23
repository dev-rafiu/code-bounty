import { useState } from "react";

import { Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { BountyCard, useBounties } from "../../features/bounties";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const DevBountiesPage = () => {
  const { user } = useAppContext();
  const { data: bounties = [], isLoading: loading, error } = useBounties();
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");

  return !user?.success ? (
    <Navigate to="/" />
  ) : (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-body">
            Choose your next challenge and earn Bitcoin
          </p>

          {/* filters */}
          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-card w-full py-5 sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
                <SelectItem value="data-analysis">Data Analysis</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="bg-card w-full py-5 sm:w-[180px]">
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

        {loading && (
          <div className="text-muted-foreground text-center">
            Loading bounties...
          </div>
        )}

        {error && (
          <div className="text-destructive text-center">
            {error.message || "Failed to load bounties"}
          </div>
        )}

        {!loading && !error && bounties.length === 0 && (
          <div className="text-muted-foreground text-center">
            No bounties available at the moment.
          </div>
        )}

        {!loading && !error && bounties.length > 0 && (
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-1">
            {bounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
