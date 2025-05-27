import { Bitcoin, Menu, X, Building2, Code } from "lucide-react";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { toast } from "sonner";
import { useEffect } from "react";

export const Header = () => {
  const [name, setName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await toast.promise(authService.signOut(), {
        loading: "Logging you out...",
        success: "Logged out successfully!",
        error: "Failed to log out.",
      });

      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (user?.success) {
      setName(user?.user?.companyName || user?.user?.name || "User");
    }
  }, [user]);

  // Role indicator component
  const RoleIndicator = ({ mobile = false }) => {
    if (!user?.success) return null;

    const isCompany = user.user.role === "COMPANY";
    const isDeveloper = user.user.role === "DEVELOPER";

    if (!isCompany && !isDeveloper) return null;

    return (
      <div
        className={`flex items-center gap-1 ${mobile ? "text-xs" : "text-xs"}`}
      >
        {isCompany ? (
          <>
            <Building2 className="w-3 h-3 text-blue-500" />
            <span className="text-blue-600 font-medium">Company</span>
          </>
        ) : (
          <>
            <Code className="w-3 h-3 text-green-500" />
            <span className="text-green-600 font-medium">Developer</span>
          </>
        )}
      </div>
    );
  };

  const NavigationLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <ul
      className={`flex ${mobile ? "flex-col space-y-4" : "items-center gap-6"}`}
    >
      {user?.success && user.user.role === "COMPANY" ? (
        <>
          <li>
            <Link
              to="/company-bounties/create"
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/create-bounty"
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              } ${mobile ? "block py-2" : ""}`}
            >
              Create Bounty
            </Link>
          </li>

          <li>
            <Link
              to="/company-bounties"
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/company-bounties"
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              } ${mobile ? "block py-2" : ""}`}
            >
              Bounties
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/dev-bounties"
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/dev-bounties"
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              } ${mobile ? "block py-2" : ""}`}
            >
              Bounties
            </Link>
          </li>
        </>
      )}

      <li>
        <Link
          to={
            user?.success && user.user.role == "DEVELOPER"
              ? "/submissions"
              : "/company-submissions"
          }
          onClick={onLinkClick}
          className={`text-sm font-medium transition-colors ${
            location.pathname === "/submissions" ||
            location.pathname === "/company-submissions"
              ? "text-orange-600"
              : "text-gray-700 hover:text-orange-600"
          } ${mobile ? "block py-2" : ""}`}
        >
          Submissions
        </Link>
      </li>

      <li>
        <Link
          to="/transactions"
          onClick={onLinkClick}
          className={`text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors ${
            mobile ? "block py-2" : ""
          }`}
        >
          Transactions
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <header className="bg-white shadow-sm border-b relative z-50">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Bitcoin className="w-8 h-8 text-orange-500 mr-2" />
            <span className="text-xl font-bold text-gray-900">CodeBounty</span>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:block">
              <NavigationLinks />
            </nav>
          )}

          {/* Right side - Auth/User */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  to="/login"
                  className="text-orange-500 px-2 sm:px-4 py-2 hover:text-orange-600 transition-colors text-sm sm:text-base"
                >
                  Login
                </Link>

                <Link
                  to="/sign-up"
                  className="bg-orange-500 text-white px-3 sm:px-6 py-2 rounded-sm hover:bg-orange-600 transition-colors text-sm sm:text-base"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:block">
                  {/* Role indicator for desktop */}
                  <div className="flex items-center gap-3">
                    <RoleIndicator />
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="flex cursor-pointer items-center gap-5"
                      >
                        <Avatar className="size-[43px] bg-slate-950 text-slate-50">
                          <AvatarFallback className="bg-transparent">
                            {name && name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <Avatar className="size-[35px] bg-slate-950 text-slate-50">
                      <AvatarFallback className="bg-transparent text-sm">
                        {name && name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Role indicator for mobile */}
                    <RoleIndicator mobile />
                  </div>

                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {user && isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-lg z-40 md:hidden">
            <nav className="px-4 py-6">
              <NavigationLinks mobile={true} onLinkClick={closeMobileMenu} />

              {/* Mobile Logout Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="text-red-600 font-medium text-sm hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
