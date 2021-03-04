import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

// Also you might wanna encapsulate <App /> with ApolloProvider to allow for any query anywhere in this application
// uri should be localhost in this case

function App() {
    return (
      <div className="App">
        <Board />
      </div>
    );
}

export default App;
