import React from "react";
import { render } from "@testing-library/react";
import { FromElements } from "./FormElements";

const props = {
  hasError: false,
  message: "input not be empty",
  value: "text",
  handleChange: jest.fn(),
  type: "input",
};

describe("FormElemets Component", () => {
  test("Should render inputField component", () => {
    const { getByTestId } = render(<FromElements {...props} />);
    expect(getByTestId("input")).toMatchSnapshot();
  });

  test("Should render textArea component", () => {
    const { getByTestId } = render(<FromElements {...props} type="textarea" />);
    expect(getByTestId("textArea")).toMatchSnapshot();
  });
});
