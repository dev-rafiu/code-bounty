import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
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

export const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuth();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLoginForm({ ...loginForm, email });

    if (email === "") {
      setEmailError("");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginForm.password || !loginForm.email) {
      toast.error("Please add email and password");
      return;
    }

    if (!validateEmail(loginForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    await login({
      email: loginForm.email,
      password: loginForm.password,
    });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-4">
        {/* email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              required
              value={loginForm.email}
              onChange={handleEmailChange}
              className={`pl-10 ${emailError ? "border-destructive" : ""}`}
              placeholder="your@email.com"
              aria-invalid={!!emailError}
            />
          </div>
          {emailError && (
            <p className="text-destructive text-sm">{emailError}</p>
          )}
        </div>

        {/* password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
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

        {/* role */}
        <div className="space-y-2">
          <Label htmlFor="role">I am a...</Label>
          <Select
            value={loginForm.role}
            onValueChange={(value) =>
              setLoginForm({ ...loginForm, role: value })
            }
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !!emailError}
        className="w-full cursor-pointer"
        size="lg"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex items-center justify-center gap-1 text-center text-sm">
        <p className="text-muted-foreground">Don&apos;t have an account?</p>

        <Link
          to="/sign-up"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};
