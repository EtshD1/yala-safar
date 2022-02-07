import styles from "../../styles/Property.module.scss";
// import Image from "next/image";
import chalet1 from "../../assets/Images/chalet1.jpg";
import Back from "../../assets/icons/Back.svg";
import Star from "../../assets/icons/Star.svg";
import Location from "../../assets/icons/Location.svg";
import { useRouter } from "next/router";
import {
	getStorage,
	ref,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { getApp } from "firebase/app";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import Loader from "../../Components/Loader";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Show_Book_Form, Toggle_Auth_Form } from "../../redux/actions/forms";
import BookingForm from "../../Components/Booking";

const Property = () => {
	const { query } = useRouter();
	const firebaseApp = getApp();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const db = getFirestore();
	const storage = getStorage(firebaseApp);
	const router = useRouter();
	const [img, setImage] = useState("");
	const [loading, setLoading] = useState(true);
	const [found, setFound] = useState(true);
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
	const dispatch = useDispatch();

	useEffect(() => {
		if (query.propertyid) {
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
						getDownloadURL(
							ref(storage, query.propertyid!.toString())
						).then((url) => {
							setImage(url);
							setLoading(false);
						});
					} else {
						setLoading(false);
						setFound(false);
					}
				}
			);
		}
	}, [query, storage, db]);

	const deleteProperty = () => {
		const desertRef = ref(storage, "images/desert.jpg");
		setLoading(true);
		deleteObject(desertRef)
			.then(() => {
				console.log("Image Deleted");
			})
			.catch((error) => {
				console.error(error);
			});
		deleteDoc(doc(db, "properties", query.propertyid!.toString())).then(
			() => {
				router.push("/");
			}
		);
	};

	const book = () => {
		if (user) {
			dispatch(
				Show_Book_Form(
					user.uid,
					query.propertyid!.toString(),
					details.owner
				)
			);
		} else {
			dispatch(Toggle_Auth_Form());
		}
	};

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

	if (!found) {
		return (
			<div className={styles.waiting}>
				<div>
					<div>404</div>
					<div>Property not found</div>
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
						{user ? (
							user.uid === details.owner ? (
								<>
									<div
										className={styles.delete}
										onClick={deleteProperty}
									>
										Delete Property
									</div>
								</>
							) : (
								<>
									<Link href={`/user/${details.owner}`}>
										<div>Contact Owner</div>
									</Link>
									<div className={styles.book} onClick={book}>
										Book Now
									</div>
								</>
							)
						) : (
							<>
								<Link href={`/user/${details.owner}`}>
									<div>Contact Owner</div>
								</Link>
								<div className={styles.book} onClick={book}>
									Book Now
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<BookingForm />
		</div>
	);
};

export default Property;
