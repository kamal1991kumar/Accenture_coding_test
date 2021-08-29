import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import WidgetModal from "./index";
import { store } from "../../store";

const TestComponent = () => (
  <Provider store={store}>
    <WidgetModal />
  </Provider>
);

describe("Widget Modal", () => {
  test("Should render on screen", () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeInTheDocument();
  });

  test("Should render Input field", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("input")).toBeInTheDocument();
  });

  test("Should render TextArea filed", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("textArea")).toBeInTheDocument();
  });
});
