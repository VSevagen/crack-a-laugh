import React, { useState } from "react";
import Cell from "./Cell";
import './Board.css';
import Leaderboard from "./Leaderboard";
import Form from "./Form";

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

function Board() {

  
  let [board, setBoard] = useState(createBoard);
  let [hasWon, sethasWon] = useState(false);
  let [tries,setTries] = useState(20);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < 4; y++) {
      let row = [];
      for (let x = 0; x < 9; x++) {
        row.push(Math.random() < 0.25);
      }
      board.push(row);
    }
    return board;
  }
  /** handle changing a cell: update board & determine if winner */

  function flipCellsAround(coord) {
    let newboard = Object.assign([],board);   //Sorce is from the board and then targetting it to the empty list.
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < 9 && y >= 0 && y < 4) {
        newboard[y][x] = !newboard[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every((row) =>
      row.every((cell) => {
        return cell === false;
      })
    );

    let left = tries
    left--
    setTries(left);
    setBoard(newboard);
    sethasWon(hasWon);
  }

  /** Render game board or winning message. */


  const tableBoard = [];
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 9; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          coord={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={flipCellsAround}
        />
      );
    }
    tableBoard.push(<tr key={`row${y}`}>{row}</tr>);
  }
  

  return (
    hasWon
      ? (
        <div>
          <h1 className='title'>Lights Out</h1>
          <h2 className='winningMessage'>Winner!</h2>
          <Form/>
          <Leaderboard/>
        </div>
      )
      : tries>0
      ?(
        <div>
          <h1 className='title'>Lights Out</h1>
          <table className="Board">
            <tbody>{tableBoard}</tbody>
          </table>
          <div className='left'>
            Tries left: {tries}
          </div>
        </div>
      )
      :(
        <div>
          <h className='over'>Game Over</h>
          <Form/>
          <Leaderboard/>
          <div className='left'>
            Tries left: {tries}
          </div>
        </div>
        
      ));
}


export default Board;