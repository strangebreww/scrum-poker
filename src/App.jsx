import { useEffect, useState } from "react";
import "./App.css";
import Poker from "./Poker";

function App() {
	const [client, setClient] = useState();

	const send = () => {
		client.send(
			JSON.stringify({ name: "test-name", message: "test-message" })
		);
	};

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8000");

		ws.onmessage = (message) => {
			try {
				const messages = JSON.parse(message.data);

				console.log("received", messages);
			} catch (e) {
				console.error(e.message);
			}
		};

		setClient(ws);
	}, []);

	return (
		<>
			<header>
				<h1>Scrum Poker</h1>
			</header>
			<button onClick={send} style={{ width: 100 }}>
				Test ws connection
			</button>
			<main className="App">
				<Poker />
			</main>
			<footer>Made with ❤️ using React</footer>
		</>
	);
}

export default App;
