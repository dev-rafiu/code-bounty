import type { TBounty } from "../types";

export const transformBounty = (doc: any): TBounty => {
  return {
    id: doc.id,
    title: doc.title || "",
    description: doc.description || "",
    bountyBTC: doc.bountyBTC || 0,
    category: doc.category || "",
    difficulty: doc.difficulty || "",
    company: doc.companyName || "",
    companyUid: doc.companyUid,
    submissions: doc.submissions || 0,
    deadline: doc.deadline || "",
    status: doc.status || "open",
  };
};
