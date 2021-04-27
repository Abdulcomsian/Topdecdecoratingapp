import { combineReducers } from "redux";
import auth from "./reducer/reducer";
import summary from "./reducer/Summary";
export default combineReducers({
  auth,
  summary,
});
