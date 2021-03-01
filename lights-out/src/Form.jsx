import React, {useState} from 'react'
import axios from "axios";

function Form(props) {
    const [name, setName] = useState('');

    const formUpdate = event => {
        event.preventDefault();
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `mutation { createOrUpdateEntry (name: "${name}", win: ${Number(props.hasWon)}, lose: ${Number(!props.hasWon)}) { name } }`);
        axios.post(url.toString()).then(props.formUpdate)
    }

    return (
        <form className={'form'}>
            <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder={'Enter your name'}/>
            <button type={'submit'} onClick={formUpdate}>Submit</button>
        </form>
    );
}

export default Form;