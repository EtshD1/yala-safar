import Image from "next/image";
import styles from "./styles.module.scss";

const Area = ({ image, name }: { name: string; image: StaticImageData }) => {
	return (
		<div className={styles.area}>
			<div className={styles.image}>
				<Image className={styles.Img} src={image} />
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{name}</div>
				<div>526 Properties</div>
			</div>
		</div>
	);
};

export default Area;