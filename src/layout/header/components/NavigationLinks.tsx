import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../hooks/useAppContext";

interface NavigationLinksProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export const NavigationLinks = ({
  mobile = false,
  onLinkClick = () => {},
}: NavigationLinksProps) => {
  const { user } = useAppContext();
  const location = useLocation();

  const userRole = user?.success ? user.user.role : null;
  const isCompany = userRole === "COMPANY";

  const pathname = location.pathname;
  const isCreateBounty = pathname === "/company-bounties/create";
  const isCompanyBounties = pathname === "/company-bounties";
  const isDevBounties = pathname === "/dev-bounties";
  const isSubmissions = pathname === "/submissions";
  const isCompanySubmissions = pathname === "/company-submissions";
  const isTransactions = pathname === "/transactions";

  return (
    <ul
      className={`flex ${mobile ? "flex-col space-y-4" : "items-center gap-6"}`}
    >
      {isCompany ? (
        <>
          <li className="">
            <Link
              to="/company-bounties/create"
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                isCreateBounty
                  ? "text-primary"
                  : "hover:text-primary text-gray-700"
              } ${mobile ? "block py-2" : ""}`}
            >
              Create Bounty
            </Link>
          </li>

          <li className="">
            <Link
              to="/company-bounties"
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                isCompanyBounties
                  ? "text-primary"
                  : "hover:text-primary text-gray-700"
              } ${mobile ? "block py-2" : ""}`}
            >
              Bounties
            </Link>
          </li>
        </>
      ) : (
        <li className="">
          <Link
            to="/dev-bounties"
            onClick={onLinkClick}
            className={`text-sm font-medium transition-colors ${
              isDevBounties
                ? "text-primary"
                : "hover:text-primary text-gray-700"
            } ${mobile ? "block py-2" : ""}`}
          >
            Bounties
          </Link>
        </li>
      )}

      <li className="">
        <Link
          to={userRole == "DEVELOPER" ? "/submissions" : "/company-submissions"}
          onClick={onLinkClick}
          className={`text-sm font-medium transition-colors ${
            isSubmissions || isCompanySubmissions
              ? "text-orange-600"
              : "text-gray-700 hover:text-orange-600"
          } ${mobile ? "block py-2" : ""}`}
        >
          Submissions
        </Link>
      </li>

      <li className="">
        <Link
          to="/transactions"
          onClick={onLinkClick}
          className={`text-sm font-medium transition-colors ${
            isTransactions
              ? "text-orange-600"
              : "text-gray-700 hover:text-orange-600"
          } ${mobile ? "block py-2" : ""}`}
        >
          Transactions
        </Link>
      </li>
    </ul>
  );
};
