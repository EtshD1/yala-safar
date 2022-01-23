import Head from "next/head";
import Area from "../Components/Areas/Area";
import Navbar from "../Components/Navbar";
import VerticalScroll from "../Components/VerticalScroll";
import cairo from "../assets/Images/cairo.jpg";
import giza from "../assets/Images/pyramids.jpg";
import alex from "../assets/Images/alexandria.jpg";
import northCoast from "../assets/Images/northcoast.jpg";
import hurghada from "../assets/Images/hurghada.jpg";
import styles from "../styles/AreasPage.module.scss";

const Areas = () => {
	return (
		<div>
			<Head>
				<title>Yala Safar - Areas</title>
			</Head>
			<Navbar />
			<div className={styles.container}>
				<VerticalScroll>
					<Area image={cairo} name="Cairo" />
					<Area image={alex} name="Alexandria" />
					<Area image={hurghada} name="Hurghada" />
					<Area image={northCoast} name="North Coast" />
					<Area image={giza} name="Giza" />
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Areas;
