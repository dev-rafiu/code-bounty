import { Bitcoin, Mail, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../../services/authService";
import LoadingIndicator from "../../components/common/LoadingIndicator";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "developer",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser, user } = useAppContext();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginForm.password || !loginForm.email) {
      toast.error("Please add email and password");
      return;
    }

    setIsLoading(true);

    try {
      const user = await authService.signIn({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (user && user.success) {
        setUser(user);
        toast.success("Login successful");

        if (user.user.role == "COMPANY") {
          navigate("/dashboard");
        } else {
          navigate("/bounties");
        }
      } else {
        toast.error(user.error);
      }
    } catch (err: any) {
      toast.success("Login unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center">
          <Bitcoin className="w-12 h-12 text-orange-500 mx-auto mb-4" />

          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to CodeBounty
          </h2>

          <p className="mt-2 text-gray-600">
            Enter your credentials to continue
          </p>
        </header>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            {/* email */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* password */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* role */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a...
              </label>

              <select
                value={loginForm.role}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="developer">Developer</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            {isLoading ? <LoadingIndicator /> : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-orange-500 cursor-pointer hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
