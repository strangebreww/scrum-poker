import styles from "./css/App.module.css";

type CardProps = {
	value: number;
	handleClick: (value: string) => void;
};

function Card(props: CardProps) {
	const onCardClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target instanceof HTMLDivElement) {
			props.handleClick(event.target.textContent || "");
		}
	};

	return (
		<div className={styles.card} onClick={onCardClick}>
			{props.value}
		</div>
	);
}

export default Card;
