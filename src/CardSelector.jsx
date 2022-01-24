import Card from './Card';

function CardSelector() {
    const cards = [1, 2, 3, 5, 8, 13, 20];

    return (
        <>
            <h2>Choose a card</h2>
            <section className="card-selector">
                {cards.map((c) => (
                    <Card value={c} />
                ))}
            </section>
        </>
    );
}

export default CardSelector;
