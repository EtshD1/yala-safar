import Property from "../Components/Areas/Property";
import Navbar from "../Components/Navbar";
import styles from "../styles/MyProps.module.scss";
import chalet1 from "../assets/Images/chalet1.jpg";

const MyProperties = () => {
	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.heading}>
					<h1>Your Properties</h1>
					<div className={styles.addProp}>Add Property</div>
				</div>
				<div className={styles.properties}>
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
				</div>
			</div>
		</div>
	);
};

export default MyProperties;
