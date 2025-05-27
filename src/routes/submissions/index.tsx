import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
// Update with correct path

// interface Submission {
//   id: string;
//   bountyId: string;
//   githubUrl: string;
//   bitcoinAddress: string;
//   developerUid: string;
//   createdAt: any;
// }

function Submissions() {
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

        if (currentUser.role !== "DEVELOPER") {
          setError("Only developers can view submissions");
          return;
        }

        // Fetch submissions for current developer
        const result = await authService.getSubmissionsByDeveloperId(
          currentUser.uid
        );

        if (result.success && result.submissions) {
          console.log(result.submissions, "Fetched submissions");

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
          You haven't submitted any solutions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Submissions</h2>

      <ul className="space-y-4">
        {submissions.map((submission) => (
          <li
            key={submission.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submission ID: {submission.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Bounty ID: {submission.bountyId}
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  {submission.createdAt?.toDate
                    ? submission.createdAt.toDate().toLocaleDateString()
                    : "Date not available"}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    GitHub URL:
                  </span>
                  <a
                    href={submission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {submission.githubUrl}
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
