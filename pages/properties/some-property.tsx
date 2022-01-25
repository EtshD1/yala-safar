import Navbar from "../../Components/Navbar";
import styles from "../../styles/Property.module.scss";
import Image from "next/image";
import chalet1 from "../../assets/Images/chalet1.jpg";
import Back from "../../assets/icons/Back.svg";
import Star from "../../assets/icons/Star.svg";
import Location from "../../assets/icons/Location.svg";

const Property = () => {
	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.preview}>
					<Image src={chalet1} className={styles.bg} />
					<div className={styles.info}>
						<div className={styles.back}>
							<div>
								<Image src={Back} />
							</div>
						</div>
						<div>
							<div className={styles.name}>The Night Inn</div>
							<div>500 E£/night</div>
						</div>
					</div>
				</div>
				<div className={styles.info}>
					<div className={styles.rating_location}>
						<div>
							<div className={styles.icon}>
								<Image src={Location} />
							</div>
							<div>
								<div className={styles.heading}>
									North Coast
								</div>
								<div>
									<div>City Name</div>
									<div>1234 Street Name</div>
								</div>
							</div>
						</div>
						<div>
							<div className={styles.icon}>
								<Image src={Star} />
							</div>
							<div>
								<div className={styles.heading}>4.9</div>
								<div>Rating</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.offers}>
					<div>What this place offers</div>
					<div className={styles.perks}>
						<div>Wifi</div>
						<div>Park</div>
						<div>Pool</div>
						<div>Beach</div>
					</div>
				</div>
				<div className={styles.cta}>
					<div>Contact Owner</div>
					<div className={styles.book}>Book Now</div>
				</div>
			</div>
		</div>
	);
};

export default Property;
