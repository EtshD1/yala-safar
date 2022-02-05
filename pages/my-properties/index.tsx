import Property from "../../Components/Areas/Property";
import styles from "../../styles/MyProps.module.scss";
import Link from "next/link";
import chalet1 from "../../assets/Images/chalet1.jpg";

const MyProperties = () => {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.heading}>
					<h1>Your Properties</h1>
					<Link href="/my-properties/add">
						<div className={styles.addProp}>Add Property</div>
					</Link>
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
