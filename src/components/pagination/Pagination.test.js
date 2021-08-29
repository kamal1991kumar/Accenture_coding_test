import React from "react";
import { render } from "@testing-library/react";
import Pagniation from "./index";

const props = {
  start: 0,
  total: 10,
  threshold: 10,
};

describe("Pagniation Component", () => {
  test("Should render on screen", () => {
    const { container } = render(<Pagniation {...props} />);
    expect(container).toMatchSnapshot();
  });

  test("Should match the pagination text", () => {
    const { getByTestId } = render(<Pagniation {...props} />);
    expect(getByTestId("pagination").textContent).toBe("10 out of 10");
  });
});
