import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/auth/Login";
import { SignUpPage } from "./pages/auth/SignUp";
import { DevBountiesPage } from "./pages/dev-bounties";
import { SubmitSolutionPage } from "./pages/submit";
import { BaseLayout } from "./layout/BaseLayout";
import { CreateBountyPage } from "./pages/company-bounties/create";
import { CompanyBounties } from "./pages/company-bounties";

import TransactionsPage from "./pages/transactions";
import Submissions from "./pages/submissions";
import CompanySubmissions from "./pages/company-submissions";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    element: <BaseLayout />,
    path: "/",
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "dev-bounties",
        children: [
          {
            index: true,
            element: <DevBountiesPage />,
          },
        ],
      },

      {
        path: "company-bounties",
        children: [
          {
            index: true,
            element: <CompanyBounties />,
          },
          { path: "create", element: <CreateBountyPage /> },
        ],
      },

      {
        path: "transactions",
        children: [
          {
            index: true,
            element: <TransactionsPage />,
          },
        ],
      },

      {
        path: "submissions",
        children: [
          {
            index: true,
            element: <Submissions />,
          },
        ],
      },

      {
        path: "company-submissions",
        children: [
          {
            index: true,
            element: <CompanySubmissions />,
          },
        ],
      },

      {
        path: "submit/:bountyId",
        element: <SubmitSolutionPage />,
      },
    ],
  },
]);
