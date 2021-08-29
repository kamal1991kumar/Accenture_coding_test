import { actionType } from "../actions/WidgetContainerAction";
import { cloneDeep, isEmpty, toString } from "lodash";
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
const widgetContainerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.toggleModal: {
      const _state = Object.assign({}, state);
      const { editId } = action.payload;
      _state.editId = editId;
      _state.editWidget = isEmpty(toString(_state.editId))
        ? {}
        : state.widgetList[_state.editId];
      return _state;
    }
    case actionType.editData: {
      const _state = Object.assign({}, state);
      if (!isEmpty(toString(_state.editId))) {
        _state.editWidget = {
          ...state.editWidget,
          ...action?.payload,
        };
      }
      return _state;
    }
    case actionType.toggleLoader: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case actionType.validateTitle: {
      const _state = Object.assign({}, state);
      _state.isLoadingModal = !_state.isLoadingModal;
      _state.isValidTitle =
        action?.payload?.isValidString && action?.payload?.isValidString
          ? true
          : false;
      if (!isEmpty(toString(_state.editId))) {
        _state.editWidget = {
          ...state.widgetList[_state.editId],
          ...action?.payload.data,
        };
      }
      return _state;
    }
    case actionType.updateData: {
      const _state = Object.assign({}, state);
      _state.widgetList[_state.editId] = _state.editWidget;
      _state.editId = "";
      _state.editWidget = {};
      return _state;
    }
    case actionType.loadData: {
      const { pager, data } = action.payload;
      const _state = cloneDeep(state);
      _state.isLoading = false;
      _state.widgetList = [..._state.widgetList, ...data];
      _state.pager = {
        ..._state.pager,
        ...pager,
      };
      return _state;
    }
    default: {
      return state;
    }
  }
};

export default widgetContainerReducer;
