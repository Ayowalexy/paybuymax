import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { walletReducer } from "./wallet";

export const rootReducers = combineReducers({
    authReducer,
    walletReducer
})