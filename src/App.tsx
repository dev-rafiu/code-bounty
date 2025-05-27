import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
