import { fireEvent, render, screen } from "@testing-library/react";

import SummaryForm from "../SummaryForm.jsx";

describe("SummaryForm", () => {
  it("Checkbox is uncheked by default", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button", { name: "Confirm order" });
    expect(button).toBeDisabled();
  });

  it("Cheking the checkbox enables the button", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    const button = screen.getByRole("button", { name: "Confirm order" });

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
