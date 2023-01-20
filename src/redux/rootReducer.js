import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
// room to include more reducers to handle different modules

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
