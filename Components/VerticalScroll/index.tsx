import styles from "./styles.module.scss";
import type { NextPage } from "next";

const VerticalScroll: NextPage = ({ children }) => {
	return <div className={styles.verticalScroll}>{children}</div>;
};

export default VerticalScroll;
