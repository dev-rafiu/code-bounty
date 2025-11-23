import { useState, type FormEvent } from "react";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useSubmitSolution } from "../hooks/useSubmitSolution";
import type { TBounty } from "../../bounties/types";

type SubmitSolutionFormProps = {
  bounty: TBounty;
  bountyId: string;
};

export const SubmitSolutionForm = ({
  bounty,
  bountyId,
}: SubmitSolutionFormProps) => {
  const [repoURL, setRepoURL] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  const navigate = useNavigate();
  const { submitSolution, isSubmitting } = useSubmitSolution();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!repoURL || !btcAddress) {
      toast.error("Please fill in all fields.");
      return;
    }

    const result = await submitSolution({
      githubUrl: repoURL,
      bitcoinAddress: btcAddress,
      bountyId,
    });

    if (result) {
      setRepoURL("");
      setBtcAddress("");
    }
  };

  const formatDeadline = (deadline: string) => {
    try {
      return new Date(deadline).toLocaleDateString();
    } catch {
      return deadline;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 shadow-md">
      <div className="bg-primary-50 border-primary-200 mb-6 rounded-lg border p-4">
        <h3 className="text-primary-800 mb-1 font-semibold">
          Challenge: {bounty.title}
        </h3>
        <p className="text-primary-700 text-sm">
          Bounty: {bounty.bountyBTC} BTC • Deadline:{" "}
          {formatDeadline(bounty.deadline)}
        </p>
      </div>

      <div className="space-y-6">
        {/* github url */}
        <div className="space-y-2">
          <Label htmlFor="github-url">GitHub Repository URL</Label>
          <div className="relative">
            <Github className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="github-url"
              type="url"
              value={repoURL}
              onChange={(e) => setRepoURL(e.target.value)}
              className="pl-10"
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        {/* Bitcoin Address */}
        <div className="space-y-2">
          <Label htmlFor="btc-address">Submit hash</Label>
          <Input
            id="btc-address"
            type="text"
            value={btcAddress}
            onChange={(e) => setBtcAddress(e.target.value)}
            placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dev-bounties")}
            size="lg"
          >
            Back to Bounties
          </Button>
        </div>
      </div>
    </form>
  );
};
