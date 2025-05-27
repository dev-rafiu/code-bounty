import type { AuthResponse } from "./auth";

export type TBounty = {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  bountyBTC: number;
  deadline: string;
};

export type AppContextType = {
  currentView: string;
  setCurrentView: (arg: string) => void;

  user: AuthResponse | null;
  setUser: (arg: AuthResponse | null) => void;

  selectedBounty: TBounty | null;
  setSelectedBounty: (arg: TBounty | null) => void;
};
