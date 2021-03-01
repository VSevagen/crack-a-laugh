import React, { useState, useEffect} from 'react';
import "./Form.css";

function Form(props) {
    const [userName, setUserName] = useState("");
    const [submitted, setSubmited] = useState(false);

    useEffect(() => {    
        // fetchData();    
    
    }, []);
    async function fetchData() {
        const exisitingUser = props.users.includes(userName);
        let query='';
        if (exisitingUser){
          let score = -1;  // -1 to increament loses and 1 to increament wins
          if (props.hasWon)
            score = 1;

          query = `{  "query": "mutation updateScore( $name: String!){updateScore(name:$name, input:${score}) { ok }} ", "operationName": "updateScore", "variables": { "name": "${userName}"} }`;    
          
        }
        else{
          let wins=0;
          let loses=1;
          if (props.hasWon){
            wins=1
            loses=0;
          }
          query = `{  "query": "mutation createScore( $name: String!){createScore(input:{name:$name wins:${wins} loses:${loses}}) { ok }} ", "operationName": "createScore", "variables": { "name": "${userName}"} }`;
        }

        console.log(query);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query
        };
         
         const response = await fetch('http://127.0.0.1:8000/graphql/', requestOptions);
         const data = await response.json();
         console.log(data);
         setSubmited(true);
         props.update();
      }

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
      }
    
    if (!submitted)
      return (
        
          <form onSubmit={handleSubmit}>
              
          <div className="input-field">
            <input
              placeholder="Your name"
              type="text"
              onChange={(e)=>setUserName(e.target.value)}
            />
            <button onSubmit={handleSubmit}>Submit</button>
          </div>
        </form>
          // have a form with only one input of type text
          // and update djangodb through a GraphQL mutation from here
      );
    return (<div></div>)
    
}

export default Form;