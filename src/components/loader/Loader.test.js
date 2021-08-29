import React from "react";
import { render } from "@testing-library/react";
import Loader from "./index";

describe("<Loader />", () => {
  test("Should render on screen", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
