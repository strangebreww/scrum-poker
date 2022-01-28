import { useState } from "react";
import "./App.css";
import CardSelector from './CardSelector';
import Players from './Players';

function App() {
    const [state, setState] = useState([]);

    const onCardClick = (value) => {
        setState(s => {
            return [value].concat(s.slice(1));
        })
    }

    return (
        <main className="App">
            <CardSelector handleClick={onCardClick} />
            <Players players={state} />
        </main>
    );
}

export default App;
