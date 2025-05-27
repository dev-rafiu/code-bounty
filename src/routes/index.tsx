import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home";
import { LoginPage } from "./auth/Login";
import { SignUpPage } from "./auth/SignUp";
import { DevBountiesPage } from "./dev-bounties";
import { SubmitSolutionPage } from "./submit";
import { BaseLayout } from "../layout/BaseLayout";
import { CreateBountyPage } from "./company-bounties/create";
import { CompanyBounties } from "./company-bounties";

import TransactionsPage from "./transactions";
import Submissions from "./submissions";

export const router = createBrowserRouter([
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
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "sign-up",
        element: <SignUpPage />,
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
        path: "submit/:bountyId",
        element: <SubmitSolutionPage />,
      },
    ],
  },
]);
