import React, {setState} from "react";
import Leaderboard from "./Leaderboard";
import Cell from "./Cell";
import Won from "./Won";
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends React.Component {

  // TODO: set initial state
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),  // Creating Initial Board
      hasWon: false,   
      triesLeft : 20     // Tries user has left
    };

    this.flipCellsAround = this.flipCellsAround.bind(this);  // Binding flipCellsAround method so it will have access to 'this'
  }

  /* isAllCellOff function will return true if all the values of the board array is false, otherwise false */

  isAllCellOff(board){

    for (let row=0; row<board.length; row++) {
      for (let col=0; col<board[row].length; col++){
        if (board[row][col] == true)
          return false;
      }
    }
    return true;

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    let valid_board = false;

    while (!valid_board) {  // Execute while loop until a valid board is created
                              //  createBoard function cannot return a board with all values as false
      for (let row=0; row<this.props.nrows; row++) {
        let cell_row = new Array(this.props.ncols);  // Create an array that has ncols elements
        for (let column=0; column <this.props.ncols; column++) {
          cell_row[column] = ( Math.floor(Math.random() * 2) ) ? true : false;  // Randomly assign true or false values 
        }
        board[row] = cell_row;  // Insert the cell_row array to the board array
      }

      valid_board = !this.isAllCellOff(board); // checks if the created board is a valid board
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {

    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);


    function flipCell(x, y) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    flipCell(x,y);

    flipCell(x+1, y); //Flip the right cell of the clicked one
    flipCell(x-1, y); //Flip the left cell of the clicked one
    flipCell(x, y+1); //Flip the bottom cell of the clicked one
    flipCell(x, y-1); //Flip the top cell of the clicked one 

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = this.isAllCellOff(this.state.board);

    this.setState({board: this.state.board, hasWon: hasWon, triesLeft: this.state.triesLeft-1});
  }


  /** Render game board or winning message. */
  render() {
    let board = this.state.board;

    let table = new Array(board.length);
    
    for (let row=0; row<table.length; row++) {
      let cell_row = new Array(board[row].length);

      for (let col=0; col<board[row].length; col++) {
        let coords = row+"-"+col;
        cell_row.push(<Cell flipCellsAroundMe={this.flipCellsAround} coords={coords} isLit={board[row][col]}/>);
    
      }

      table[row] = <tr>{cell_row}</tr>;

    }

    if (this.state.hasWon)
      return (<Won/>);

    if (this.state.triesLeft<=0)
      return (<Leaderboard/>)

    return (
      <React.Fragment>
        <h1>Lights Out</h1>
        <table class="Board">
          {table}
        </table>
        <h2>Tries Left : {this.state.triesLeft}</h2>
      </React.Fragment>
    );
  }
}


export default Board;