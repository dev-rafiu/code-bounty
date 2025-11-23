import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-gradient-end)]">
      <Header />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
