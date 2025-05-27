import { Bitcoin, Code, Users } from "lucide-react";
import { Link } from "react-router-dom";

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
};

export const BountyCard = ({ bounty }: { bounty: TBounty }) => {
  console.log(bounty, "bounty");

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
      <header className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{bounty.title}</h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            bounty.difficulty === "beginner"
              ? "bg-green-100 text-green-800"
              : bounty.difficulty === "intermediate"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {bounty.difficulty}
        </span>
      </header>

      <p className="text-gray-600 mb-4 line-clamp-3">{bounty.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-orange-600">
            <Bitcoin className="w-5 h-5 mr-1" />
            <span className="font-bold">{bounty.bountyBTC} BTC</span>
          </div>
          {/* <span className="text-gray-500">(≈ ${bounty.bountyUSD})</span> */}
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <Users className="w-4 h-4 mr-1" />
          {/* {bounty.submissions} */}
          submissions
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <p className="">
          By
          <span className="text-orange-400 ml-2 font-bold">
            {bounty.company}
          </span>
        </p>
        <span>Deadline: {bounty.deadline}</span>
      </div>

      <div className="flex gap-4 justify-end">
        <Link
          to={`/submit/${bounty.id}`}
          className=" bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
        >
          <Code className="w-4 h-4 mr-2" />
          Submit Solution
        </Link>
      </div>
    </div>
  );
};
