export const Toggle_Auth_Form = () => ({ type: "TOGGLE_AUTH_FORM" });

export const Show_Book_Form = (uid: string, pid: string, oid: string) => ({
	type: "SHOW_BOOK_FORM",
	payload: {
		user: uid,
		property: pid,
		owner: oid,
	},
});

export const Hide_Book_Form = () => ({
	type: "HIDE_BOOK_FORM",
});
