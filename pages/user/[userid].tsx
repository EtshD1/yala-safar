import { getApp } from "firebase/app";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import phoneIcon from "../../assets/icons/feather-phone.svg";
import emailIcon from "../../assets/icons/simple-email.svg";
import Property from "../../Components/Areas/Property";
import Loader from "../../Components/Loader";
import styles from "../../styles/userPage.module.scss";

const User = () => {
	const firebaseApp = getApp();
	const db = getFirestore(firebaseApp);
	const router = useRouter();
	const [user, setUser] = useState<{
		name: string;
		phone: string;
		email: string;
	}>({
		name: "",
		phone: "",
		email: "",
	});
	const [props, setProps] = useState<Array<string>>([]);
	const [loading, setLoading] = useState(true);
	const [found, setFound] = useState(true);

	useEffect(() => {
		if (router.query.userid) {
			getDoc(doc(db, "users", router.query.userid.toString())).then(
				(doc) => {
					if (doc.exists()) {
						const data = doc.data();
						setUser((ps) => ({
							...ps,
							name: `${data.fName} ${data.lName}`,
							email: data.email,
							phone: data.phone,
						}));
						const q = query(
							collection(db, "properties"),
							where("owner", "==", router.query.userid)
						);
						setLoading(false);
						getDocs(q).then((docs) => {
							setProps([]);
							docs.forEach((d) => {
								const id = d.id;
								setProps((ps) => {
									if (ps.includes(id)) {
										return ps;
									} else {
										return [...ps, id];
									}
								});
							});
						});
					} else {
						setLoading(false);
						setFound(false);
					}
				}
			);
		}
	}, [router, db, setUser]);

	if (loading) {
		return (
			<div className={styles.waiting}>
				<div>
					<Loader />
					<div>Please Wait</div>
				</div>
			</div>
		);
	}

	if (!found) {
		return (
			<div className={styles.waiting}>
				<div>
					<div>404</div>
					<div>Property not found</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h1>{user.name}</h1>
			<div className={styles.contact}>
				<div>
					<img src={phoneIcon.src} alt="" />
				</div>
				<div>{user.phone}</div>
			</div>
			<div className={styles.contact}>
				<div>
					<img src={emailIcon.src} alt="" />
				</div>
				<div>{user.email}</div>
			</div>
			<div className={styles.properties}>
				{props.map((p) => (
					<Property id={p} key={p} />
				))}
			</div>
		</div>
	);
};

export default User;
