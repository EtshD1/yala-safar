import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import BackIcon from "../../assets/icons/BackButton.svg";
import Gear from "../../assets/icons/Gear.svg";
import userImg from "../../assets/Images/user.jpg";
import Image from "next/image";

const NavLink = ({
	label,
	purple = false,
}: {
	label: string;
	purple?: boolean;
}) => {
	return (
		<div
			className={[styles.navLink, purple ? styles.purple : ""].join(" ")}
		>
			<div>
				<div>{label}</div>
				<div className={styles.line}></div>
			</div>
		</div>
	);
};

const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		if (menu) {
			setShown(true);
		} else {
			setTimeout(() => {
				setShown(false);
			}, 1000);
		}
	});

	const ToggleMenu = () => {
		setMenu((ps) => !ps);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.navbar}>
					<div className={styles.logo}>Yala Safar</div>
					<div onClick={ToggleMenu}>
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
				</div>
			</header>
			<div id={styles.menu} className={menu ? styles.active : ""}>
				<div>
					<div className={styles.back} onClick={ToggleMenu}>
						Back
						<Image src={BackIcon} />
					</div>
					<NavLink label="Home" />
					<NavLink label="Reservations" />
					<NavLink label="Messages" />
					<NavLink label="Your Properties" purple />
				</div>
				<div className={styles.profile}>
					<div className={styles.pic}>
						<Image src={userImg} />
					</div>
					<div className={styles.info}>
						<div>Sara Joesph</div>
						<div className={styles.email}>
							sara.joesph@gmail.com
						</div>
					</div>
					<div>
						<Image src={Gear} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
