import Link from "next/link";
import styles from "../../styles/reservations.module.scss";

const MyPropertiesReservations = () => {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.links}>
					<Link href="/reservations/my-reservations">
						<div>Your Reservations</div>
					</Link>
					<div className={styles.active}>Your properties</div>
				</div>
			</div>
		</div>
	);
};

export default MyPropertiesReservations;
