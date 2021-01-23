import React from 'react';
import axios from 'axios';

class JokeList extends React.Component {

    // Define props to be used in case not mention on component usage
    static defaultProps = {
        numJokesToGet: 10
    };


    constructor(props) {
        super(props);
        this.state = {jokes: []}
    }

    async componentDidMount() {
        let jokes = [];
        while(jokes.lenght < this.props.numJokesToGet) {
            // fetch the jokes from the follwing url "https://icanhazdadjoke.com/"
            // Push them to jokes[]
        }

        // Update jokes in states with new jokes
    }

    render() {
        return(
            <div className="JokeList">
            <h1>Mad Jokes !</h1>
            {/* Here you'll have to iterate through the jokes array and display each joke. */}
            </div>
        );
    }
}

export default JokeList;