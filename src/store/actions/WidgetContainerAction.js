import { noop } from "lodash";
import Axios from "axios";
Axios.defaults.baseURL = "https://39ktg.sse.codesandbox.io/api/";
const actionType = {
  toggleLoader: "TOGGLE_LOADER",
  toggleModal: "TOGGLE_Modal",
  loadData: "LOAD_WIDGET_DATA",
  editData: "EDIT_WIDGET_DATA",
  updateData: "UPDATE_WIDGET_DATA",
  validateTitle: "VALIDATE_WIDGET_DATA",
};

const loadDataAction = (isScrollTop, firstLoad) => (dispatch, getState) => {
  const pager = {
    ...getState().widgetReducer.pager,
  };
  if (!isScrollTop) {
    if (pager.start < pager.total && !firstLoad) {
      fetchData(dispatch, pager, noop);
    } else if (pager.start < pager.total - pager.threshold) {
      pager.start += pager.threshold;
      fetchData(dispatch, pager);
    }
  }
};

function fetchData(dispatch, pager) {
  dispatch({
    type: actionType.toggleLoader,
  });

  Axios.get(`?start=${pager.start}&threshold=${pager.threshold}`)
    .then(({ data }) => {
      dispatch({
        type: actionType.loadData,
        payload: {
          data: data.data,
          pager: {
            ...pager,
            total: data.total,
          },
        },
      });
    })
    .catch(() => {
      dispatch({
        type: actionType.toggleLoader,
      });
    });
}

const editWidgetAction = (payload) => ({
  type: actionType.editData,
  payload,
});

const validateWidgetAction = (payload) => (dispatch) => {
  dispatch({
    type: actionType.validateTitle,
    payload,
  });
  Axios.get(`search/?string=${payload.title}&id=${payload.id}`)
    .then(({ data }) => {
      dispatch({
        type: actionType.validateTitle,
        payload: data,
      });
    })
    .catch(() => {
      dispatch({
        type: actionType.validateTitle,
      });
    });
};

const updateWidgetAction = () => ({
  type: actionType.updateData,
});

const toggleWidgetAction = (payload) => ({
  type: actionType.toggleModal,
  payload,
});

export {
  loadDataAction,
  actionType,
  editWidgetAction,
  updateWidgetAction,
  validateWidgetAction,
  toggleWidgetAction,
};
