import { useState } from "react";
import styles from "../../styles/AddProperty.module.scss";
import AddImage from "../../assets/icons/AddImage.svg";
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";

const Field = ({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (s: string) => void;
}) => {
	return (
		<div className={styles.field}>
			<label>
				<div>{label}</div>
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
	const storage = getStorage(firebaseApp);
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [city, setCity] = useState("");
	const [price, setPrice] = useState("");
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

	return (
		<div className={styles.container}>
			<h1>Property Posting</h1>
			<div className={styles.form}>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className={styles.imgInput}>
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
					<Field label="Name" value={name} onChange={setName} />
					<Field
						label="Location"
						value={location}
						onChange={setLocation}
					/>
					<Field label="City" value={city} onChange={setCity} />
					<Field label="Price" value={price} onChange={setPrice} />
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
