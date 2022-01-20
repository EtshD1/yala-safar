import type { AppProps } from "next/app";
import "../styles/reset.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div id="App">
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
