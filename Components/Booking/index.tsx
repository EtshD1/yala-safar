import { getApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../Loader";
import styles from "./styles.module.scss";

const BookingForm = () => {
	const form = useSelector((states: RootState) => states.bookingForm);
	const [loading, setLoading] = useState(true);
	const [found, setFound] = useState(true);
	const firebaseApp = getApp();
	const db = getFirestore(firebaseApp);
	const [cash, setCash] = useState(true);
	const [details, setDetails] = useState({
		name: "",
		city: "",
		price: "",
	});
	const [checkin, setCheckin] = useState({
		day: new Date().getDate(),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const [checkout, setCheckout] = useState({
		day: new Date().getDate(),
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});

	useEffect(() => {
		if (form.active) {
			getDoc(doc(db, "properties", form.property)).then((doc) => {
				if (doc.exists()) {
					const data = doc.data();
					setDetails({
						name: data.name,
						city: data.city,
						price: data.price,
					});
					setLoading(false);
				} else {
					setLoading(false);
					setFound(false);
				}
			});
		}
	}, [db, form]);

	const checkinDays: Array<number> = [];
	for (
		let i = 0;
		i < new Date(checkin.year, checkin.month, 0).getDate();
		i++
	) {
		checkinDays.push(i + 1);
	}
	const checkoutDays: Array<number> = [];
	for (
		let i = 0;
		i < new Date(checkout.year, checkout.month, 0).getDate();
		i++
	) {
		checkoutDays.push(i + 1);
	}

	useEffect(() => {
		const co = new Date(
			checkout.year,
			checkout.month,
			checkout.day
		).getTime();
		const ci = new Date(checkin.year, checkin.month, checkin.day).getTime();

		if (ci > co) {
			setCheckout({
				day: checkin.day,
				month: checkin.month,
				year: checkin.year,
			});
		}
	}, [checkout, checkin, setCheckout]);

	const d1 = new Date(checkout.year, checkout.month, checkout.day);
	const d2 = new Date(checkin.year, checkin.month, checkin.day);
	const totaldays = (d1.getTime() - d2.getTime()) / 86400000;

	if (!form.active) {
		return <></>;
	}
	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.waiting}>
					<Loader />
				</div>
			</div>
		);
	}
	if (!found) {
		<div className={styles.container}>
			<div className={styles.waiting}>
				<div>An error occured, please try again later.</div>
			</div>
		</div>;
	}
	return (
		<div className={styles.container}>
			<div>
				<h1>Booking</h1>
				<div>
					<div>Booking for</div>
					<div className={styles.info}>
						<div>{details.name}</div>
						<div>{details.city}</div>
					</div>
					<div className={styles.price}>
						<div>
							<div>{details.price + " E£/night"}</div>
						</div>
					</div>
					<div className={styles.dates}>
						<div>
							<div>Check-in</div>
							<div className={styles.dateSelection}>
								<div>
									<div>
										<select
											value={checkin.day}
											onChange={(e) =>
												setCheckin((ps) => ({
													...ps,
													day: parseInt(
														e.target.value
													),
												}))
											}
										>
											{checkinDays.map((d) => (
												<option value={d} key={d}>
													{d}
												</option>
											))}
										</select>
									</div>
									<div className={styles.divider}>
										<select
											value={checkin.month}
											onChange={(e) =>
												setCheckin((ps) => ({
													...ps,
													month: parseInt(
														e.target.value
													),
													day: 1,
												}))
											}
										>
											<option value="1">January</option>
											<option value="2">February</option>
											<option value="3">March</option>
											<option value="4">April</option>
											<option value="5">May</option>
											<option value="6">June</option>
											<option value="7">July</option>
											<option value="8">August</option>
											<option value="9">September</option>
											<option value="10">October</option>
											<option value="11">November</option>
											<option value="12">December</option>
										</select>
									</div>
									<div>
										<select
											value={checkin.year}
											onChange={(e) =>
												setCheckin((ps) => ({
													...ps,
													year: parseInt(
														e.target.value
													),
													day: 1,
												}))
											}
										>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
											<option value="2026">2026</option>
											<option value="2027">2027</option>
											<option value="2028">2028</option>
											<option value="2029">2029</option>
											<option value="2030">2030</option>
											<option value="2031">2031</option>
											<option value="2032">2032</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div>Check-out</div>
							<div className={styles.dateSelection}>
								<div>
									<div>
										<select
											value={checkout.day}
											onChange={(e) =>
												setCheckout((ps) => ({
													...ps,
													day: parseInt(
														e.target.value
													),
												}))
											}
										>
											{checkinDays.map((d) => (
												<option value={d} key={d}>
													{d}
												</option>
											))}
										</select>
									</div>
									<div className={styles.divider}>
										<select
											value={checkout.month}
											onChange={(e) =>
												setCheckout((ps) => ({
													...ps,
													month: parseInt(
														e.target.value
													),
													day: 1,
												}))
											}
										>
											<option value="1">January</option>
											<option value="2">February</option>
											<option value="3">March</option>
											<option value="4">April</option>
											<option value="5">May</option>
											<option value="6">June</option>
											<option value="7">July</option>
											<option value="8">August</option>
											<option value="9">September</option>
											<option value="10">October</option>
											<option value="11">November</option>
											<option value="12">December</option>
										</select>
									</div>
									<div>
										<select
											value={checkout.year}
											onChange={(e) =>
												setCheckout((ps) => ({
													...ps,
													year: parseInt(
														e.target.value
													),
													day: 1,
												}))
											}
										>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
											<option value="2026">2026</option>
											<option value="2027">2027</option>
											<option value="2028">2028</option>
											<option value="2029">2029</option>
											<option value="2030">2030</option>
											<option value="2031">2031</option>
											<option value="2032">2032</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className={styles.heading3}>Payment</div>
						<div>Method:</div>
						<div className={styles.paymentMethod}>
							<div
								className={cash ? styles.active : ""}
								onClick={() => setCash(true)}
							>
								Cash
							</div>
							<div
								className={!cash ? styles.active : ""}
								onClick={() => setCash(false)}
							>
								Credit/Debit Card
							</div>
						</div>
					</div>
					{cash ? (
						<></>
					) : (
						<div className={styles.cardPayment}>
							<div>
								<div>Card Number</div>
								<div>
									<input type="text" />
								</div>
							</div>
							<div>
								<div>Cardholder's Name</div>
								<div>
									<input type="text" />
								</div>
							</div>
							<div>
								<div>
									<div>CVV</div>
									<div>
										<input type="text" />
									</div>
								</div>
								<div>
									<div>Expiry Date</div>
									<div>
										<input type="text" placeholder="MM" />
										<input type="text" placeholder="YYYY" />
									</div>
								</div>
							</div>
						</div>
					)}
					<div className={styles.totalDays}>
						<div>
							<div>Total Days:{` ${totaldays + 1}`}</div>
							<div className={styles.bold}>
								{`${
									(totaldays + 1) * parseInt(details.price)
								} E£`}
							</div>
						</div>
					</div>
					<div className={styles.actions}>
						<div className={styles.submit}>Book Now</div>
						<div className={styles.cancel}>Cancel</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
