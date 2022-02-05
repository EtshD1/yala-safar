import Property from "../../Components/Areas/Property";
import styles from "../../styles/MyProps.module.scss";
import Link from "next/link";
import chalet1 from "../../assets/Images/chalet1.jpg";
import {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const MyProperties = () => {
	const db = getFirestore();
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);
	const [ids, setIds] = useState<Array<string>>([]);

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, "properties"),
				where("owner", "==", user.uid)
			);
			getDocs(q).then((docs) => {
				docs.forEach((d) => {
					const id = d.id;
					setIds((ps) => {
						if (ps.includes(id)) {
							return ps;
						} else {
							return [...ps, id];
						}
					});
				});
			});
		}
	}, [db, user]);
	if (user) {
		return (
			<div>
				<div className={styles.container}>
					<div className={styles.heading}>
						<h1>Your Properties</h1>
						<Link href="/my-properties/add">
							<div className={styles.addProp}>Add Property</div>
						</Link>
					</div>
					<div className={styles.properties}>
						{ids.map((i) => (
							<Property id={i} key={i} />
						))}
					</div>

					{/* <div className={styles.properties}>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
						<Property
							image={chalet1}
							price={199}
							location="Cairo"
							rating={5}
						/>
					</div> */}
				</div>
			</div>
		);
	}

	return <></>;
};

export default MyProperties;
