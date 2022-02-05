import { Provider } from "react-redux";
import { createStore } from "redux";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config";
import states from "../redux/reducers";
import "../styles/index.css";
import "../styles/reset.css";
import Authentication from "../Components/Authentication";
import Navbar from "../Components/Navbar";

const store = createStore(states);
initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<div id="App">
				<Navbar />
				<Component {...pageProps} />
			</div>
			<Authentication />
		</Provider>
	);
}

export default MyApp;
