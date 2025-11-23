import { useState } from "react";
import {
  Bitcoin,
  ArrowUpRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Hash,
} from "lucide-react";

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
        return <CheckCircle className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />;
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
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Public Transaction History
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Recent bounty payments made on the platform
        </p>
      </header>

      {/* summary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center sm:p-6">
          <Bitcoin className="text-primary mx-auto mb-2 h-6 w-6 sm:mb-3 sm:h-8 sm:w-8" />
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            Total BTC Paid
          </p>
          <p className="text-lg font-bold text-gray-900 sm:text-2xl">
            {totalSent.toFixed(4)} BTC
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center sm:p-6">
          <ArrowUpRight className="mx-auto mb-2 h-6 w-6 text-green-500 sm:mb-3 sm:h-8 sm:w-8" />
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            Total USD Value
          </p>
          <p className="text-lg font-bold text-gray-900 sm:text-2xl">
            ${totalUsdSent.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center sm:p-6">
          <CheckCircle className="mx-auto mb-2 h-6 w-6 text-blue-500 sm:mb-3 sm:h-8 sm:w-8" />
          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            Total Transactions
          </p>
          <p className="text-lg font-bold text-gray-900 sm:text-2xl">
            {transactions.length}
          </p>
        </div>
      </div>

      {/* transactions list */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
            Recent Transactions
          </h2>
        </div>

        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="p-4 transition-colors hover:bg-gray-50 sm:p-6"
            >
              {/* mobile layout */}
              <div className="block space-y-3 sm:hidden">
                <div className="flex items-start justify-between">
                  <div className="flex min-w-0 flex-1 items-start space-x-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm leading-5 font-medium text-gray-900">
                        {transaction.bountyTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-2 flex items-center">
                    {getStatusIcon(transaction.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Hash className="mr-1 h-3 w-3 flex-shrink-0" />

                    <span className="mr-1 truncate font-mono">
                      {formatTxHash(transaction.txHash)}
                    </span>

                    <a
                      href={`https://blockstream.info/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3" />
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
                      className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(
                        transaction.status,
                      )}`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center text-base font-bold text-gray-900">
                      <Bitcoin className="text-primary mr-1 h-4 w-4" />
                      {transaction.amount} BTC
                    </div>
                    <div className="text-sm text-gray-500">
                      ${transaction.usdValue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* desktop layout */}
              <div className="hidden items-center justify-between sm:flex">
                <div className="flex flex-1 items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ArrowUpRight className="h-6 w-6 text-red-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-medium text-gray-900">
                      {transaction.bountyTitle}
                    </h3>

                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Hash className="mr-1 h-3 w-3" />
                        <span className="font-mono">
                          {formatTxHash(transaction.txHash)}
                        </span>
                        <a
                          href={`https://blockstream.info/tx/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-3 w-3" />
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
                    <div className="flex items-center text-lg font-bold text-gray-900">
                      <Bitcoin className="text-primary mr-1 h-4 w-4" />
                      {transaction.amount} BTC
                    </div>
                    <div className="text-sm text-gray-500">
                      ${transaction.usdValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span
                      className={`ml-2 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                        transaction.status,
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
