export type UserRole = "DEVELOPER" | "COMPANY";

export interface SignUpPayload {
  email: string;
  role: UserRole;
  password: string;
  name?: string;
  companyName?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface UserStats {
  bountiesPosted?: number;
  bountiesWon?: number;
  totalEarned?: number;
  totalSpent?: number;
}

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  companyName?: string;
  createdAt?: any;
  updatedAt?: any;
  // stats?: UserStats;
}

export interface AuthResponseSuccess {
  success: true;
  user: UserData & {
    displayName?: string | null;
  };
}

export interface AuthResponseError {
  success: false;
  error: string;
}

export type AuthResponse = AuthResponseSuccess | AuthResponseError;
