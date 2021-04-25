import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from "./Form";

function Leaderboard(props) {
    const [entries, setEntries] = useState([])
    const [form, setForm] = useState(true)

    const fetchEntries = () => {
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `query { allEntries { name, wins, loses } }`);
        axios.get(url.toString())
            .then(({data}) => setEntries(data.data.allEntries))
    }

    useEffect(fetchEntries, [])

    const formUpdate = () => {
        setForm(false);
        fetchEntries();
    }

    return (
        // return a leaderboard using the html table tag
        // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
        // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
        <div>
            <h1>
                YOU <span className={'message'}>{props.hasWon ? 'WON' : 'LOST'}</span>!
            </h1>

            {form ? <Form formUpdate={formUpdate} hasWon={props.hasWon}/> : ''}

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

            {entries.length === 0 ?
                <tr>
                    <td colSpan={3}>You are the first here! Enter your name to be a part of the history.</td>
                </tr>
            : null}
            </tbody>
        </table>
        </div>
    );
}

export default Leaderboard;