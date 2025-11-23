import { useParams } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { SubmitSolutionForm, useBounty } from "../../features/submissions";

export const SubmitSolutionPage = () => {
  const { bountyId } = useParams<{ bountyId: string }>();
  const { user } = useAppContext();
  const { bounty, isLoading } = useBounty(bountyId);

  if (!user?.success) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-heading mb-2 text-2xl font-bold">
            Authentication Required
          </h2>
          <p className="text-body">
            You must be logged in to submit a solution.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-body">Loading...</div>
      </div>
    );
  }

  if (!bounty || !bountyId) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-heading mb-2 text-2xl font-bold">
            Bounty not found
          </h2>
          <p className="text-body">
            The bounty you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header>
          <h1 className="text-heading mb-2 text-3xl font-bold">
            Submit Your Solution
          </h1>
          <p className="text-body mb-8">
            Submit your solution to win {bounty.bountyBTC} BTC
          </p>
        </header>

        <SubmitSolutionForm bounty={bounty} bountyId={bountyId} />
      </div>
    </div>
  );
};
