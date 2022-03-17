import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

export const ServerContext = createContext();

export function ServerContextProvider({ children }) {
	const [wsClient, setWsClient] = useState();
	const [players, setPlayers] = useState(new Map());

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8000");

		ws.onmessage = (message) => {
			try {
				const messages = JSON.parse(message.data);

				const joinedPlayers = messages.reduce((prev, cur) => {
					if (cur.name === "new client") {
						prev.push({
							id: cur.message.id,
							estimate: cur.message.estimate,
						});
					}

					return prev;
				}, []);

				const quitPlayers = messages.reduce((prev, cur) => {
					if (cur.name === "closed client") {
						prev.push(cur.message.id);
					}

					return prev;
				}, []);

				setPlayers((p) => {
					const players = new Map(p);

					joinedPlayers.forEach((j) => {
						players.set(j.id, j.estimate);
					});

					quitPlayers.forEach((id) => {
						players.delete(id);
					});

					return players;
				});

				console.log("message received", messages);
			} catch (e) {
				console.error(e.message);
			}
		};

		setWsClient(ws);
	}, []);

	return (
		<ServerContext.Provider value={{ players, wsClient }}>
			{children}
		</ServerContext.Provider>
	);
}

ServerContextProvider.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
};

export function useServerContext() {
	return useContext(ServerContext);
}
