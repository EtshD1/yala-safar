import Head from "next/head";
import VerticalScroll from "../../Components/VerticalScroll";
import styles from "../../styles/AreasPage.module.scss";
import Property from "../../Components/Areas/Property";
import chalet1 from "../../assets/Images/chalet1.jpg";

const Properties = () => {
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
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
						image={chalet1}
						price={199}
						location="Cairo"
						rating={5}
					/>
					<Property
						view
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
