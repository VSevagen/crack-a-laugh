import React, {useState} from 'react'
import axios from "axios";
function Form(props) {
    const [user, setUser] = useState('');
    const [submit, setSubmit] = useState(false)
    const onUpdate = (evt)=> {
        evt.preventDefault();
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `mutation { createUser (name: "${user}", wins: ${Number(props.hasWon)}, loses: ${Number(!props.hasWon)}) { name } }`);
        axios.post(url.toString()).then(props.onUpdate)
        setSubmit(true)
    }

    if(submit){
        return(<div>User saved</div>)
    }else{
        return (
            <form>
            <input value={user} onChange={evt => setUser(evt.target.value)} placeholder={'Enter your name'}/>
            <button onClick={onUpdate}>Submit</button>
        </form>   
    );
    }
}

export default Form;