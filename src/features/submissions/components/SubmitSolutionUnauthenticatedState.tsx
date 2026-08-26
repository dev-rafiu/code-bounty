export const SubmitSolutionUnauthenticatedState = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center text-center">
      <h2 className="text-heading text-2xl font-bold">
        Authentication Required
      </h2>
      <p className="text-body">You must be logged in to submit a solution.</p>
    </div>
  );
};
