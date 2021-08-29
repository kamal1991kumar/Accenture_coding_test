import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextArea from "./index";

const props = {
  hasError: false,
  message: "textArea not be empty",
  value: "text",
  handleChange: jest.fn(),
};

describe("TextArea Component", () => {
  test("Should render on screen", () => {
    const { container } = render(<TextArea {...props} />);
    expect(container).toMatchSnapshot();
    expect(container).toBeInTheDocument();
  });

  test("Should render props value", () => {
    const { getByTestId } = render(<TextArea {...props} />);
    expect(getByTestId("textArea")).toHaveValue(props.value);
  });

  test("Should render changed value", () => {
    const { getByTestId } = render(<TextArea {...props} />);
    const textArea = getByTestId("textArea");
    fireEvent.change(textArea, {
      target: { value: "123" },
    });
    expect(textArea).toHaveValue("123");
  });
  test("Should render error message", () => {
    const { getByTestId, container } = render(<TextArea {...props} hasError />);
    const textArea = getByTestId("error");
    expect(container).toMatchSnapshot();
    expect(textArea.textContent).toBe(props.message);
  });
});
