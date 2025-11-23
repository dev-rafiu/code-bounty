import { useState, type FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { UserRole } from "../../../types/auth";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useAuth } from "../hooks/useAuth";

export const SignUpForm = () => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, isLoading } = useAuth();

  const roleOptions: UserRole[] = ["DEVELOPER", "COMPANY"];

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

    await signUp(payload);
  };

  return (
    <form onSubmit={handleSignUp} className="mt-8 space-y-6">
      <div className="space-y-4">
        {/* email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="signup-email"
              type="email"
              required
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              className="pl-10"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* role */}
        <div className="space-y-2">
          <Label htmlFor="signup-role">I am a...</Label>
          <Select
            value={signupForm.role}
            onValueChange={(value) =>
              setSignupForm({
                ...signupForm,
                role: value as UserRole,
              })
            }
          >
            <SelectTrigger id="signup-role" className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {signupForm.role === "DEVELOPER" || signupForm.role === "" ? (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm({ ...signupForm, name: e.target.value })
              }
              placeholder="John Doe"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              type="text"
              required
              value={signupForm.companyName}
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  companyName: e.target.value,
                })
              }
              placeholder="Your Company Inc."
            />
          </div>
        )}

        {/* password */}
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              className="pr-10 pl-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* confirm password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={signupForm.confirmPassword}
              onChange={(e) =>
                setSignupForm({
                  ...signupForm,
                  confirmPassword: e.target.value,
                })
              }
              className="pr-10 pl-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <div className="flex items-center justify-center gap-1 text-center text-sm">
        <p className="text-muted-foreground">Already have an account?</p>
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};
