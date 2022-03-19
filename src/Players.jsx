import PropTypes from "prop-types";
import styles from "./css/App.module.css";
import { useServerContext } from "./useServerContext";

function Player(props) {
	const { players } = useServerContext();

	const yourEstimate = Array.isArray(props.players) ? props.players[0] : "";
	const otherPlayers = [...players].slice(1);

	return (
		<>
			<h2>Players</h2>
			<section className={styles.players}>
				<section className={styles.player}>
					<p className={styles.you}>You</p>
					<div className={styles.card}>{yourEstimate}</div>
				</section>
				{otherPlayers.map(([id, estimate]) => (
					<section key={id} className={styles.player}>
						<p>{id.substring(0, 8)}</p>
						<div className={styles.card}>{estimate}</div>
					</section>
				))}
			</section>
		</>
	);
}

Player.propTypes = {
	players: PropTypes.array,
};

export default Player;
