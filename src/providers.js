    /* eslint-disable */
import createHistory from "history/createBrowserHistory";
import configureStore from "./configureStore";
export const store = configureStore();
export const history = createHistory();
/* eslint-enable */