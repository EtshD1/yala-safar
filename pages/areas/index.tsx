import Head from "next/head";
import Area from "../../Components/Areas/Area";
import VerticalScroll from "../../Components/VerticalScroll";
import CairoJpg from "../../assets/Images/cairo.jpg";
import Alex from "../../assets/Images/alexandria.jpg";
import NorthCoast from "../../assets/Images/northcoast.jpg";
import Hurghada from "../../assets/Images/hurghada.jpg";
import Giza from "../../assets/Images/pyramids.jpg";
import Luxor from "../../assets/Images/luxor.png";
import Sharm from "../../assets/Images/SharmElSheikh.jpg";
import PortSaid from "../../assets/Images/Port-Said.jpg";
import styles from "../../styles/AreasPage.module.scss";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

const Areas = () => {
	const db = getFirestore();
	const [locations, setLocations] = useState<Array<string>>([]);

	useEffect(() => {
		const q = query(collection(db, "properties"));
		getDocs(q).then((docs) => {
			setLocations([]);
			docs.forEach((d) => {
				const loc = d.data().city;
				setLocations((ps) => {
					return [...ps, loc];
				});
			});
		});
	}, [db]);
	return (
		<div>
			<Head>
				<title>Yala Safar - Areas</title>
			</Head>
			<div className={styles.container}>
				<div>
					<h1>Explore Egypt</h1>
				</div>
				<VerticalScroll>
					<Area
						image={CairoJpg}
						name="Cairo"
						count={locations.filter((v) => v === "Cairo").length}
					/>
					<Area
						image={Alex}
						name="Alexandria"
						count={
							locations.filter((v) => v === "Alexandria").length
						}
					/>
					<Area
						image={Luxor}
						name="Luxor"
						count={locations.filter((v) => v === "Luxor").length}
					/>
					<Area
						image={Giza}
						name="Giza"
						count={locations.filter((v) => v === "Giza").length}
					/>
					<Area
						image={Hurghada}
						name="Hurghada"
						count={locations.filter((v) => v === "Hurghada").length}
					/>
					<Area
						image={NorthCoast}
						name="North Coast"
						count={
							locations.filter((v) => v === "North Coast").length
						}
					/>
					<Area
						image={Sharm}
						name="Sharm El-Sheikh"
						count={
							locations.filter((v) => v === "Sharm El-Sheikh")
								.length
						}
					/>
					<Area
						image={PortSaid}
						name="Port Said"
						count={
							locations.filter((v) => v === "Port Said").length
						}
					/>
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Areas;
