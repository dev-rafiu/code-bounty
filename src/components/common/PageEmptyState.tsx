type PageEmptyStateProps = {
  title: string;
  description: string;
};

export const PageEmptyState = ({
  title,
  description,
}: PageEmptyStateProps) => {
  return (
    <div className="p-8 text-center">
      <div className="text-gray-500">{title}</div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};
