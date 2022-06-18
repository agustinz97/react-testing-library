import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  it("popover responds to hover", async () => {
    render(<SummaryForm />);

    //Popover is not rendered by default
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    //Hovering over the label shows the popover
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    //Hovering out of the label hides the popover
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
