import PropTypes from "prop-types";

function Card(props) {
	const onCardClick = (event) => {
		props.handleClick(event.target.textContent);
	};

	return (
		<div className="card" onClick={onCardClick}>
			{props.value}
		</div>
	);
}

Card.propTypes = {
	handleClick: PropTypes.func,
	value: PropTypes.number,
};

export default Card;
