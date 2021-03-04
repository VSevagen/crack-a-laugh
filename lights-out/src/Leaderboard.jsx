import React from 'react';
import {useState,useEffect} from 'react';
import './Leaderboard.css'
function Leaderboard() {
    const [data, setData] = useState([]); 

    useEffect(() => {
        const sendingPost = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: '{"query": "{allPersons{name, wins,loses}}"}'
        };

         fetch('http://127.0.0.1:8000/graphql/', sendingPost)
            .then(response => response.json())
            .then(data => setData(data.data.allPersons));
    },[])

    let leaderboard = []
    for (let row = 0; row < data.length; row++) {
        leaderboard[row] = <tr className='eachPerson'>{[
            <td>{data[row]['name']}</td>,
            <td>{data[row]['wins']}</td>,
            <td>{data[row]['loses']}</td>]}</tr>;
    }

    return(
        // return a leaderboard using the html table tag
        // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
        // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
        <div>
            <h3 className='heading'>Leader Board</h3>
            <table class="leaderBoard">
                <tr className='tablehead'>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                </tr>
                {leaderboard}
            </table>
        </div>
    );
}

export default Leaderboard;