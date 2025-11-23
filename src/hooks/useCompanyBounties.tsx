import { useQuery } from "@tanstack/react-query";
import { bountyService } from "../services/bounties/bountyService";

export interface Bounty {
  id: string;
  title: string;
  description: string;
  bountyBTC: number;
  category: string;
  difficulty: string;
  company: string;
  deadline: string;
}

export function useGetCompanyBounties(
  uid: string | undefined,
  user: { success: boolean } | null,
) {
  return useQuery<Bounty[], Error>({
    queryKey: ["companyBounties", uid],
    queryFn: async () => {
      if (!user?.success) {
        throw new Error("User not authenticated");
      }

      const response = await bountyService.getBountiesByCompanyId(
        uid as string,
      );

      if (response.success && response.bounties) {
        return response.bounties.map((bounty: any) => ({
          id: bounty.id,
          title: bounty.title,
          description: bounty.description || "",
          bountyBTC: bounty.bountyBTC || 0.001,
          category: bounty.category || "",
          difficulty: bounty.difficulty || "",
          company: bounty.companyName || "",
          deadline: bounty.deadline || "",
        }));
      }

      throw new Error(response.error || "Failed to load bounties");
    },

    enabled: !!uid && !!user,
  });
}
