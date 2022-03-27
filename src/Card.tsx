import PropTypes from "prop-types";
import styles from "./css/App.module.css";

function Card(props) {
	const onCardClick = (event) => {
		props.handleClick(event.target.textContent);
	};

	return (
		<div className={styles.card} onClick={onCardClick}>
			{props.value}
		</div>
	);
}

Card.propTypes = {
	handleClick: PropTypes.func,
	value: PropTypes.number,
};

export default Card;
