import { useAuthState } from "react-firebase-hooks/auth";
import {
	getFirestore,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import Router from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, ProviderId } from "firebase/auth";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { Toggle_Auth_Form } from "../../redux/actions/forms";
import { useEffect, useState } from "react";

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
		signInOptions: [ProviderId.GITHUB, ProviderId.GOOGLE],
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
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const querySnapshot = getDocs(q);
		querySnapshot.then((data) => {
			if (data.size) {
				setBoarding(true);
			}
			data.forEach((doc) => {
				const info = doc.data();

				if (!info.onBoard) {
					setBoarding(true);
				}
			});
		});

		if (boarding) {
			Router.push("/boarding");
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
