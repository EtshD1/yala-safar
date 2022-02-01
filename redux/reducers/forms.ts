export const authForm: AuthForm = (state = false, action) => {
	if (action.type === "TOGGLE_AUTH_FORM") {
		return !state;
	}
	return state;
};
