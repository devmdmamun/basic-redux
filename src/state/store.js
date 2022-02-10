// import createStore and applyMiddleware
import { createStore, applyMiddleware } from "redux";
// import reducers
import reducers from "./reducers/combReducers";
// import thunk middleware
import thunk from "redux-thunk";

// export the store.
export const store = createStore(reducers, {}, applyMiddleware(thunk));
