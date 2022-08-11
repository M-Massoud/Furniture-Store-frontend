import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import RegisterationUserComponent from "./RegisterationUserComponent";

test("should be a valid first name", () => {
  render(<RegisterationUserComponent />);
  const firstNameInputElm = screen.getByLabelText("First Name");
  userEvent.type(firstNameInputElm, "ma ha");
  const notValidFirstNameError = screen.queryByText(
    /Field must be characters only/i
  );
  expect(notValidFirstNameError).toBeInTheDocument();
});

test("should be a valid Last name", () => {
  render(<RegisterationUserComponent />);
  const firstNameInputElm = screen.getByLabelText("Last Name");
  userEvent.type(firstNameInputElm, "ma ha");
  const notValidLastNameError = screen.queryByText(
    /Field must be characters only/i
  );
  expect(notValidLastNameError).toBeInTheDocument();
});

test("should be a valid email", () => {
  render(<RegisterationUserComponent />);
  const emailInputElm = screen.getByLabelText("Email Address");
  userEvent.type(emailInputElm, "mohamed@gmail.com");
  const notValidEmailError = screen.queryByText(
    /Field must be at email format/i
  );
  expect(notValidEmailError).not.toBeInTheDocument();
});

test("should be a valid email error", () => {
  render(<RegisterationUserComponent />);
  const emailInputElm = screen.getByLabelText("Email Address");
  userEvent.type(emailInputElm, "mohamed.com");
  const notValidEmailError = screen.getByText(/Field must be at email format/i);
  expect(notValidEmailError).toBeInTheDocument();
});

test("choose a strong password", () => {
  render(<RegisterationUserComponent />);
  const newPasswordInput = screen.getByLabelText("Password");
  userEvent.type(newPasswordInput, "1234");
  const weakPasswordError = screen.queryByText(/Password length must be at least 8 characters/i);
  expect(weakPasswordError).toBeInTheDocument();
});

test("not a matched password", () => {
  render(<RegisterationUserComponent />);
  const PasswordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  userEvent.type(PasswordInput, "Pass@123");
  userEvent.type(confirmPasswordInput, "Pass@548");
  const notMatchedPasswordError = screen.getByText(
    /Must Match Previous Password/i
  );
  expect(notMatchedPasswordError).toBeInTheDocument();
});
