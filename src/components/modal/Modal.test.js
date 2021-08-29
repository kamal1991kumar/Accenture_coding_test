import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "./index";

const props = {
  isSaveDisabled: false,
  onClose: jest.fn(),
  onSave: jest.fn(),
};

const TestModal = (p) => (
  <Modal {...p} {...props}>
    {p.children}
  </Modal>
);

describe("Modal Component", () => {
  test("Should render on screen", () => {
    const { container } = render(<TestModal />);
    expect(container).toMatchSnapshot();
  });

  test("Should render heading", () => {
    const { getByTestId } = render(<TestModal />);
    expect(getByTestId("heading").textContent).toBe("Dialog box");
  });

  test("Should render body", () => {
    const { getByTestId } = render(<TestModal>hello world</TestModal>);
    expect(getByTestId("children").textContent).toBe("hello world");
  });

  test("Should call close function click on cancel button", () => {
    const { getByTestId } = render(<TestModal />);
    const btn = getByTestId("close");
    fireEvent.click(btn);
    expect(btn.textContent).toBe("Cancel");
    expect(props.onClose.mock.calls.length).toEqual(1);
  });

  test("Should call save function click on save button", () => {
    const { getByTestId } = render(<TestModal />);
    const btn = getByTestId("save");
    fireEvent.click(btn);
    expect(btn.textContent).toBe("Save");
    expect(btn.disabled).toBe(false);
    expect(props.onSave.mock.calls.length).toEqual(1);
  });
});
