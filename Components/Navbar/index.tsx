// import Image from "next/image";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Navbar.module.scss";
import BackIcon from "../../assets/icons/BackButton.svg";
import Gear from "../../assets/icons/Gear.svg";
import { Toggle_Auth_Form } from "../../redux/actions/forms";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Loader from "../Loader";

const NavLink = ({
	label,
	purple = false,
	white = false,
	href,
	closeMenu,
}: {
	closeMenu?: () => void;
	href: string;
	label: string;
	purple?: boolean;
	white?: boolean;
}) => {
	return (
		<Link href={href}>
			<div
				className={[
					styles.navLink,
					purple ? styles.purple : white ? styles.white : "",
				].join(" ")}
				onClick={closeMenu ? closeMenu : () => {}}
			>
				<div>
					<div>{label}</div>
					<div className={styles.line}></div>
				</div>
			</div>
		</Link>
	);
};

const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const [shown, setShown] = useState(false);
	const db = getFirestore();
	const [user, loading, error] = useAuthState(getAuth());
	const dispatch = useDispatch();

	const [profile, setProfile] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		if (menu) {
			setShown(true);
		} else {
			const to = setTimeout(() => {
				setShown(false);
			}, 500);

			return () => clearTimeout(to);
		}
	}, [menu, setShown]);

	useEffect(() => {
		if (user) {
			getDoc(doc(db, "users", user.uid)).then((doc) => {
				if (doc.exists()) {
					const data = doc.data();
					if (data.onBoard) {
						setProfile({
							name: `${data.fName} ${data.lName}`,
							email: data.email,
						});
					}
				}
			});
		}
	}, [user, setProfile]);

	const ToggleMenu = () => {
		setMenu((ps) => !ps);
	};

	const toggleForm = () => {
		ToggleMenu();
		dispatch(Toggle_Auth_Form());
	};

	const logout = () => {
		ToggleMenu();
		signOut(getAuth());
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.navbar}>
					<div className={styles.logo}>Yala Safar</div>
					<div onClick={ToggleMenu} className={styles.burger}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="29"
							height="24"
							viewBox="0 0 29 24"
						>
							<g
								id="Group_1"
								data-name="Group 1"
								transform="translate(-311 -27)"
							>
								<line
									id="Line_2"
									data-name="Line 2"
									x2="25"
									transform="translate(313 29)"
									fill="none"
									stroke="#fff"
									strokeLinecap="round"
									strokeWidth="4"
								/>
								<line
									id="Line_3"
									data-name="Line 3"
									x2="18"
									transform="translate(320 39)"
									fill="none"
									stroke="#fff"
									strokeLinecap="round"
									strokeWidth="4"
								/>
								<line
									id="Line_4"
									data-name="Line 4"
									x2="25"
									transform="translate(313 49)"
									fill="none"
									stroke="#fff"
									strokeLinecap="round"
									strokeWidth="4"
								/>
							</g>
						</svg>
					</div>
					<div className={styles.desktopLinks}>
						<NavLink href="/" white label="Home" />
						{user ? (
							<>
								<NavLink
									href="/reservations/my-reservations"
									white
									label="Reservations"
								/>
								<NavLink
									href="/my-properties"
									label="Your Properties"
									purple
								/>
								<button className={styles.profile}>
									<div className={styles.pic}>
										<div>
											<img
												src={
													user.photoURL
														? user.photoURL
														: ""
												}
												alt="User Image"
											/>
										</div>
									</div>
									<div className={styles.profileMenu}>
										<div>
											<div>
												<Link
													href={`/user/${user.uid}`}
												>
													<div>
														<div>Profile</div>
														<div
															className={
																styles.underline
															}
														></div>
													</div>
												</Link>
												<div
													className={styles.red}
													onClick={logout}
												>
													<div>Logout</div>
													<div
														className={
															styles.underline
														}
													></div>
												</div>
											</div>
										</div>
									</div>
								</button>
							</>
						) : loading ? (
							<Loader />
						) : (
							<>
								<div
									className={[
										styles.navLink,
										styles.purple,
									].join(" ")}
									onClick={toggleForm}
								>
									Sign In
								</div>
							</>
						)}
					</div>
				</div>
			</header>
			{shown ? (
				<div id={styles.menu} className={menu ? styles.active : ""}>
					<div>
						<div className={styles.back} onClick={ToggleMenu}>
							Back
							<img src={BackIcon.src} />
						</div>
						<NavLink href="/" label="Home" closeMenu={ToggleMenu} />
						{user ? (
							<>
								<NavLink
									href="/reservations/my-reservations"
									label="Reservations"
									closeMenu={ToggleMenu}
								/>
								<NavLink
									closeMenu={ToggleMenu}
									href="/my-properties"
									label="Your Properties"
									purple
								/>
							</>
						) : (
							""
						)}
					</div>
					{user ? (
						<button className={styles.profile}>
							<div className={styles.actions}>
								<Link href={`/user/${user.uid}`}>
									<div onClick={ToggleMenu}>
										<div>Profile</div>
										<div className={styles.line}></div>
									</div>
								</Link>
								<div className={styles.red}>
									<div onClick={logout}>Logout</div>
									<div className={styles.line}></div>
								</div>
							</div>
							<div className={styles.pic}>
								<img
									src={user.photoURL ? user.photoURL : ""}
									alt="User Image"
								/>
							</div>
							<div className={styles.info}>
								<div>{profile.name}</div>
								<div className={styles.email}>
									{profile.email}
								</div>
							</div>
							<div>
								<img src={Gear.src} />
							</div>
						</button>
					) : (
						<div
							className={[styles.navLink, styles.purple].join(
								" "
							)}
							onClick={toggleForm}
						>
							Sign In
						</div>
					)}
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Navbar;
