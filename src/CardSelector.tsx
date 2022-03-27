import styles from "./App.module.css";
import Card from "./Card";

type CardSelectorProps = {
	handleClick: (value: string) => void;
};

function CardSelector(props: CardSelectorProps) {
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

export default CardSelector;
