import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submissionService } from "../../../services/submissions/submissionService";
import { useAppContext } from "../../../hooks/useAppContext";

export const useSubmitSolution = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSolution = async ({
    githubUrl,
    bitcoinAddress,
    bountyId,
  }: {
    githubUrl: string;
    bitcoinAddress: string;
    bountyId: string;
  }) => {
    if (!user?.success) {
      toast.error("You must be logged in to submit a solution");
      return false;
    }

    setIsSubmitting(true);

    try {
      const result = await submissionService.submitSolution({
        githubUrl,
        bitcoinAddress,
        bountyId,
      });

      if (result.success) {
        toast.success("Solution submitted successfully!");
        navigate("/dev-bounties");
        return true;
      } else {
        toast.error(result.error || "Failed to submit solution");
        return false;
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitSolution, isSubmitting };
};

