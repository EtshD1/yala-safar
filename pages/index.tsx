import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Homepage.module.scss";
import Icon from "../assets/icons/Search.svg";
// import Image from "next/image";
import CairoJpg from "../assets/Images/cairo.jpg";
import Alex from "../assets/Images/alexandria.jpg";
import NorthCoast from "../assets/Images/northcoast.jpg";
import Giza from "../assets/Images/pyramids.jpg";
import Chalet from "../assets/Images/chalet1.jpg";
import VerticalScroll from "../Components/VerticalScroll";
import Property from "../Components/Areas/Property";
import Area from "../Components/Areas/Area";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

const Home: NextPage = () => {
	const db = getFirestore();
	const [ids, setIds] = useState<Array<string>>([]);
	const [locations, setLocations] = useState<Array<string>>([]);

	useEffect(() => {
		const q = query(collection(db, "properties"));
		getDocs(q).then((docs) => {
			setLocations([]);
			docs.forEach((d) => {
				const id = d.id;
				const loc = d.data().city;
				setIds((ps) => {
					if (ps.includes(id)) {
						return ps;
					} else {
						return [...ps, id];
					}
				});
				setLocations((ps) => {
					return [...ps, loc];
				});
			});
		});
	}, [db]);

	return (
		<div>
			<Head>
				<title>Yala Safar</title>
				<meta
					name="description"
					content="Yala Safar allows you to easily find a location for your vaction."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.search}>
				{/* <div>
					<h3>Search</h3>
					<p>Search by location, property or address.</p>
					<div className={styles.inputField}>
						<label>
							<div>
								<img src={Icon.src} />
							</div>
							<input
								type="text"
								placeholder="Search for Property"
							/>
						</label>
					</div>
				</div> */}
			</div>
			<div className={styles.areas}>
				<div className={styles.label}>
					<h3>Popular Areas</h3>
					<div>
						<Link href="/areas">View All</Link>
					</div>
				</div>
				<VerticalScroll>
					<Area
						image={NorthCoast}
						name="North Coast"
						count={
							locations.filter((v) => v === "North Coast").length
						}
					/>
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
						image={Giza}
						name="Giza"
						count={locations.filter((v) => v === "Giza").length}
					/>
				</VerticalScroll>
			</div>
			<div className={styles.areas}>
				<div className={styles.label}>
					<h3>Suggested Stays</h3>
					<div>
						<Link href="/properties">View All</Link>
					</div>
				</div>
				<VerticalScroll>
					{ids.slice(0, 4).map((i) => (
						<Property id={i} key={i} view />
					))}
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Home;
