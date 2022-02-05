type AuthForm = (
	state: boolean,
	action: {
		type: "TOGGLE_AUTH_FORM";
	}
) => boolean;

type BookingForm = (
	state: {
		active: boolean;
		user: string;
		property: string;
	},
	action:
		| {
				type: "SHOW_BOOK_FORM";
				payload: {
					user: string;
					property: string;
				};
		  }
		| { type: "HIDE_BOOK_FORM" }
) => {
	active: boolean;
	user: string;
	property: string;
};
