import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Property from "../../Components/Areas/Property";
import styles from "../../styles/reservations.module.scss";

const MyPropertiesReservations = () => {
	const firebaseApp = getApp();
	const db = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
	const [user] = useAuthState(auth);
	const [reservations, setReservations] = useState<
		Array<{
			property: string;
			accepted: string;
			rejected: string;
			checkin: string;
			checkout: string;
		}>
	>([]);

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, "reservations"),
				where("owner", "==", user.uid)
			);
			getDocs(q).then((docs) => {
				setReservations([]);
				docs.forEach((d) => {
					const data = d.data();
					setReservations((ps) => [
						...ps,
						{
							property: data.property,
							rejected: data.rejected,
							accepted: data.approved,
							checkin: data.checkin,
							checkout: data.checkout,
						},
					]);
				});
			});
		}
	}, [user, db, setReservations]);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.links}>
					<Link href="/reservations/my-reservations">
						<div>Your Reservations</div>
					</Link>
					<div className={styles.active}>Your properties</div>
				</div>
				<div className={styles.properties}>
					{reservations.map((r) => (
						<div key={r.property} className={styles.property}>
							<div>
								<Property id={r.property} />
							</div>
							<div className={styles.dates}>
								<div>
									<div>Checkin</div>
									<div>{r.checkin}</div>
								</div>
								<div>
									<div>Checkout:</div>
									<div>{r.checkout}</div>
								</div>
							</div>
							{r.accepted ? (
								<div
									className={[
										styles.status,
										styles.accepted,
									].join(" ")}
								>
									Accepted
								</div>
							) : r.rejected ? (
								<div
									className={[
										styles.status,
										styles.rejected,
									].join(" ")}
								>
									Rejected
								</div>
							) : (
								<div className={styles.actions}>
									<div>Contact</div>
									<div className={styles.accept}>Accept</div>
									<div className={styles.reject}>Reject</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyPropertiesReservations;
