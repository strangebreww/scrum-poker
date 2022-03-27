import styles from "./css/App.module.css";
import Poker from "./Poker";
import { ServerContextProvider } from "./useServerContext";

function App() {
	return (
		<ServerContextProvider>
			<header>
				<h1>Scrum Poker</h1>
			</header>
			<main className={styles.app}>
				<Poker />
			</main>
			<footer>Made with ❤️ using React</footer>
		</ServerContextProvider>
	);
}

export default App;
