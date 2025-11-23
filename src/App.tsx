import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAppContext } from "./hooks/useAppContext";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-gradient-end)]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
