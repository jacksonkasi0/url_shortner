import { combineReducers, createStore } from "redux";

import userReducer from "./reducer/user";
import appReducer from "./reducer/appFuntions";

const rootReducer = combineReducers({
  auth: userReducer,
  app: appReducer,
});

export const store = createStore(rootReducer);
