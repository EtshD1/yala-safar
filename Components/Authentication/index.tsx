import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, ProviderId } from "firebase/auth";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Toggle_Auth_Form } from "../../redux/actions/forms";
import { useEffect, useState } from "react";
import Boarding from "../Boarding";

const Authentication = () => {
	const db = getFirestore();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const [boarding, setBoarding] = useState(false);
	const form = useSelector((states: RootState) => states.authForm);
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const toggleForm = () => {
		dispatch(Toggle_Auth_Form());
	};

	const uiConfig = {
		signInFlow: "popup",
		signInOptions: [ProviderId.GOOGLE],
		callbacks: {
			signInSuccessWithAuthResult: () => {
				toggleForm();
				return false;
			},
		},
	};

	useEffect(() => {
		if (form) {
			setActive(true);
		} else {
			const TO = setTimeout(() => {
				setActive(false);
			}, 500);

			return () => clearTimeout(TO);
		}
	}, [form]);

	if (user) {
		getDoc(doc(db, "users", user.uid)).then((doc) => {
			if (doc.exists()) {
				const data = doc.data();
				if (!data.onBoard) {
					setBoarding(true);
				} else {
					setBoarding(false);
				}
			} else {
				setBoarding(true);
			}
		});
		if (boarding) {
			return <Boarding />;
		}
		return <></>;
	}
	return active ? (
		<div
			className={[styles.modal, form ? styles.active : ""].join(" ")}
			onClick={toggleForm}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<h1>Sign in to enjoy the full experience</h1>
				<p>Find and post the most joyful properties</p>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
			</div>
		</div>
	) : (
		<></>
	);
};

export default Authentication;
