import { useState } from "react";
import CardSelector from "./CardSelector";
import Players from "./Players";

function Poker() {
	const [state, setState] = useState([]);

	const onCardClick = (value) => {
		setState((s) => {
			return [value].concat(s.slice(1));
		});
	};

	return (
		<>
			<CardSelector handleClick={onCardClick} />
			<Players players={state} />
		</>
	);
}

export default Poker;
