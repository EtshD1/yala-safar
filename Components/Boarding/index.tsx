import styles from "./styles.module.scss";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const Field = ({
	value,
	onChange,
	label,
	warning,
	verify,
}: {
	value: string;
	onChange: (s: string) => void;
	label: string;
	warning: string;
	verify: (s: string) => void;
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange(newValue);
		if (warning) {
			verify(newValue);
		}
	};

	return (
		<div>
			<label>
				<div>{label}</div>
				<div className={styles.warning}>{warning}</div>
				<input
					type="text"
					value={value}
					onChange={handleChange}
					onBlur={() => verify(value)}
				/>
			</label>
		</div>
	);
};

const Boarding = () => {
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const db = getFirestore();
	// First Name
	const [fName, setFName] = useState("");
	const [fNameWarning, setFNameWarning] = useState("");
	const checkOnFName = (s: string) => {
		if (s.length === 0) {
			setFNameWarning("Please enter your first Name");
		} else {
			setFNameWarning("");
		}
	};
	// Last Name
	const [lName, setLName] = useState("");
	const [lNameWarning, setLNameWarning] = useState("");
	const checkOnLName = (s: string) => {
		if (s.length === 0) {
			setLNameWarning("Please enter your first Name");
		} else {
			setLNameWarning("");
		}
	};
	// Phone Number
	const [phone, setPhone] = useState("");
	const [phoneWarning, setPhoneWarning] = useState("");
	const checkOnPhone = (s: string) => {
		const reg = /01[0-9]{9}/;
		if (reg.test(s)) {
			setPhoneWarning("");
		} else {
			setPhoneWarning("Please enter a valid Phone Number");
		}
	};
	// Email
	const [email, setEmail] = useState("");
	const [emailWarning, setEmailWarning] = useState("");
	const checkOnEmail = (s: string) => {
		const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		if (reg.test(s)) {
			setEmailWarning("");
		} else {
			setEmailWarning("Please enter a valid Email Address");
		}
	};

	useEffect(() => {
		if (user) {
			if (user.email) {
				setEmail(user.email);
			}
			if (user.phoneNumber) {
				setPhone(user.phoneNumber);
			}
			if (user.displayName) {
				const names = user.displayName.split(" ");
				const first = names[0];
				setFName(first);
				if (names.length > 1) {
					setLName(names[names.length - 1]);
				}
			}
		}
	}, [user]);

	const logout = () => {
		signOut(auth);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		checkOnEmail(email);
		checkOnFName(fName);
		checkOnLName(lName);
		checkOnPhone(phone);
		if (emailWarning) {
			return;
		}
		if (fNameWarning) {
			return;
		}
		if (lNameWarning) {
			return;
		}
		if (phoneWarning) {
			return;
		}
		setDoc(
			doc(db, "users", user!.uid),
			{
				fName,
				lName,
				phone,
				email,
				onBoard: true,
			},
			{ merge: true }
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>Welcome to Yala Safar</h1>
				<p>Please fill out this form so you can continue</p>
				<form onSubmit={handleSubmit}>
					<div className={styles.name}>
						<Field
							label="First Name"
							value={fName}
							onChange={setFName}
							warning={fNameWarning}
							verify={checkOnFName}
						/>
						<Field
							label="Last Name"
							value={lName}
							onChange={setLName}
							warning={lNameWarning}
							verify={checkOnLName}
						/>
					</div>
					<Field
						label="Phone Number"
						value={phone}
						onChange={setPhone}
						warning={phoneWarning}
						verify={checkOnPhone}
					/>
					<Field
						label="Email Address"
						value={email}
						onChange={setEmail}
						warning={emailWarning}
						verify={checkOnEmail}
					/>
					<div className={styles.actions}>
						<div onClick={logout}>Sign Out</div>
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Boarding;
