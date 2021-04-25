import React, {useState} from "react";
import Board from "./Board";
import "./App.css";
import Leaderboard from "./Leaderboard";

/** Simple app that just shows the LightsOut game. */

// Also you might wanna encapsulate <App /> with ApolloProvider to allow for any query anywhere in this application
// uri should be localhost in this case

const App = () => {
    const [over, setOver] = useState(false)
    const [won, setWon] = useState(false)

    const reset = () => {
        setWon(false);
        setOver(false);
    }

    return (
        <div className="App">
            {!over ? <Board nrows={4} ncols={9} setOver={setOver} setWon={setWon}/>
            : <Leaderboard hasWon={won} /> }

            {over ? <div className="reset">
                <button onClick={reset}>Play again</button>
            </div> : null}
        </div>
    );
}

export default App;
