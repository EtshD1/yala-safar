import { combineReducers } from "redux";
import { authForm } from "./forms";

const states = combineReducers({
	authForm,
});

export default states;

export type RootState = {
	authForm: boolean;
};
