import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../../../services/auth/authService";
import type { SignInPayload, SignUpPayload } from "../../../types/auth";
import { useAppContext } from "../../../hooks/useAppContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (payload: SignInPayload) => {
    setIsLoading(true);

    try {
      const user = await authService.signIn(payload);

      if (user && user.success) {
        setUser(user);
        toast.success("Login successful");
        const userRole = user.user.role;

        if (userRole === "COMPANY") {
          navigate("/company-bounties");
        } else if (userRole === "DEVELOPER") {
          navigate("/dev-bounties");
        } else {
          navigate("/");
        }
      } else {
        toast.error(user.error);
      }
    } catch (err: any) {
      toast.error("Login unsuccessful");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
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

  return { login, signUp, isLoading };
};
