import PropTypes from "prop-types";
import Card from "./Card";
import styles from "./css/App.module.css";

function CardSelector(props) {
	const cards = [1, 2, 3, 5, 8, 13, 20];

	return (
		<>
			<h2>Choose a card</h2>
			<section className={styles.cardSelector}>
				{cards.map((c, i) => (
					<Card key={i} value={c} handleClick={props.handleClick} />
				))}
			</section>
		</>
	);
}

CardSelector.propTypes = {
	handleClick: PropTypes.func,
};

export default CardSelector;
