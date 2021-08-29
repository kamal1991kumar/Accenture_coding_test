import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import widgetContainerReducer from "./reducers/widgetContainerReducer";
const root = combineReducers({
  widgetReducer: widgetContainerReducer,
});
export const store = createStore(root, applyMiddleware(thunk));
