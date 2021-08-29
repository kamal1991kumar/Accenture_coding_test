import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./WidgetContainerAction";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe("Widget Container Actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("should check modal box action", () => {
    store.dispatch(actions.toggleWidgetAction());
    expect(store.getActions()).toEqual([
      { type: actions.actionType.toggleModal },
    ]);
  });

  test("should check update widget data action", () => {
    store.dispatch(actions.updateWidgetAction());
    expect(store.getActions()).toEqual([
      { type: actions.actionType.updateData },
    ]);
  });

  test("should check edit widget data action", () => {
    store.dispatch(actions.editWidgetAction());
    expect(store.getActions()).toEqual([{ type: actions.actionType.editData }]);
  });

  test("should check load widget data action", () => {
    const loadData = () => ({
      type: actions.actionType.loadData,
    });
    store.dispatch(loadData());
    expect(store.getActions()).toEqual([{ type: actions.actionType.loadData }]);
  });

  test("should validate title action", () => {
    const validateTitle = () => ({
      type: actions.actionType.validateTitle,
    });
    store.dispatch(validateTitle());
    expect(store.getActions()).toEqual([
      { type: actions.actionType.validateTitle },
    ]);
  });

  test("should check load data loader action", () => {
    const toggleLoader = () => ({
      type: actions.actionType.toggleLoader,
    });
    store.dispatch(toggleLoader());
    expect(store.getActions()).toEqual([
      { type: actions.actionType.toggleLoader },
    ]);
  });
});
