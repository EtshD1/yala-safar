// import Image from "next/image";
import Star from "../../assets/icons/Star.svg";
import HollowStar from "../../assets/icons/hollowStar.svg";
import styles from "./styles.module.scss";
import Link from "next/link";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const Property = ({ id, view = false }: { id: string; view?: boolean }) => {
	const db = getFirestore();
	const firebaseApp = getApp();
	const storage = getStorage(firebaseApp);
	const [img, setImage] = useState("");
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState({
		name: "",
		rating: 0,
		price: 0,
		location: "",
	});
	const stars = [];
	useEffect(() => {
		getDownloadURL(ref(storage, id.toString())).then((url) => {
			setImage(url);
		});
		getDoc(doc(db, "properties", id.toString())).then((doc) => {
			if (doc.exists()) {
				const data = doc.data();
				const rating: [number] = data.rating;
				setDetails({
					name: data.name,
					location: data.city,
					price: data.price,
					rating:
						rating.length > 0 ? rating.reduce((t, v) => t + v) : 0,
				});
				setLoading(false);
			}
		});
	}, [storage, db]);

	for (let i = 0; i < details.rating; i++) {
		stars.push(<img key={i} src={Star.src} />);
	}
	for (let i = details.rating; i < 5; i++) {
		stars.push(<img key={i} src={HollowStar.src} />);
	}
	return (
		<Link href={`/properties/${id}`}>
			<div className={styles.property}>
				<div
					className={[styles.image, view ? styles.unset : ""].join(
						" "
					)}
				>
					<img className={styles.Img} src={img} />
				</div>
				<div className={styles.info}>
					<div className={styles.location}>{details.location}</div>
					<div className={styles.rating}>{stars}</div>
					<div className={styles.price}>{details.price}£/night</div>
				</div>
			</div>
		</Link>
	);
};

export default Property;
