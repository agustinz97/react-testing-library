import { render, screen } from "@testing-library/react";
import Options from "../Options.jsx";

test("It displays image for each scopp from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((x) => x.alt);
  expect(altText).toEqual(["chocolate scoop", "vanilla scoop"]);
});
