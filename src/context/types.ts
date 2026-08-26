import type { AuthResponse } from "../features/auth/types";
import type { TBounty } from "../features/bounties/types";

export type AppContextType = {
  currentView: string;
  setCurrentView: (arg: string) => void;

  user: AuthResponse | null;
  setUser: (arg: AuthResponse | null) => void;

  selectedBounty: TBounty | null;
  setSelectedBounty: (arg: TBounty | null) => void;

  isAuthLoading: boolean;
};
