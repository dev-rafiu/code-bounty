import { Bitcoin, Code, Trophy, Users } from "lucide-react";

import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Bitcoin className="w-16 h-16 text-orange-500" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Earn Bitcoin by Solving Challenges
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Companies post coding challenges, data analysis problems, and
            blockchain puzzles with Bitcoin bounties. Developers compete to win
            real BTC rewards.
          </p>

          <div className="flex justify-center space-x-4 mb-16 items-center flex-col md:flex-row gap-6">
            <Link
              to={"/login"}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-orange-600 transition-colors cursor-pointer w-full lg:w-auto"
            >
              Browse Bounties
            </Link>

            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 px-8 py-3 rounded-lg text-lg w-full hover:bg-orange-50 transition-colors cursor-pointer lg:w-auto"
            >
              Get Started
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Code className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Code Challenges</h3>
              <p className="text-gray-600">React, Node.js, Python and more</p>
            </div>

            <div className="text-center">
              <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Win Bitcoin</h3>
              <p className="text-gray-600">Earn real BTC for your solutions</p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fair Competition</h3>
              <p className="text-gray-600">
                Best solution wins, transparent process
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
