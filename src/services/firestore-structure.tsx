// firestore-structure.js - Database schema and structure

/* 
FIRESTORE COLLECTIONS STRUCTURE:

1. users/{userId}
{
  uid: string,
  email: string,
  role: 'developer' | 'company',
  name: string,
  companyName?: string, // only for companies
  bitcoinAddress?: string,
  lightningAddress?: string,
  profilePicture?: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  stats: {
    bountiesPosted?: number, // for companies
    bountiesWon?: number, // for developers
    totalEarned?: number, // in BTC for developers
    totalSpent?: number // in BTC for companies
  }
}

2. bounties/{bountyId}
{
  id: string,
  title: string,
  description: string,
  type: 'coding' | 'data-analysis' | 'blockchain' | 'other',
  requirements: string,
  tags: string[],
  bountyAmount: number, // in BTC
  currency: 'BTC',
  status: 'open' | 'in-progress' | 'completed' | 'cancelled',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  estimatedTime: string, // e.g., "2-4 hours"
  deadline: timestamp,
  createdBy: string, // company userId
  createdAt: timestamp,
  updatedAt: timestamp,
  submissionCount: number,
  winnerId?: string, // developer userId who won
  winnerSubmissionId?: string,
  paymentStatus: 'pending' | 'paid' | 'failed',
  transactionHash?: string,
  attachments?: string[], // file URLs
  submissionInstructions: string
}

3. submissions/{submissionId}
{
  id: string,
  bountyId: string,
  developerId: string,
  developerName: string,
  submittedAt: timestamp,
  status: 'submitted' | 'reviewed' | 'winner' | 'rejected',
  githubRepo?: string,
  liveDemo?: string,
  description: string,
  files?: string[], // uploaded file URLs
  submissionHash: string, // for verification
  reviewNotes?: string, // company feedback
  reviewedAt?: timestamp,
  score?: number // optional scoring system
}

4. transactions/{transactionId}
{
  id: string,
  type: 'bounty_payment' | 'platform_fee',
  bountyId: string,
  fromUserId: string,
  toUserId: string,
  amount: number,
  currency: 'BTC',
  status: 'pending' | 'completed' | 'failed',
  transactionHash?: string,
  lightningInvoice?: string,
  createdAt: timestamp,
  completedAt?: timestamp,
  failureReason?: string
}

5. notifications/{notificationId}
{
  id: string,
  userId: string,
  type: 'new_bounty' | 'submission_received' | 'bounty_won' | 'payment_sent' | 'payment_received',
  title: string,
  message: string,
  isRead: boolean,
  relatedBountyId?: string,
  relatedSubmissionId?: string,
  createdAt: timestamp
}
*/

// Collection names as constants
export const COLLECTIONS = {
  USERS: "users",
  BOUNTIES: "bounties",
  SUBMISSIONS: "submissions",
  TRANSACTIONS: "transactions",
  COMPANIES: "companies",
};

// Status constants
export const BOUNTY_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const SUBMISSION_STATUS = {
  SUBMITTED: "submitted",
  REVIEWED: "reviewed",
  WINNER: "winner",
  REJECTED: "rejected",
};

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};

export const USER_ROLES = {
  DEVELOPER: "developer",
  COMPANY: "company",
};

export const BOUNTY_TYPES = {
  CODING: "coding",
  DATA_ANALYSIS: "data-analysis",
  BLOCKCHAIN: "blockchain",
  OTHER: "other",
};
