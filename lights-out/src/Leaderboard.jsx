import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Leaderboard(props) {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `query { allEntries { name, wins, loses } }`);
        axios.get(url)
            .then(({data}) => setEntries(data.data.allEntries))
    }, [])

    return (
        // return a leaderboard using the html table tag
        // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
        // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
        <div>
            <h1>
                YOU <span className={'message'}>{props.hasWon ? 'WON' : 'LOST'}</span>!
            </h1>

            <table className={'table'}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Loses</th>
            </tr>
            </thead>

            <tbody>
            {entries.map((entry, index) => (
                <tr key={index}>
                    <td><strong>{entry.name}</strong></td>
                    <td>{entry.wins}</td>
                    <td>{entry.loses}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default Leaderboard;