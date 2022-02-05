import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Homepage.module.scss";
import Icon from "../assets/icons/Search.svg";
// import Image from "next/image";
import CairoJpg from "../assets/Images/cairo.jpg";
import NorthCoast from "../assets/Images/northcoast.jpg";
import Chalet from "../assets/Images/chalet1.jpg";
import VerticalScroll from "../Components/VerticalScroll";
import Property from "../Components/Areas/Property";
import Area from "../Components/Areas/Area";
import Link from "next/link";

const Home: NextPage = () => {
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
				<div>
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
				</div>
			</div>
			<div className={styles.areas}>
				<div className={styles.label}>
					<h3>Popular Areas</h3>
					<div>
						<Link href="/areas">View All</Link>
					</div>
				</div>
				<VerticalScroll>
					<Area image={NorthCoast} name="North Coast" />
					<Area image={CairoJpg} name="Cairo" />
					<Area image={CairoJpg} name="Cairo" />
					<Area image={CairoJpg} name="Cairo" />
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
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={4}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={3}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={2}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={5}
					/>
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Home;
