import { submissionService } from "../../../services/submissions/submissionService";

import { useMutation } from "@tanstack/react-query";
import type { SubmitSolutionPayload } from "../types";

async function submitSolution({
  bitcoinAddress,
  bountyID,
  githubUrl,
}: SubmitSolutionPayload) {
  const result = await submissionService.submitSolution({
    githubUrl,
    bitcoinAddress,
    bountyID,
  });

  return result;
}

export const useSubmitSolution = () => {
  return useMutation({
    mutationFn: submitSolution,
  });
};
