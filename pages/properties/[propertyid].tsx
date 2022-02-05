import styles from "../../styles/Property.module.scss";
// import Image from "next/image";
import chalet1 from "../../assets/Images/chalet1.jpg";
import Back from "../../assets/icons/Back.svg";
import Star from "../../assets/icons/Star.svg";
import Location from "../../assets/icons/Location.svg";
import { useRouter } from "next/router";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { getApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Loader from "../../Components/Loader";
import Link from "next/link";

const Property = () => {
	const { query } = useRouter();
	const firebaseApp = getApp();
	const db = getFirestore();
	const storage = getStorage(firebaseApp);
	const [img, setImage] = useState("");
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState({
		name: "",
		rating: 0,
		price: 0,
		location: "",
		owner: "",
		includes: {
			beachAccess: false,
			wifi: false,
			privatePool: false,
			roomService: false,
			park: false,
			market: false,
			ac: false,
			transportation: false,
		},
	});

	useEffect(() => {
		if (query.propertyid) {
			getDownloadURL(ref(storage, query.propertyid.toString())).then(
				(url) => {
					setImage(url);
				}
			);
			getDoc(doc(db, "properties", query.propertyid.toString())).then(
				(doc) => {
					if (doc.exists()) {
						const data = doc.data();
						const rating: [number] = data.rating;
						setDetails({
							name: data.name,
							location: data.location,
							owner: data.owner,
							price: data.price,
							rating:
								rating.length > 0
									? rating.reduce((t, v) => t + v)
									: 0,
							includes: {
								ac: data.ac,
								beachAccess: data.beachAccess,
								market: data.market,
								park: data.park,
								privatePool: data.privatePool,
								roomService: data.roomService,
								transportation: data.transportation,
								wifi: data.wifi,
							},
						});
						setLoading(false);
					}
				}
			);
		}
	}, [query, storage, db]);

	if (loading) {
		return (
			<div className={styles.waiting}>
				<div>
					<Loader />
					<div>Please Wait</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.preview}>
					<div className={styles.bg}>
						<img src={img ? img : "Property Image"} alt="Image" />
					</div>
					<div className={styles.info}>
						<div className={styles.back}>
							<Link href="/properties">
								<div>
									<img src={Back.src} />
								</div>
							</Link>
						</div>
						<div>
							<div className={styles.name}>{details.name}</div>
							<div>{details.price} E£/night</div>
						</div>
					</div>
				</div>
				<div>
					<div className={styles.info}>
						<div className={styles.rating_location}>
							<div>
								<div className={styles.icon}>
									<img src={Location.src} />
								</div>
								<div>
									<a href={details.location} target="_blank">
										<div className={styles.heading}>
											Location
										</div>
									</a>
								</div>
							</div>
							<div>
								<div className={styles.icon}>
									<img src={Star.src} />
								</div>
								<div>
									<div className={styles.heading}>4.9</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.offers}>
						<div>What this place offers</div>
						<div className={styles.perks}>
							{details.includes.ac ? (
								<div>
									<div>Air</div>
									<div>Conditioning</div>
								</div>
							) : (
								""
							)}
							{details.includes.beachAccess ? (
								<div>Beach</div>
							) : (
								""
							)}
							{details.includes.market ? (
								<div>
									<div>Market</div>
									<div>Close</div>
								</div>
							) : (
								""
							)}
							{details.includes.park ? (
								<div>
									<div>Park</div>
									<div>Nearby</div>
								</div>
							) : (
								""
							)}
							{details.includes.privatePool ? (
								<div>Pool</div>
							) : (
								""
							)}
							{details.includes.roomService ? (
								<div>
									<div>Room</div>
									<div>Service</div>
								</div>
							) : (
								""
							)}
							{details.includes.transportation ? (
								<div>Transportation</div>
							) : (
								""
							)}
							{details.includes.park ? <div>Park</div> : ""}
							{details.includes.wifi ? <div>Wi-Fi</div> : ""}
						</div>
					</div>
					<div className={styles.cta}>
						<div>Contact Owner</div>
						<div className={styles.book}>Book Now</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Property;
