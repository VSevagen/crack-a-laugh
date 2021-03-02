import React from 'react'

function Form(props) {
    return (
        // have a form with only one input of type text
        <form>
            <label>
                Name:
                <input  type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        // and update djangodb through a GraphQL mutation from here
    );
}

export default Form;