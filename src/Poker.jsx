import { useState } from "react";
import CardSelector from "./CardSelector";
import Players from "./Players";
import { useServerContext } from "./useServerContext";

function Poker() {
	const [state, setState] = useState([]);

	const { wsClient } = useServerContext();

	const onCardClick = (value) => {
		setState((s) => {
			return [value].concat(s.slice(1));
		});
	};

	const send = () => {
		wsClient.send(
			JSON.stringify({ name: "test-name", message: "test-message" })
		);
	};

	return (
		<>
			<button onClick={send} style={{ width: 100 }}>
				Test ws connection
			</button>
			<CardSelector handleClick={onCardClick} />
			<Players players={state} />
		</>
	);
}

export default Poker;
