import React from 'react'
import './Form.css'

function Form() {
    return (
        // have a form with only one input of type text
        <form className='form'>
            <div><h className='name'>Name</h></div>
            <div><input  className='inputField'type="text" name="name" /></div>
            <div><input className='submit' type="submit" value="Submit" /></div>      
        </form>
        // and update djangodb through a GraphQL mutation from here
    );
}

export default Form;