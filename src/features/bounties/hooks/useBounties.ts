import { useQuery } from "@tanstack/react-query";
import { bountyService } from "../../../services/bounties/bountyService";
import type { TBounty } from "../types";

const transformBounty = (doc: any): TBounty => {
  return {
    id: doc.id,
    title: doc.title || "",
    description: doc.description || "",
    bountyBTC: doc.bountyBTC || 0,
    category: doc.category || "",
    difficulty: doc.difficulty || "",
    company: doc.companyName || "",
    companyUid: doc.companyUid,
    submissions: doc.submissions || 0,
    deadline: doc.deadline || "",
    status: doc.status || "open",
  };
};

export const useBounties = () => {
  return useQuery<TBounty[], Error>({
    queryKey: ["bounties"],
    queryFn: async () => {
      const response = await bountyService.getAllBounties();

      if (response.success && response.bounties) {
        return response.bounties.map(transformBounty);
      }

      throw new Error(response.error || "Failed to load bounties");
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
