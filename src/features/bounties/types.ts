export type TBounty = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  companyUid?: string;
  company?: string;
  difficulty: string;
  bountyBTC: number;
  deadline: string;
  status?: string;
  submissions?: number;
};
