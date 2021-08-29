import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WidgetBox from "./index";

const props = {
  title: "Kamal",
  body: "My name is kamal",
  id: 1,
  handleEditClick: jest.fn(),
  widgetIndex: 0,
};

describe("WidgetBox Component", () => {
  test("Should render on screen", () => {
    const { container } = render(<WidgetBox {...props} />);
    expect(container).toMatchSnapshot();
  });

  test("Should match the title", () => {
    const { getByTestId } = render(<WidgetBox {...props} />);
    expect(getByTestId("title").textContent).toBe(`${props.id}-${props.title}`);
  });

  test("Should match the body", () => {
    const { getByTestId, container } = render(<WidgetBox {...props} />);
    expect(container).toMatchSnapshot();
    expect(getByTestId("body").textContent).toBe(props.body);
  });

  test("Should be clickable on edit button", () => {
    const { getByTestId } = render(<WidgetBox {...props} />);
    const btn = getByTestId("edit");
    fireEvent.click(btn);
    expect(props.handleEditClick.mock.calls.length).toEqual(1);
  });
});
