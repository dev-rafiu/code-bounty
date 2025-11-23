import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { bountyService } from "../../../services/bounties/bountyService";
import type { TBounty } from "../../bounties/types";

export const useBounty = (bountyId?: string) => {
  const navigate = useNavigate();
  const [bounty, setBounty] = useState<TBounty | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBounty = async () => {
      if (!bountyId) {
        toast.error("No bounty ID provided");
        navigate("/dev-bounties");
        return;
      }

      setIsLoading(true);
      const result = await bountyService.getBountyById(bountyId);

      if (result.success && result.bounty) {
        setBounty(result.bounty as TBounty);
      } else {
        toast.error(result.error || "Failed to fetch bounty");
        navigate("/dev-bounties");
      }
      setIsLoading(false);
    };

    fetchBounty();
  }, [bountyId, navigate]);

  return { bounty, isLoading };
};

