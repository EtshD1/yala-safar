import Head from "next/head";
import VerticalScroll from "../../Components/VerticalScroll";
import styles from "../../styles/AreasPage.module.scss";
import Property from "../../Components/Areas/Property";
import chalet1 from "../../assets/Images/chalet1.jpg";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

const Properties = () => {
	const db = getFirestore();
	const [ids, setIds] = useState<Array<string>>([]);

	useEffect(() => {
		const q = query(collection(db, "properties"));
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
	}, [db]);

	return (
		<div>
			<Head>
				<title>Yala Safar - Properties</title>
			</Head>
			<div className={styles.container}>
				<div>
					<h1>Explore Egypt</h1>
				</div>
				<VerticalScroll>
					{ids.map((i) => (
						<Property id={i} key={i} view />
					))}
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Properties;
