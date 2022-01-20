import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../Components/Navbar/Navbar";
import styles from "../styles/Homepage.module.scss";

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
		</div>
	);
};

export default Home;
