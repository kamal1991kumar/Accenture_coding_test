import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import WidgetContainer from "./containers/WidgetContainer";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index");
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <Provider store={store}>
        <WidgetContainer />
      </Provider>,
      div
    );
  });
});
