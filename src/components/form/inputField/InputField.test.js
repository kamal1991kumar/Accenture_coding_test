import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputField from "./index";

const props = {
  hasError: false,
  message: "input not be empty",
  value: "text",
  handleChange: jest.fn(),
};

describe("InputFiled Component", () => {
  test("Should render on screen", () => {
    const { container } = render(<InputField {...props} />);
    expect(container).toMatchSnapshot();
  });

  test("Should render props value", () => {
    const { getByTestId } = render(<InputField {...props} />);
    expect(getByTestId("input")).toHaveValue(props.value);
  });

  test("Should render changed value", () => {
    const { getByTestId } = render(<InputField {...props} />);
    const input = getByTestId("input");
    fireEvent.change(input, {
      target: { value: "123" },
    });
    expect(input).toHaveValue("123");
  });
  test("Should render error message", () => {
    const { container, getByTestId } = render(
      <InputField {...props} hasError />
    );
    const input = getByTestId("error");
    expect(container).toMatchSnapshot();
    expect(input.textContent).toBe(props.message);
  });
});
