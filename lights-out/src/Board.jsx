import React, { useState } from "react";
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

  // done: set initial state
  const [hasWon, setHasWon] = useState(false)
  const [board, setBoard] = useState(createBoard(props))
  const [triesLeft, setTriesLeft] = useState(20);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard(props) {
    let board = [];
    // done: create array-of-arrays of true/false values
    for (let row_num = 0; row_num < props.nrows; row_num++) {
      let row = [];
      for (let col_num = 0; col_num < props.ncols; col_num++) {
        row.push(Math.random() < props.chanceLightStartsOn);
      }
      board.push(row)
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  const flipCellsAround = (coord) => {
    let { ncols, nrows } = props;
    let [y, x] = coord.split("-").map(Number);
    let newBoard = board;

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    setBoard(newBoard);

    setTriesLeft(triesLeft - 1);
    setHasWon(hasWon);
  }


  /** Render game board or winning message. */

  // make table board

  let boardTable = new Array(board.length);

  for (let row = 0; row < boardTable.length; row++) {
    let table_row = new Array(board[row].length);

    for (let col = 0; col < board[row].length; col++) {
      let coords = row + "-" + col;
      table_row.push(<Cell key={coords} flipCellsAroundMe={flipCellsAround} coords={coords} isLit={board[row][col]} />);

    }

    boardTable[row] = <tr>{table_row}</tr>;
  }


  // if the game is won, just show a winning msg along with the leaderboard
  // render leaderboard when won or lost


  if (hasWon)
    return (
      <>
        <h1>LIGHTS OUT!</h1>

        <h2>You won!</h2>
        <h2>You had {triesLeft} tries left</h2>
      </>
    );

  if (triesLeft <= 0)
    return (
      <>
        <h1>LIGHTS OUT!</h1>

        <h2 >You Lost!</h2>

        <h2>No tries left</h2>
      </>
    );
  return (

    <>
      <h1>LIGHTS OUT!</h1>

      <table className="Board">
        {boardTable}
      </table>
      <h2>Tries Left: {triesLeft}</h2>
    </>

  );
}


export default Board;