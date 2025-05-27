import { useState, type FormEvent } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { Mail, Lock } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import type { UserRole } from "../../definitions/auth";
import { toast } from "sonner";
import LoadingIndicator from "../../components/common/LoadingIndicator";

export const SignUpPage = () => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, user } = useAppContext();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!signupForm.role || !signupForm.email || !signupForm.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload: any = {
      email: signupForm.email,
      password: signupForm.password,
      role: signupForm.role as UserRole,
    };

    if (signupForm.role === "DEVELOPER") {
      payload.name = signupForm.name || "New User";
    } else if (signupForm.role === "COMPANY") {
      payload.companyName = signupForm.companyName;
    }
    console.log("Signup form data:", payload);

    setIsLoading(true);

    try {
      const user = await authService.signUp(payload);

      if (user && user.success) {
        setUser(user);
        toast.success("Signup successful");

        if (user.user.role === "COMPANY") {
          navigate("/company-bounties");
        } else {
          navigate("/dev-bounties");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions: UserRole[] = ["DEVELOPER", "COMPANY"];

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join CodeBounty</h2>
          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </header>

        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
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
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* role */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a...
              </label>

              <select
                value={signupForm.role}
                className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    role: e.target.value as UserRole,
                  })
                }
              >
                <option value="" disabled className="text-gray-400">
                  Select your role
                </option>
                {roleOptions.map((role) => (
                  <option key={role} value={role} className="capitalize">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {signupForm.role === "DEVELOPER" || signupForm.role === "" ? (
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="John Doe"
                />
              </div>
            ) : (
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>

                <input
                  type="text"
                  required
                  value={signupForm.companyName}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      companyName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your Company Inc."
                />
              </div>
            )}

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
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* confirm password */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-orange-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            {isLoading ? <LoadingIndicator /> : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-orange-500 cursor-pointer hover:underline ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
