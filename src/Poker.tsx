import { useMemo, useState } from "react";
import CardSelector from "./CardSelector";
import Players from "./Players";
import { useServerContext } from "./useServerContext";

function Poker() {
	const [state, setState] = useState<string[]>([]);

	const { wsClient, players } = useServerContext();

	const yourId = useMemo(() => {
		if (!players.size) {
			return;
		}

		return [...players][0][0];
	}, [players]);

	const onCardClick = (value: string) => {
		send(value);

		setState((s) => {
			return [value].concat(s.slice(1));
		});
	};

	const send = (estimate: string) => {
		if (wsClient) {
			wsClient.send(JSON.stringify({ id: yourId, estimate }));
		}
	};

	return (
		<>
			<CardSelector handleClick={onCardClick} />
			<Players players={state} />
		</>
	);
}

export default Poker;
