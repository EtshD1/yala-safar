import { combineReducers } from "redux";
import { authForm, bookingForm } from "./forms";

const states = combineReducers({
	authForm,
	bookingForm,
});

export default states;

export type RootState = {
	authForm: boolean;
	bookingForm: {
		active: boolean;
		user: string;
		property: string;
	};
};
