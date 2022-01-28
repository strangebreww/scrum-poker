function Card(props) {
    const onCardClick = (event) => {
        props.handleClick(event.target.textContent);
    }

    return <div className="card" onClick={onCardClick}>{props.value}</div>;
}

export default Card;
