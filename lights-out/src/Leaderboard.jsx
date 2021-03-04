import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import * as Constants from "./constants";
import axios from "axios";

function Leaderboard(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //call graphql
      const queryResult = await axios.post(Constants.GRAPHQL_API, {
        query: Constants.GET_USERS_QUERY,
      });
      //Update the state with the fetched data

      const result = queryResult.data.data.users;
      setData(result);
      
    };
    fetchData();
  });

  return (
    // return a leaderboard using the html table tag
    // data should NOT be hardcoded, should be fetch using graphql from localhost:8000/graphql/
    // The styling is not a priority. You can refer to SecondStage.png but not necessary to be similar
    <div>
      <div className="leaderTitle">
        <span className="neon-orange">SCORES</span>
      </div>
      <div>
        <table className="leaderboardtable">
          <thead>
            <tr>
              <th className="leaderboardDesign">NAME</th>
              <th className="leaderboardDesign">WINS</th>
              <th className="leaderboardDesign">LOSES</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="leaderboardDesign">{item.name}</td>
                <td className="leaderboardDesign">{item.wins}</td>
                <td className="leaderboardDesign">{item.loses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
