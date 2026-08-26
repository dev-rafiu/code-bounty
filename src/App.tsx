import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAppContext } from "./hooks/useAppContext";
import { LoadingState } from "./components/common/LoadingState";

function AppContent() {
  const { isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <>
        <LoadingState className="bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-gradient-end)]" />
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
