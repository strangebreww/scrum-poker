import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

export const ServerContext = createContext();

export function ServerContextProvider({ children }) {
	const [wsClient, setWsClient] = useState();
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8000");

		ws.onmessage = (message) => {
			try {
				const messages = JSON.parse(message.data);

				const joinedPlayers = messages.reduce((prev, cur) => {
					if (cur.name === "new client") {
						prev.push(cur.message);
					}

					return prev;
				}, []);

				const quitPlayers = messages.reduce((prev, cur) => {
					if (cur.name === "closed client") {
						prev.push(cur.message);
					}

					return prev;
				}, []);

				setPlayers((p) =>
					p
						.concat(joinedPlayers)
						.filter((p) => !quitPlayers.includes(p))
				);

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
	children: PropTypes.element,
};

export function useServerContext() {
	return useContext(ServerContext);
}
