import PropTypes from "prop-types";

function Player(props) {
	const yourEstimate = Array.isArray(props.players) ? props.players[0] : "";

	return (
		<>
			<h2>Players</h2>
			<section className="players">
				<section className="player">
					<p className="you">You</p>
					<div className="card">{yourEstimate}</div>
				</section>
			</section>
		</>
	);
}

Player.propTypes = {
	players: PropTypes.array,
};

export default Player;
