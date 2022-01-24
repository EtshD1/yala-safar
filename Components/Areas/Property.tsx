import Image from "next/image";
import Star from "../../assets/icons/Star.svg";
import HollowStar from "../../assets/icons/hollowStar.svg";
import styles from "./styles.module.scss";

const Property = ({
	image,
	location,
	price,
	rating,
	view = false,
}: {
	location: string;
	rating: number;
	price: number;
	image: StaticImageData;
	view?: boolean;
}) => {
	const stars = [];
	for (let i = 0; i < rating; i++) {
		stars.push(<Image src={Star} />);
	}
	for (let i = rating; i < 5; i++) {
		stars.push(<Image src={HollowStar} />);
	}
	return (
		<div className={styles.property}>
			<div className={[styles.image, view ? styles.unset : ""].join(" ")}>
				<Image className={styles.Img} src={image} />
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{location}</div>
				<div className={styles.rating}>{stars}</div>
				<div className={styles.price}>{price}£/night</div>
			</div>
		</div>
	);
};

export default Property;
