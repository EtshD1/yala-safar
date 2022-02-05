export const authForm: AuthForm = (state = false, action) => {
	if (action.type === "TOGGLE_AUTH_FORM") {
		return !state;
	}
	return state;
};

export const bookingForm: BookingForm = (
	state = {
		active: false,
		user: "",
		property: "",
	},
	action
) => {
	if (action.type === "SHOW_BOOK_FORM") {
		return {
			active: true,
			user: action.payload.user,
			property: action.payload.property,
		};
	}
	if (action.type === "HIDE_BOOK_FORM") {
		return {
			active: false,
			user: "",
			property: "",
		};
	}
	return state;
};
