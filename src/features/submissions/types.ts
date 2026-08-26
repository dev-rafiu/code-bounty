export type SubmitSolutionPayload = {
  githubUrl: string;
  bitcoinAddress: string;
  bountyID: string;
};

export type SubmissionRecord = {
  id: string;
  bountyId: string;
  githubUrl: string;
  bitcoinAddress: string;
  createdAt?: any;
  status?: string;
  developerUid?: string;
  bountyDetails?: Record<string, any> | null;
  developerDetails?: Record<string, any> | null;
  [key: string]: any;
};
