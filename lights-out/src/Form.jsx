// import React from 'react'

// function Form(props) {
//     return (
//         // have a form with only one input of type text
//         // and update djangodb through a GraphQL mutation from here
//     );
// }

// export default Form;
import React, {useState} from 'react'
import axios from "axios";
import "./Form.css";

function Form(props) {
    const [name, setName] = useState('');
    const formUpdate = event => {
        const url = new URL("http://localhost:8000/graphql/");
        url.searchParams.append("query", `mutation { makemut (name: "${name.toLowerCase()}", win: ${Number(true ? props.hasWon===true: false)}, lose: ${Number(false ? props.hasWon===false: true)}) { Name } }`);
        axios.post(url.toString()).then(formUpdate)
        console.log(!props.hasWon)
    }
    return (
        <form className={'form'}>
            <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder={'Name:'}/>
            <button type={'submit'} onClick={formUpdate}>Submit</button>
        </form>
    );
}

export default Form;