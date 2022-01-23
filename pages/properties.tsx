import Head from "next/head";
import Navbar from "../Components/Navbar";
import VerticalScroll from "../Components/VerticalScroll";
import styles from "../styles/AreasPage.module.scss";
import Property from "../Components/Areas/Property";
import chalet1 from "../assets/Images/chalet1.jpg";

const Properties = () => {
	return (
		<div>
			<Head>
				<title>Yala Safar - Properties</title>
			</Head>
			<Navbar />
			<div className={styles.container}>
				<VerticalScroll>
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
				</VerticalScroll>
			</div>
		</div>
	);
};

export default Properties;
