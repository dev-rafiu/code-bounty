import { useParams } from "react-router-dom";
import { bountyService } from "../../../services/bounties/bountyService";
import type { TBounty } from "../../bounties/types";
import { useQuery } from "@tanstack/react-query";

const getBountyByID = async (bountyID: string) => {
  const result = await bountyService.getBountyByID(bountyID);
  return result.bounty as TBounty;
};

export const useGetBountyByID = () => {
  const { bountyId } = useParams();

  return useQuery({
    queryKey: ["bounty", bountyId],
    queryFn: () => getBountyByID(bountyId as string),
  });
};
