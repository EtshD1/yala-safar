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

const Reservations = () => {
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
				where("reserver", "==", user.uid)
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
					<div className={styles.active}>Your Reservations</div>
					<Link href="/reservations/my-properties">
						<div>Your properties</div>
					</Link>
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
								<div className={styles.status}>
									Approval Pending
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Reservations;
