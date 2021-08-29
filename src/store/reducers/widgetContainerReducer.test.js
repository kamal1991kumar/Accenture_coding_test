import { actionType } from "../actions/WidgetContainerAction";
import widgetContainerReducer from "./widgetContainerReducer";

const initState = {
  isLoading: false,
  widgetList: [],
  editId: "",
  isLoadingModal: false,
  editWidget: {},
  isValidTitle: true,
  pager: {
    start: 0,
    total: 10,
    threshold: 10,
  },
};

describe("Widget Container Reducer", () => {
  test("should return the initial state", () => {
    expect(widgetContainerReducer(undefined, {})).toEqual(initState);
  });

  test("should return initail load data", () => {
    const action = {
      type: actionType.loadData,
      payload: {
        pager: {
          total: 100,
        },
        data: [
          {
            id: 1,
            title: "kamal",
            body: "hello world",
          },
        ],
      },
    };
    expect(widgetContainerReducer(undefined, action)).toEqual({
      ...initState,
      pager: {
        ...initState.pager,
        total: 100,
      },
      isLoading: false,
      widgetList: [
        {
          id: 1,
          title: "kamal",
          body: "hello world",
        },
      ],
    });
  });

  test("should return update modal data changed by user", () => {
    const prev = {
      ...initState,
      editWidget: {
        id: 1,
        title: "kamal",
        body: "hello world",
      },
      editId: 0,
    };
    expect(
      widgetContainerReducer(prev, {
        type: actionType.updateData,
      })
    ).toEqual({
      ...initState,
      widgetList: [
        {
          id: 1,
          title: "kamal",
          body: "hello world",
        },
      ],
    });
  });

  test("should return verified title  modal data changed by user", () => {
    const action = {
      type: actionType.validateTitle,
      payload: {
        isValidString: true,
        data: {
          id: 1,
          title: "kamal",
          body: "hello world",
        },
      },
    };
    expect(
      widgetContainerReducer(
        {
          ...initState,
          editId: 0,
        },
        action
      )
    ).toEqual({
      ...initState,
      editId: 0,
      isLoadingModal: true,
      editWidget: {
        id: 1,
        title: "kamal",
        body: "hello world",
      },
    });
  });

  test("should show loader when load the data", () => {
    expect(
      widgetContainerReducer(initState, {
        type: actionType.toggleLoader,
      })
    ).toEqual({
      ...initState,
      isLoading: true,
    });
  });

  test("should return edit title and body text changed by user", () => {
    const action = {
      type: actionType.editData,
      payload: {
        id: 1,
        title: "kamal",
        body: "hello world",
      },
    };
    expect(
      widgetContainerReducer(
        {
          ...initState,
          editId: 0,
        },
        action
      )
    ).toEqual({
      ...initState,
      editId: 0,
      editWidget: {
        id: 1,
        title: "kamal",
        body: "hello world",
      },
    });
  });

  test("should return toggle modal box data", () => {
    const action = {
      type: actionType.toggleModal,
      payload: {
        editId: 0,
      },
    };
    expect(
      widgetContainerReducer(
        {
          ...initState,
          editId: 0,
        },
        action
      )
    ).toEqual({
      ...initState,
      editId: 0,
      editWidget: {
        id: 1,
        title: "kamal",
        body: "hello world",
      },
    });
  });
});
