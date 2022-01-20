import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../Components/Navbar/Navbar";
import styles from "../styles/Homepage.module.scss";
import Icon from "../assets/icons/Search.svg";
import Star from "../assets/icons/Star.svg";
import Image from "next/image";
import CairoJpg from "../assets/Images/cairo.jpg";
import Chalet from "../assets/Images/chalet1.jpg";

const Area = ({ image, name }: { name: string; image: StaticImageData }) => {
	return (
		<div className={styles.area}>
			<div className={styles.image}>
				<Image className={styles.Img} src={image} />
			</div>
			<div className={styles.name}>{name}</div>
			<div>526 Properties</div>
		</div>
	);
};

const Property = ({
	image,
	location,
	price,
	rating,
}: {
	location: string;
	rating: number;
	price: number;
	image: StaticImageData;
}) => {
	return (
		<div className={styles.property}>
			<div className={styles.image}>
				<Image className={styles.Img} src={image} />
			</div>
			<div className={styles.name}>{location}</div>
			<div className={styles.rating}>
				<Image src={Star} />
				<Image src={Star} />
				<Image src={Star} />
				<Image src={Star} />
				<Image src={Star} />
			</div>
			<div className={styles.price}>{price}£/night</div>
		</div>
	);
};

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
			<div className={styles.areas}>
				<div className={styles.label}>
					<h3>Popular Areas</h3>
					<div>View All</div>
				</div>
				<div className={styles.verticalScroll}>
					<Area image={CairoJpg} name="Cairo" />
					<Area image={CairoJpg} name="Cairo" />
					<Area image={CairoJpg} name="Cairo" />
					<Area image={CairoJpg} name="Cairo" />
				</div>
			</div>
			<div className={styles.areas}>
				<div className={styles.label}>
					<h3>Suggested Stays</h3>
					<div>View All</div>
				</div>
				<div className={styles.verticalScroll}>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={5}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={5}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={5}
					/>
					<Property
						image={Chalet}
						location="Cairo"
						price={200}
						rating={5}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
