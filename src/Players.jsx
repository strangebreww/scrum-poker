import PropTypes from "prop-types";
import { useServerContext } from "./useServerContext";

function Player(props) {
	const { players } = useServerContext();

	const yourEstimate = Array.isArray(props.players) ? props.players[0] : "";

	return (
		<>
			<h2>Players</h2>
			<section className="players">
				<section className="player">
					<p className="you">You</p>
					<div className="card">{yourEstimate}</div>
				</section>
				{players.slice(1).map((id) => (
					<section key={id} className="player">
						<p>{id.substring(0, 8)}</p>
						<div className="card"></div>
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
