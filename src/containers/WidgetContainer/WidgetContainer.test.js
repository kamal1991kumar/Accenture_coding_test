import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Provider } from "react-redux";
import WidgetContainer from "./index";
import { store } from "../../store";
const mock = new MockAdapter(axios);

const TestComponent = () => (
  <Provider store={store}>
    <WidgetContainer />
  </Provider>
);

describe("Widget Container", () => {
  test("Should render not render widgets when api fails", () => {
    mock
      .onGet("https://39ktg.sse.codesandbox.io/api/?start=0&threshold=10")
      .reply(404, {});
    const { container, rerender } = render(<TestComponent />);
    rerender(<TestComponent />);
    expect(container).toMatchSnapshot();
  });

  test("Should render one widget component", () => {
    mock
      .onGet("https://39ktg.sse.codesandbox.io/api/?start=0&threshold=10")
      .reply(404, {});
    const { queryByTestId } = render(<TestComponent />);
    expect(queryByTestId("widgetBox")).toBeNull();
  });

  test("Should render on screen", () => {
    mock
      .onGet("https://39ktg.sse.codesandbox.io/api/?start=0&threshold=10")
      .reply(200, {
        data: [
          {
            id: 1,
            title: "Carole",
            body: "Lorem ipsum",
          },
        ],
      });
    const { container, rerender } = render(<TestComponent />);
    rerender(<TestComponent />);
    expect(container).toMatchSnapshot();
  });

  test("Should render pagination component on screen", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("pagination")).toBeDefined();
  });

  test("Should render widget component", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("widgetBox")).toBeInTheDocument();
  });
});
