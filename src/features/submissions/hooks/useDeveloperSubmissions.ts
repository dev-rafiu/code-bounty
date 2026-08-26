import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../hooks/useAppContext";
import { submissionService } from "../../../services/submissions/submissionService";
import type { UserData } from "../../auth/types";
import type { SubmissionRecord } from "../types";

const fetchDeveloperSubmissions = async (
  currentUser: UserData | null,
): Promise<SubmissionRecord[]> => {
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  if (currentUser.role !== "DEVELOPER") {
    throw new Error("Only developers can view submissions");
  }

  const result = await submissionService.getSubmissionsByDeveloperId(
    currentUser.uid,
  );

  if (result.success && result.submissions) {
    return result.submissions as SubmissionRecord[];
  }

  if (result.success) return [];

  throw new Error(result.error || "Failed to fetch submissions");
};

export const useDeveloperSubmissions = () => {
  const { user } = useAppContext();
  const currentUser = user?.success ? user.user : null;

  const accessMessage = !currentUser
    ? "User not authenticated"
    : currentUser.role !== "DEVELOPER"
      ? "Only developers can view submissions"
      : null;

  const query = useQuery<SubmissionRecord[]>({
    queryKey: ["developer-submissions", currentUser?.uid],
    queryFn: () => fetchDeveloperSubmissions(currentUser),
    enabled: !!currentUser && currentUser.role === "DEVELOPER",
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
