import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { store } from "./store";

import WidgetContainer from "./containers/WidgetContainer";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <WidgetContainer />
  </Provider>,
  rootElement
);
