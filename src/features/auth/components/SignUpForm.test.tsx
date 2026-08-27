import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, it, jest } from "@jest/globals";

import { useSignUp } from "../hooks/useAuth";
import { SignUpForm } from "./SignUpForm";

// mock useSignPp
jest.mock("../hooks/useAuth", () => ({
  useSignUp: jest.fn(),
}));

// mock sonner
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockMutate = jest.fn();

const renderSignUpForm = () => {
  return render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>,
  );
};

describe("SignUp Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useSignUp).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as unknown as ReturnType<typeof useSignUp>);
  });

  it("renders the signup form", async () => {
    const user = userEvent.setup();

    renderSignUpForm();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/role/i)).toBeInTheDocument();

    //  full name / company name
    // if user selects developer role , full name field should be displayd else show conpany name field
    const trigger = screen.getByRole("combobox", { name: /role/i });
    expect(trigger).toHaveTextContent(/select your role/i);

    // user selects developer option
    await user.click(trigger);
    const developer = await screen.findByRole("option", { name: /developer/i });
    await user.click(developer);
    expect(trigger).toHaveTextContent(/developer/i);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();

    // user selects company option
    await user.click(trigger);
    const company = await screen.findByRole("option", { name: /company/i });
    await user.click(company);
    expect(trigger).toHaveTextContent(/company/i);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });
});
