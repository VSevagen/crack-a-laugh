import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import './Board.css';
import Leaderboard from "./Leaderboard";

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
  const [hasWon, setHasWon] = useState(false)
  const [board, setBoard] = useState(createBoard(props))
  const [tryCount, setTryCount] = useState(15)
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(props) {
    let board = [];
    let arr = [];

    for (let i = 0; i < props.nrows; i++) {
      for (let j = 0; j < props.ncols; j++) {

        arr.push(Math.random() < props.chanceLightStartsOn);

      }
      board.push(arr)
      arr = [];

    }

    console.log("Board", board)
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  function flipCellsAround(coord) {
    let b = [...board]
    let { ncols, nrows } = props;
    let [y, x] = coord.split("-").map(Number);

    if(tryCount > 0){
      setTryCount(tryCount - 1)
    }
    

    


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        b[y][x] = !b[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    // TODO: flip this cell and the cells around it

    let hasWon = b.every(row => row.every(cell => !cell));
    // win when every cell is turned off
    // TODO: determine is the game has been won

    setBoard(b);
    setHasWon(hasWon);
   
  }

  /** Render game board or winning message. */

  return (

    // if the game is won, just show a winning msg along with the leaderboard
    <div>
      <div>
        {tryCount != 0 && hasWon 
          ? (
            <div className="winner">
              <span className="neon-orange">YOU</span>
              <span className="neon-blue">WIN!</span>
            </div>
          ) : (
            <div>
              <div className="Board-title">
                <div className="neon-orange">Lights</div>
                <div className="neon-blue">Out</div>
              </div>
              <div>
                <table className="Board">
                  <div>
                    {
                      board.map((cell, row) => (
                        <tr>
                          {cell.map((c, col) => (
                            <Cell key={col} coord={row + "-" + col} flipCellsAroundMe={flipCellsAround} isLit={c} />
                          ))}
                        </tr>
                      ))
                    }
                  </div>
                </table>
              </div>

              <div className="tries">
                <div className="tries-neon-blue">Tries Left: {tryCount}</div>

              </div>

              <div>
                {tryCount == 0 &&
                  <div className="loser">
                    <span className="neon-orange">YOU</span>
                    <span className="neon-blue">LOSE!</span>
                  </div>
                }

              </div>

            </div>


          )}
        


      </div>
      
    </div>
  )
}


export default Board;
