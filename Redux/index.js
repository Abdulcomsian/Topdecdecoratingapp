
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store