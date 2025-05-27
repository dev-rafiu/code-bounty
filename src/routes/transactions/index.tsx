import { useState } from "react";
import {
  Bitcoin,
  ArrowUpRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Hash,
} from "lucide-react";

// Sample transaction data - simplified for public view
const sampleTransactions = [
  {
    id: "tx_001",
    txHash: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    amount: 0.025,
    usdValue: 1250,
    status: "confirmed",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    bountyTitle: "React Dashboard Implementation",
    confirmations: 6,
  },
  {
    id: "tx_002",
    txHash: "9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a",
    amount: 0.05,
    usdValue: 2500,
    status: "confirmed",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    bountyTitle: "API Integration & Testing",
    confirmations: 12,
  },
  {
    id: "tx_003",
    txHash: "5f4e3d2c1b0a9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g",
    amount: 0.0125,
    usdValue: 625,
    status: "pending",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    bountyTitle: "Bug Fix - Authentication Module",
    confirmations: 0,
  },
  {
    id: "tx_004",
    txHash: "3g2f1e0d9c8b7a6z5y4x3w2v1u0t9s8r7q6p5o4n3m2l1k0j9i8h",
    amount: 0.075,
    usdValue: 3750,
    status: "confirmed",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    bountyTitle: "Mobile App UI/UX Redesign",
    confirmations: 25,
  },
  {
    id: "tx_005",
    txHash: "7h6g5f4e3d2c1b0a9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i",
    amount: 0.1,
    usdValue: 5000,
    status: "confirmed",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    bountyTitle: "Blockchain Integration Project",
    confirmations: 45,
  },
  {
    id: "tx_006",
    txHash: "8i7h6g5f4e3d2c1b0a9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j",
    amount: 0.03,
    usdValue: 1500,
    status: "confirmed",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    bountyTitle: "Database Optimization",
    confirmations: 78,
  },
  {
    id: "tx_007",
    txHash: "2j1i0h9g8f7e6d5c4b3a2z1y0x9w8v7u6t5s4r3q2p1o0n9m8l7k",
    amount: 0.02,
    usdValue: 1000,
    status: "confirmed",
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    bountyTitle: "Security Audit Implementation",
    confirmations: 156,
  },
  {
    id: "tx_008",
    txHash: "4k3j2i1h0g9f8e7d6c5b4a3z2y1x0w9v8u7t6s5r4q3p2o1n0m9l",
    amount: 0.0085,
    usdValue: 425,
    status: "pending",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    bountyTitle: "Performance Optimization",
    confirmations: 0,
  },
];

function TransactionsPage() {
  const [transactions] = useState(sampleTransactions);

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTxHash = (hash: any) => {
    if (!hash) return "N/A";
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const formatTimeAgo = (date: any) => {
    const now = new Date();
    const dateObj = typeof date === "number" ? new Date(date) : date;
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  };

  const totalSent = transactions
    .filter((tx) => tx.status === "confirmed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalUsdSent = transactions
    .filter((tx) => tx.status === "confirmed")
    .reduce((sum, tx) => sum + tx.usdValue, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Public Transaction History
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Recent bounty payments made on the platform
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 text-center">
          <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            Total BTC Paid
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">
            {totalSent.toFixed(4)} BTC
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 text-center">
          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            Total USD Value
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">
            ${totalUsdSent.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 text-center">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2 sm:mb-3" />
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            Total Transactions
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">
            {transactions.length}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>

        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
            >
              {/* Mobile Layout */}
              <div className="block sm:hidden space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5">
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 leading-5">
                        {transaction.bountyTitle}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    {getStatusIcon(transaction.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Hash className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="font-mono truncate mr-1">
                      {formatTxHash(transaction.txHash)}
                    </span>
                    <a
                      href={`https://blockstream.info/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{formatTimeAgo(transaction.timestamp)}</span>
                      {transaction.status === "confirmed" && (
                        <span>{transaction.confirmations} conf.</span>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-base font-bold text-gray-900 flex items-center">
                      <Bitcoin className="w-4 h-4 mr-1 text-orange-500" />
                      {transaction.amount} BTC
                    </div>
                    <div className="text-sm text-gray-500">
                      ${transaction.usdValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <ArrowUpRight className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 truncate">
                      {transaction.bountyTitle}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Hash className="w-3 h-3 mr-1" />
                        <span className="font-mono">
                          {formatTxHash(transaction.txHash)}
                        </span>
                        <a
                          href={`https://blockstream.info/tx/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(transaction.timestamp)}
                      </span>
                      {transaction.status === "confirmed" && (
                        <span className="text-sm text-gray-500">
                          {transaction.confirmations} confirmations
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 flex items-center">
                      <Bitcoin className="w-4 h-4 mr-1 text-orange-500" />
                      {transaction.amount} BTC
                    </div>
                    <div className="text-sm text-gray-500">
                      ${transaction.usdValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionsPage;
