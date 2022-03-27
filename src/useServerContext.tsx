import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { port } from "./config";

type Players = Map<string, string | null>;
type WsClient = WebSocket | undefined;

type ServerContextType = {
	players: Players;
	wsClient: WsClient;
};

type ProviderProps = {
	children: React.ReactNode;
};

type RecentPlayers = {
	active?: {
		id: string;
		estimate: string;
	};
	quit?: string;
};

export const ServerContext = createContext<ServerContextType>({
	players: new Map(),
	wsClient: undefined,
});

export function ServerContextProvider({ children }: ProviderProps) {
	const [wsClient, setWsClient] = useState<WebSocket>();
	const [players, setPlayers] = useState<Players>(new Map());

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
					const recentPlayers: RecentPlayers = {};

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
				if (e instanceof Error) {
					console.error(e.message);
				}
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
