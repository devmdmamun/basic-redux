// import combineReducers
import { combineReducers } from "redux";
// import countingReducer for countingReducer.js
import countingReducer from "./countingReducer";
const reducers = combineReducers({
  // key:     value
  count: countingReducer,
});
// exportin reducers
export default reducers;
