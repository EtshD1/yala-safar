import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../Components/Navbar/Navbar";
import styles from "../styles/Homepage.module.scss";
import Icon from "../assets/icons/Search.svg";
import Image from "next/image";

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
			<Navbar />
			<div className={styles.search}>
				<div>
					<h3>Search</h3>
					<p>Search by location, property or address.</p>
					<div className={styles.inputField}>
						<label>
							<div>
								<Image src={Icon} />
							</div>
							<input
								type="text"
								placeholder="Search for Property"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
