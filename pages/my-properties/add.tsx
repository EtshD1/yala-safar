import { useState } from "react";
import styles from "../../styles/AddProperty.module.scss";
import AddImage from "../../assets/icons/AddImage.svg";
import { getApp } from "firebase/app";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Loader from "../../Components/Loader";

const Field = ({
	label,
	value,
	onChange,
	warning,
}: {
	label: string;
	value: string;
	onChange: (s: string) => void;
	warning: string;
	number?: boolean;
}) => {
	return (
		<div className={styles.field}>
			<label>
				<div>{label}</div>
				<div className={styles.warning}>{warning}</div>
				<input
					type="text"
					value={value}
					onChange={(e) => {
						onChange(e.target.value);
					}}
				/>
			</label>
		</div>
	);
};

const Checkbox = ({
	label,
	value,
	onChange,
}: {
	label: string;
	value: boolean;
	onChange: () => void;
}) => {
	return (
		<div>
			<label>
				<input type="checkbox" checked={value} onChange={onChange} />
				{label}
			</label>
		</div>
	);
};

const Add = () => {
	const [img, setImg] = useState<File | null>();
	const firebaseApp = getApp();
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	const storage = getStorage(firebaseApp);
	const db = getFirestore();
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [city, setCity] = useState<string>("Cairo");
	const [price, setPrice] = useState(0);
	const router = useRouter();
	const [warning, setWarnings] = useState({
		name: "",
		location: "",
		city: "",
		price: "",
		img: "",
	});
	const [includes, setIncludes] = useState({
		beachAccess: false,
		wifi: false,
		privatePool: false,
		roomService: false,
		park: false,
		market: false,
		ac: false,
		transportation: false,
	});
	const [waiting, setWaiting] = useState(false);

	if (!loading) {
		if (!user) {
			router.back();
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let submit = true;
		if (!name) {
			setWarnings((ps) => ({ ...ps, name: "Please enter a name" }));
			submit = false;
		}
		if (!img) {
			setWarnings((ps) => ({ ...ps, img: "Please select an image" }));
			submit = false;
		}
		if (!location) {
			setWarnings((ps) => ({
				...ps,
				location: "Please enter a Location",
			}));
			submit = false;
		}
		if (!city) {
			setWarnings((ps) => ({ ...ps, city: "Please select a City" }));
			submit = false;
		}
		if (!price) {
			setWarnings((ps) => ({ ...ps, price: "Please enter a Price" }));
			submit = false;
		}
		if (submit) {
			setWaiting(true);
			const docRef = await addDoc(collection(db, "properties"), {
				name,
				location,
				city,
				price,
				...includes,
				owner: user!.uid,
				rating: [],
			});

			const storageRef = ref(storage, `${docRef.id}`);
			const file = await img!.arrayBuffer();
			uploadBytes(storageRef, file).then((snapshot) => {
				router.push(`/properties/${docRef.id}`);
			});
		}
	};

	if (waiting) {
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
		<div className={styles.container}>
			<h1>Property Posting</h1>
			<div className={styles.form}>
				<form onSubmit={handleSubmit}>
					<div className={styles.imgInput}>
						<div className={styles.warning}>{warning.img}</div>
						<label>
							<input
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								onChange={(e) => {
									const x = e.target.files![0];
									setImg(x);
								}}
							/>
							{img ? (
								<div className={styles.img}>
									<img
										style={{ alignSelf: "center" }}
										src={URL.createObjectURL(img)}
										alt=""
									/>
								</div>
							) : (
								<div
									className={styles.img}
									style={{
										background: `url(${AddImage.src})`,
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
									}}
								></div>
							)}
						</label>
					</div>
					<Field
						label="Name"
						value={name}
						onChange={setName}
						warning={warning.name}
					/>
					<Field
						label="Location"
						value={location}
						onChange={setLocation}
						warning={warning.location}
					/>
					<div className={styles.field}>
						<label>
							<div>City</div>
							<div className={styles.warning}>{warning.city}</div>
							<select
								value={city}
								onChange={(e) => setCity(e.target.value)}
							>
								<option value="Cairo">Cairo</option>
								<option value="Alexandira">Alexandira</option>
								<option value="Luxor">Luxor</option>
								<option value="Giza">Giza</option>
								<option value="Hurghada">Hurghada</option>
								<option value="North Coast">North Coast</option>
								<option value="Sharm El-Sheikh">
									Sharm El-Sheikh
								</option>
								<option value="Port Said">Port Said</option>
							</select>
						</label>
					</div>
					<div className={styles.field}>
						<label>
							<div>Price per night</div>
							<div className={styles.warning}>
								{warning.price}
							</div>
							<input
								type="number"
								value={price}
								onChange={(e) => {
									setPrice(parseInt(e.target.value));
								}}
								min={0}
							/>
						</label>
					</div>
					<div className={styles.includes}>
						<Checkbox
							label="Beach Access"
							value={includes.beachAccess}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									beachAccess: !ps.beachAccess,
								}))
							}
						/>
						<Checkbox
							label="Wi-Fi"
							value={includes.wifi}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									wifi: !ps.wifi,
								}))
							}
						/>
						<Checkbox
							label="Private Pool"
							value={includes.privatePool}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									privatePool: !ps.privatePool,
								}))
							}
						/>
						<Checkbox
							label="Room Service"
							value={includes.roomService}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									roomService: !ps.roomService,
								}))
							}
						/>
						<Checkbox
							label="Park Nearby"
							value={includes.park}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									park: !ps.park,
								}))
							}
						/>
						<Checkbox
							label="Market Close"
							value={includes.market}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									market: !ps.market,
								}))
							}
						/>
						<Checkbox
							label="Air Conditioning"
							value={includes.ac}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									ac: !ps.ac,
								}))
							}
						/>
						<Checkbox
							label="Transportation"
							value={includes.transportation}
							onChange={() =>
								setIncludes((ps) => ({
									...ps,
									transportation: !ps.transportation,
								}))
							}
						/>
					</div>
					<div className={styles.post}>
						<button>Post Property</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Add;
