import { Bitcoin, Code, Trophy, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

export const HomePage = () => {
  const { user } = useAppContext();

  if (user?.success) {
    if (user.user.role === "COMPANY") {
      return <Navigate to="/company-bounties" replace />;
    } else {
      return <Navigate to="/dev-bounties" replace />;
    }
  }

  return (
    <section className="bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-gradient-end)]">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 text-center sm:px-6 lg:space-y-24 lg:px-8 lg:py-20">
        <div className="space-y-10">
          <header className="space-y-4">
            <Bitcoin className="text-primary mx-auto h-16 w-16" />

            <h1 className="text-heading text-4xl leading-[1.2] font-bold lg:text-5xl lg:leading-normal">
              Earn bitcoin by solving challenges
            </h1>

            <p className="text-body mx-auto max-w-3xl text-xl leading-8">
              Companies post coding challenges, data analysis problems, and
              blockchain puzzles with Bitcoin bounties. Developers compete to
              win real BTC rewards.
            </p>
          </header>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link
              to="/login"
              className="bg-primary text-primary-foreground hover:bg-primary-hover w-full min-w-[200px] cursor-pointer rounded-lg px-8 py-3 text-center text-base transition-colors md:w-auto"
            >
              Browse Bounties
            </Link>

            <Link
              to="/login"
              className="border-primary text-primary hover:bg-primary-light w-full min-w-[200px] cursor-pointer rounded-lg border px-8 py-3 text-center text-base transition-colors md:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>

        <ul className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <li className="text-center">
            <Code className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Code Challenges</h3>
            <p className="text-body">React, Node.js, Python and more</p>
          </li>

          <li className="text-center">
            <Trophy className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Win Bitcoin</h3>
            <p className="text-body">Earn real BTC for your solutions</p>
          </li>

          <li className="text-center">
            <Users className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Fair Competition</h3>
            <p className="text-body">Best solution wins, transparent process</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
