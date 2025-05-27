import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { toast } from "sonner";

import LoadingIndicator from "../../components/common/LoadingIndicator";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAppContext } from "../../hooks/useAppContext";

export const SubmitSolutionPage = () => {
  const [repoURL, setRepoURL] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bounty, setBounty] = useState<any>(null);
  const [isLoadingBounty, setIsLoadingBounty] = useState(true);

  const { bountyId } = useParams<{ bountyId: string }>();

  const navigate = useNavigate();

  const { user } = useAppContext();

  const useruid = user?.success ? user.user.uid : null;

  useEffect(() => {
    const fetchBounty = async () => {
      if (!bountyId) {
        toast.error("No bounty ID provided");
        navigate("/dev-bounties");
        return;
      }

      setIsLoadingBounty(true);
      const result = await authService.getBountyById(bountyId);

      if (result.success) {
        setBounty(result.bounty);
      } else {
        toast.error(result.error || "Failed to fetch bounty");
        navigate("/dev-bounties");
      }
      setIsLoadingBounty(false);
    };

    fetchBounty();
  }, [bountyId, navigate]);

  const reset = () => {
    setRepoURL("");
    setBtcAddress("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoURL || !btcAddress) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!bountyId) {
      toast.error("No bounty ID provided");
      return;
    }

    if (!useruid) {
      toast.error("You must be logged in to submit a solution");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        githubUrl: repoURL,
        bitcoinAddress: btcAddress,
        bountyId,
        useruid,
      };

      console.log(payload, "Payload to submit solution");

      const result = await authService.submitSolution(payload);

      if (result.success) {
        toast.success("Solution submitted successfully!");
        reset();
        navigate("/dev-bounties");
      } else {
        toast.error(result.error || "Failed to submit solution");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            You must be logged in to submit a solution.
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingBounty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bounty not found
          </h2>
          <p className="text-gray-600">
            The bounty you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const formatDeadline = (deadline: string) => {
    try {
      return new Date(deadline).toLocaleDateString();
    } catch {
      return deadline;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Your Solution
          </h1>
          <p className="text-gray-600 mb-8">
            Submit your solution to win {bounty.bountyBTC} BTC
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-orange-800 mb-1">
              Challenge: {bounty.title}
            </h3>
            <p className="text-orange-700 text-sm">
              Bounty: {bounty.bountyBTC} BTC • Deadline:{" "}
              {formatDeadline(bounty.deadline)}
            </p>
          </div>

          <div className="space-y-6">
            {/* github url */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository URL
              </label>

              <div className="relative">
                <Github className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="url"
                  value={repoURL}
                  onChange={(e) => setRepoURL(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            {/* Bitcoin Address */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submit hash
              </label>
              <input
                type="text"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? <LoadingIndicator /> : "Submit Solution"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dev-bounties")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Back to Bounties
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
