// import Image from "next/image";
import Star from "../../assets/icons/Star.svg";
import HollowStar from "../../assets/icons/hollowStar.svg";
import styles from "./styles.module.scss";
import Link from "next/link";

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
		stars.push(<img key={i} src={Star.src} />);
	}
	for (let i = rating; i < 5; i++) {
		stars.push(<img key={i} src={HollowStar.src} />);
	}
	return (
		<Link href="/properties/some-property">
			<div className={styles.property}>
				<div
					className={[styles.image, view ? styles.unset : ""].join(
						" "
					)}
				>
					<img className={styles.Img} src={image.src} />
				</div>
				<div className={styles.info}>
					<div className={styles.name}>{location}</div>
					<div className={styles.rating}>{stars}</div>
					<div className={styles.price}>{price}£/night</div>
				</div>
			</div>
		</Link>
	);
};

export default Property;
