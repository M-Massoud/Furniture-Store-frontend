import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import ChangePasswordComponent from "./changePasswordComponent";

test("should be able to type in all fields", () => {
  render(<ChangePasswordComponent />);
  const oldPasswordInput = screen.getByLabelText("old Password");
  const newPasswordInput = screen.getByLabelText("Password");
  const confirmNewPasswordInput = screen.getByLabelText("confirm Password");
  userEvent.type(oldPasswordInput, "Pass@123");
  userEvent.type(newPasswordInput, "Pass@123");
  userEvent.type(confirmNewPasswordInput, "Pass@123");
  expect(oldPasswordInput.value).toBe("Pass@123");
  expect(newPasswordInput.value).toBe("Pass@123");
  expect(confirmNewPasswordInput.value).toBe("Pass@123");
});

test("not a matched password", () => {
  render(<ChangePasswordComponent />);
  const newPasswordInput = screen.getByLabelText("Password");
  const confirmNewPasswordInput = screen.getByLabelText("confirm Password");
  userEvent.type(newPasswordInput, "Pass@123");
  userEvent.type(confirmNewPasswordInput, "Pass@548");
  const notMatchedPasswordError = screen.queryByText(/not a matched password/i);
  expect(notMatchedPasswordError).toBeInTheDocument();
});

test("choose a strong password", () => {
  render(<ChangePasswordComponent />);
  const newPasswordInput = screen.getByLabelText("Password");
  userEvent.type(newPasswordInput, "1234");
  const weakPasswordError = screen.queryByText(/choose a stronger password/i);
  expect(weakPasswordError).toBeInTheDocument();
});
