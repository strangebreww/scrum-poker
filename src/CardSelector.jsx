import Card from "./Card";

function CardSelector(props) {
	const cards = [1, 2, 3, 5, 8, 13, 20];

	return (
		<>
			<h2>Choose a card</h2>
			<section className="card-selector">
				{cards.map((c, i) => (
					<Card key={i} value={c} handleClick={props.handleClick} />
				))}
			</section>
		</>
	);
}

export default CardSelector;
