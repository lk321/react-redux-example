import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import login from "./login";

const rootReducer = combineReducers({
  form,
  login
});

export default rootReducer;
