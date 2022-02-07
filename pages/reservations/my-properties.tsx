import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Property from "../../Components/Areas/Property";
import Loader from "../../Components/Loader";
import styles from "../../styles/reservations.module.scss";

const MyPropertiesReservations = () => {
	const firebaseApp = getApp();
	const db = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
	const [user] = useAuthState(auth);
	const [reservations, setReservations] = useState<
		Array<{
			property: string;
			accepted: boolean;
			rejected: boolean;
			checkin: string;
			checkout: string;
			reserver: string;
			id: string;
			loading: boolean;
		}>
	>([]);

	const Approve = async (rid: string) => {
		const resRef = doc(db, "reservations", rid);
		setReservations((ps) => {
			const index = ps.findIndex((r) => r.id === rid);
			const newRes = { ...ps[index] };
			newRes.loading = true;

			return [...ps.slice(0, index), newRes, ...ps.slice(index + 1)];
		});
		await updateDoc(resRef, {
			approved: true,
		});
		setReservations((ps) => {
			const index = ps.findIndex((r) => r.id === rid);
			const newRes = { ...ps[index] };
			newRes.accepted = true;
			newRes.loading = true;
			return [...ps.slice(0, index), newRes, ...ps.slice(index + 1)];
		});
	};

	const Reject = async (rid: string) => {
		const resRef = doc(db, "reservations", rid);
		setReservations((ps) => {
			const index = ps.findIndex((r) => r.id === rid);
			const newRes = { ...ps[index] };
			newRes.loading = true;

			return [...ps.slice(0, index), newRes, ...ps.slice(index + 1)];
		});
		await updateDoc(resRef, {
			rejected: true,
		});
		setReservations((ps) => {
			const index = ps.findIndex((r) => r.id === rid);
			const newRes = { ...ps[index] };
			newRes.rejected = true;
			newRes.loading = false;
			return [...ps.slice(0, index), newRes, ...ps.slice(index + 1)];
		});
	};

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
							reserver: data.reserver,
							id: d.id,
							loading: false,
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
						<div key={r.id} className={styles.property}>
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
							) : r.loading ? (
								<div className={styles.loading}>
									<Loader />
								</div>
							) : (
								<div className={styles.actions}>
									<Link href={`/user/${r.reserver}`}>
										<div>Contact</div>
									</Link>
									<div
										className={styles.accept}
										onClick={() => Approve(r.id)}
									>
										Accept
									</div>
									<div
										onClick={() => Reject(r.id)}
										className={styles.reject}
									>
										Reject
									</div>
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
