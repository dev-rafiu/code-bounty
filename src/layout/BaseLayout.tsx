import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
