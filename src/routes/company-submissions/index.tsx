import { useState, useEffect } from "react";
import {
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { authService } from "../../services/authService";

function CompanySubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);

        // Get current user data first
        const currentUser = await authService.getCurrentUserData();

        if (!currentUser) {
          setError("User not authenticated");
          return;
        }

        if (currentUser.role !== "COMPANY") {
          setError("Only companies can view submissions");
          return;
        }

        // Fetch submissions for current company
        const result = await authService.getSubmissionsForCompany(
          currentUser.uid
        );

        if (result.success && result.submissions) {
          console.log(result.submissions, "Fetched company submissions");
          setSubmissions(result.submissions);
        } else if (result.success) {
          setSubmissions([]);
        } else {
          setError(result.error || "Failed to fetch submissions");
        }
      } catch (err) {
        setError("Failed to fetch submissions");
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading submissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-500 mb-4">No submissions found</div>
        <p className="text-sm text-gray-400">
          Submissions made to your company's bounties will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Developer Submissions
      </h2>

      <ul className="space-y-4">
        {submissions.map((submission) => (
          <li
            key={submission.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Submission ID: {submission.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Bounty ID: {submission.bountyId}
                </p>
                {submission.bountyDetails?.title && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Bounty:</span>{" "}
                    {submission.bountyDetails.title}
                  </p>
                )}
              </div>
              <div className="ml-4 flex flex-col items-end space-y-2">
                <div className="text-sm text-gray-400">
                  {submission.createdAt?.toDate
                    ? submission.createdAt.toDate().toLocaleDateString()
                    : "Date not available"}
                </div>
                {submission.status && (
                  <div className="flex items-center">
                    {getStatusIcon(submission.status)}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {submission.developerDetails && (
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-600">Developer:</span>
                  <span className="ml-2 text-gray-900">
                    {submission.developerDetails.name ||
                      submission.developerDetails.email ||
                      "Unknown Developer"}
                  </span>
                  {submission.developerDetails.email &&
                    submission.developerDetails.name && (
                      <span className="ml-1 text-gray-500">
                        ({submission.developerDetails.email})
                      </span>
                    )}
                </div>
              )}

              {submission.bountyDetails?.reward && (
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-600">Reward:</span>
                  <span className="ml-2 text-gray-900 font-semibold">
                    ${submission.bountyDetails.reward}
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    GitHub URL:
                  </span>
                  <a
                    href={submission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 underline break-all inline-flex items-center"
                  >
                    {submission.githubUrl}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Bitcoin Address:
                  </span>
                  <span className="ml-2 text-sm text-gray-900 font-mono break-all">
                    {submission.bitcoinAddress}
                  </span>
                </div>
              </div>

              {submission.bountyDetails?.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Bounty Description:</span>{" "}
                    {submission.bountyDetails.description}
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanySubmissions;
