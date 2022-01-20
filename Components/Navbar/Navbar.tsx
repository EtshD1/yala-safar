import styles from "./Navbar.module.scss";

const Navbar = () => {
	return (
		<header className={styles.header}>
			<div className={styles.navbar}>
				<div className={styles.logo}>Yala Safar</div>
				<div>
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
	);
};

export default Navbar;
