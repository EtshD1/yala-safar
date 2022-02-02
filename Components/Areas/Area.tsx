// import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Area = ({
	image,
	name,
	view,
}: {
	view?: boolean;
	name: string;
	image: StaticImageData;
}) => {
	return (
		<Link href="/properties">
			<div className={styles.area}>
				<div
					className={[styles.image, view ? styles.unset : ""].join(
						" "
					)}
				>
					<img className={styles.Img} src={image.src} />
				</div>
				<div className={styles.info}>
					<div className={styles.name}>{name}</div>
					<div>526 Properties</div>
				</div>
			</div>
		</Link>
	);
};

export default Area;
