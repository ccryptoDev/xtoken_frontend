import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user.reducer";

const initialState = {};

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer, 
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
