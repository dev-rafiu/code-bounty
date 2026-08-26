import { useParams } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";
import { SubmitSolutionForm } from "../components/SubmitSolutionForm";
import { SubmitSolutionLoadingState } from "../components/SubmitSolutionLoadingState";
import { SubmitSolutionNotFoundState } from "../components/SubmitSolutionNotFoundState";
import { SubmitSolutionUnauthenticatedState } from "../components/SubmitSolutionUnauthenticatedState";
import { useGetBountyByID } from "../hooks/useBounty";

export const SubmitSolutionPage = () => {
  const { bountyId } = useParams();
  const { user } = useAppContext();

  const { data: bounty, isLoading } = useGetBountyByID();

  if (!user?.success) return <SubmitSolutionUnauthenticatedState />;

  if (isLoading) return <SubmitSolutionLoadingState />;

  if (!bounty || !bountyId) return <SubmitSolutionNotFoundState />;

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="">
          <h1 className="text-heading text-3xl font-bold">
            Submit Your Solution
          </h1>
          <p className="text-body">
            Submit your solution to win {bounty.bountyBTC} BTC
          </p>
        </header>

        <SubmitSolutionForm bounty={bounty} bountyID={bountyId} />
      </div>
    </main>
  );
};
