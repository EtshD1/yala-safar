import Image from "next/image";
import Star from "../../assets/icons/Star.svg";
import styles from "./styles.module.scss";

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
			<div className={styles.info}>
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
		</div>
	);
};

export default Property;
