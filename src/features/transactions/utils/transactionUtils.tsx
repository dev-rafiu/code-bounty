import { CheckCircle, Clock } from 'lucide-react';

export const getTransactionStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />;
  }
};

export const getTransactionStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatTxHash = (hash: string | null | undefined) => {
  if (!hash) return 'N/A';
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
};

export const formatTimeAgo = (date: Date | number | string) => {
  const now = new Date();
  const dateObj =
    typeof date === 'number' || typeof date === 'string'
      ? new Date(date)
      : date;
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  return `${diffInDays}d ago`;
};
