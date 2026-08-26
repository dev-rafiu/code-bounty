import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../hooks/useAppContext";
import { submissionService } from "../../../services/submissions/submissionService";
import type { UserData } from "../../auth/types";
import type { SubmissionRecord } from "../types";

const fetchCompanySubmissions = async (
  currentUser: UserData | null,
): Promise<SubmissionRecord[]> => {
  if (!currentUser) {
    throw new Error("You must be signed in to view submissions.");
  }

  if (currentUser.role !== "COMPANY") {
    throw new Error("Only companies can view submissions.");
  }

  const result = await submissionService.getSubmissionsForCompany(
    currentUser.uid,
  );

  if (result.success && result.submissions) {
    return result.submissions as SubmissionRecord[];
  }

  if (result.success) {
    return [];
  }

  throw new Error(result.error || "Failed to fetch submissions");
};

export const useCompanySubmissions = () => {
  const { user } = useAppContext();
  const currentUser = user?.success ? user.user : null;

  const accessMessage = !currentUser
    ? "You must be signed in to view submissions."
    : currentUser.role !== "COMPANY"
      ? "Only companies can view submissions."
      : null;

  const query = useQuery<SubmissionRecord[]>({
    queryKey: ["company-submissions", currentUser?.uid],
    enabled: !!currentUser && currentUser.role === "COMPANY",
    queryFn: () => fetchCompanySubmissions(currentUser),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    submissions: query.data ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    accessMessage,
  };
};
