import { Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import { LoginForm } from "../../features/auth";

export const LoginPage = () => {
  const { user } = useAppContext();

  return user ? (
    <Navigate to="/" />
  ) : (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-gradient-end)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center">
          <h2 className="text-heading text-3xl font-bold">
            Sign in to CodeBounty
          </h2>
          <p className="text-body mt-2">Enter your credentials to continue</p>
        </header>
        <LoginForm />
      </div>
    </section>
  );
};
