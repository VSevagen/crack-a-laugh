import React, { useState } from "react";
import "./Form.css";
import * as Constants from "./constants";
import axios from "axios";

function Form(props) {
  const [name, setName] = useState("");

  const addName = async () => {
    const queryString = 'mutation {createUsers(Userwons: 0, Username: "' + name + '", Userloses: 1) {users {name, wins, loses}}}';
    console.log(queryString)
    await axios.post(Constants.GRAPHQL_API, {
      query: queryString,
    });
  };

  return (
    // have a form with only one input of type text
    // and update djangodb through a GraphQL mutation from here
    <div>
      <div className="formTitle">
        <span className="neon-blue">ENTER YOUR NAME</span>
      </div>
      <input
        className="inputField"
        type="text"
        placeholder="NAME"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <button type="submit" onClick={addName} className="submitButton">
        SUBMIT
      </button>
    </div>
  );
}

export default Form;
