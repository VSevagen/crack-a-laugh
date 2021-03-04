import React, {useState} from 'react';
import axios from 'axios';
import Form from "./Form";

function Leaderboard(props) {
    const [users, setUsers] = useState([])
    const fetchEntries = () => {
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `query { allEntries { name, wins, loses } }`);
        axios.get(url.toString())
            .then(({data}) => setUsers(data.data.allEntries))
    }
    fetchEntries()
    return (
        // return a leaderboard using the html table tag
        // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
        // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
        <div>
           <Form onUpdate={fetchEntries} hasWon={props.hasWon}/>

            <table className={'table'}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Loses</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.wins}</td>
                    <td>{user.loses}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {users.length === 0 ?
                <div>
                   No entries found. Enter your name.
                </div>
            : null}
        </div>
    );
}

export default Leaderboard;