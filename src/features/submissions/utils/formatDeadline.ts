export const formatDeadline = (deadline: string) => {
  const parsed = new Date(deadline);
  if (Number.isNaN(parsed.getTime())) return deadline;
  return parsed.toLocaleDateString();
};
