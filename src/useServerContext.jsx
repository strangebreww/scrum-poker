import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { port } from "./config";

export const ServerContext = createContext();

export function ServerContextProvider({ children }) {
	const [wsClient, setWsClient] = useState();
	const [players, setPlayers] = useState(new Map());

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:" + port);

		ws.onmessage = (message) => {
			try {
				const messageData = JSON.parse(message.data);

				if (Array.isArray(messageData)) {
					const history = messageData.reduce((prev, cur) => {
						prev[cur.id] = cur.estimate;

						return prev;
					}, {});

					setPlayers((p) => {
						const players = new Map(p);

						for (const id in history) {
							players.set(id, history[id]);
						}

						return players;
					});
				} else {
					const recentPlayers = {};

					if (
						messageData.type === "new client" ||
						messageData.type === "active client"
					) {
						recentPlayers.active = {
							id: messageData.payload.id,
							estimate: messageData.payload.estimate,
						};
					}

					if (messageData.type === "closed client") {
						recentPlayers.quit = messageData.payload.id;
					}

					setPlayers((p) => {
						const players = new Map(p);

						const { active, quit } = recentPlayers;

						if (active) {
							players.set(active.id, active.estimate);
						}

						if (quit) {
							players.delete(quit);
						}

						return players;
					});
				}
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
