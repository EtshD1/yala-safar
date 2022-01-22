import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import BackIcon from "../../assets/icons/BackButton.svg";
import Gear from "../../assets/icons/Gear.svg";
import userImg from "../../assets/Images/user.jpg";
import Image from "next/image";
import Link from "next/link";

const NavLink = ({
	label,
	purple = false,
	white = false,
	href,
}: {
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

	useEffect(() => {
		if (menu) {
			setShown(true);
		} else {
			const to = setTimeout(() => {
				setShown(false);
			}, 500);

			return () => clearTimeout(to);
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
						<NavLink href="/" white label="Reservations" />
						<NavLink href="/" white label="Messages" />
						<NavLink href="/" label="Your Properties" purple />
						<div className={styles.pic}>
							<div>
								<Image src={userImg} />
							</div>
						</div>
					</div>
				</div>
			</header>
			{shown ? (
				<div id={styles.menu} className={menu ? styles.active : ""}>
					<div>
						<div className={styles.back} onClick={ToggleMenu}>
							Back
							<Image src={BackIcon} />
						</div>
						<NavLink href="/" label="Home" />
						<NavLink href="/" label="Reservations" />
						<NavLink href="/" label="Messages" />
						<NavLink href="/" label="Your Properties" purple />
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
			) : (
				""
			)}
		</>
	);
};

export default Navbar;
