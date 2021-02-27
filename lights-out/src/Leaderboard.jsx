import React, { useState, useEffect } from 'react';
import "./Leaderboard.css";

function Leaderboard(){

    const [data, setData] = useState([]); 

    useEffect(() => {    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            
            body: '{"query": "{scores{name, wins,loses}}"}'
        };
    
         fetch('http://127.0.0.1:8000/graphql/', requestOptions)
            .then(response => response.json())
            .then(data => setData(data['data']['scores']));
    
    }, []);
    
    let table = new Array(data.length);

    for (let row = 0; row < table.length; row++) {
        let cell_row = [];
        cell_row.push(<td>{data[row]['name']}</td>);
        cell_row.push(<td>{data[row]['wins']}</td>);
        cell_row.push(<td>{data[row]['loses']}</td>);
        table[row] = <tr>{cell_row}</tr>;
    }
    return(
        
        // return a leaderboard using the html table tag
        // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
        // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
        <React.Fragment>
        
            
            <h3>Your score</h3>
            <table class="table_score">
                <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                </tr>
                {table}
            </table>
        </React.Fragment>
        

    );

}

export default Leaderboard;