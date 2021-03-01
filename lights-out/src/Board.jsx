import React, { useState } from "react";
import Leaderboard from "./Leaderboard";
import Cell from "./Cell";
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

function Board(props) {

  // TODO: set initial state
  const [board, setBoard] = useState(createBoard(props));
  const [triesLeft, setTriesLeft] = useState(20);
  const [hasWon, setHasWon] = useState(false);

  /* isAllCellOff function will return true if all the values of the board array is false, otherwise false */

  function isAllCellOff(board) {

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] == true)
          return false;
      }
    }
    return true;

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    let valid_board = false;

    while (!valid_board) {  // Execute while loop until a valid board is created
      //  createBoard function cannot return a board with all values as false
      for (let row = 0; row < props.nrows; row++) {
        let cell_row = new Array(props.ncols);  // Create an array that has ncols elements
        for (let column = 0; column < props.ncols; column++) {
          cell_row[column] = (Math.floor(Math.random() * 2)) ? true : false;  // Randomly assign true or false values 
        }
        board[row] = cell_row;  // Insert the cell_row array to the board array
      }

      valid_board = !isAllCellOff(board); // checks if the created board is a valid board
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  function flipCellsAround(coord) {

    let { ncols, nrows } = props;
    let [x, y] = coord.split("-").map(Number);


    function flipCell(x, y) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    flipCell(x, y);

    flipCell(x + 1, y); //Flip the right cell of the clicked one
    flipCell(x - 1, y); //Flip the left cell of the clicked one
    flipCell(x, y + 1); //Flip the bottom cell of the clicked one
    flipCell(x, y - 1); //Flip the top cell of the clicked one

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = isAllCellOff(board);
    setBoard(board);
    setTriesLeft(triesLeft - 1);
    setHasWon(hasWon);
  }


  /** Render game board or winning message. */


  let table = new Array(board.length);

  for (let row = 0; row < table.length; row++) {
    let cell_row = new Array(board[row].length);

    for (let col = 0; col < board[row].length; col++) {
      let coords = row + "-" + col;
      cell_row.push(<Cell flipCellsAroundMe={flipCellsAround} coords={coords} isLit={board[row][col]} />);

    }

    table[row] = <tr>{cell_row}</tr>;

  }

  if (hasWon)
    return (
    <React.Fragment>
       
       <h1>You Won</h1>
        <div><Leaderboard hasWon={hasWon}/></div>
        <h2>Tries Left : {triesLeft}</h2>
      </React.Fragment>
    );

  if (triesLeft <= 0)
    return (
      <React.Fragment>
        <div><h1>You Lost</h1></div>
        <Leaderboard hasWon={hasWon}/>
        <h2>Tries Left : {triesLeft}</h2>
      </React.Fragment>
    );


  return (
    <React.Fragment>
      <h1>Lights Out</h1>
      <table class="Board">
        {table}
      </table>
      <h2>Tries Left : {triesLeft}</h2>
    </React.Fragment>
  );

}


export default Board;