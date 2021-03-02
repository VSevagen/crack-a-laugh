import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
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

  // TODO: set initial state -- DONE

  let nrows = 4, ncols = 9, chanceLightStartsOn = 0.5;
  const [total_tries,settries]=useState(0);
  const [board, setBoard] = useState(createBoard()); 

  // create a board nrows high/ncols wide, each cell randomly lit or unlit  --Done 


  function createBoard() {
    let board = [];
    // TODO - create array-of-arrays of true/false values --Done

    
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(true ? Math.random() < chanceLightStartsOn : false);
      }
      board.push(row);
    }
    // board=[[false,false,true,false,false],[false,true,true,true,false],[false,false,true,false,false],[false,false,false,false,false],[false,false,false,false,false]];

    return board;
  }

  // check the board in state to determine whether the player has won.
  function hasWon() { 
    var flag=true; 
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j]){
          flag=false;
          break;
        }
      }
    }
    console.log(flag);
    return flag;
  }

  
   /** handle changing a cell: update board & determine if winner */

  function flipCellsAround(x,y,Board) {
    // let {ncols, nrows} = this.props;
    // let board = this.state.board;
    

    function flipCell(x,y) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        Board[y][x]=!Board[y][x];
      }
    }
    flipCell(y,x);
    flipCell(y,x+1);
    flipCell(y,x-1);
    flipCell(y+1,x);
    flipCell(y-1,x);
    

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    
    return Board;
  }   

  // if the game is won, just show a winning msg & render nothing else
  
  function final(cord){
    settries(()=>{
      return total_tries-1;
    });
    setBoard(() => {
      const [y, x] = cord.split("-").map(Number);     

      // Make a (deep) copy of the oldBoard         
      const boardCopy = board.map(row => [...row]);      
      flipCellsAround(y, x, boardCopy);
       console.log(total_tries) 
      //return the copy
      return boardCopy
    });
  }
  if (hasWon()) {
    // console.log(total_tries)
    return (
      <div>
      <div class="neonwon">YOU<div class="flux2">WON !</div></div>
      <Leaderboard/>
    <div class="flux3">Tries Left: {total_tries}</div>
    </div>
  );
    }
  if(!total_tries)
  return (
    <div>
    <div class="neonwon">YOU<div class="flux2">Lost !</div></div>
    <Leaderboard/>
    <div class="flux3">Tries Left: {total_tries}</div>
    </div>
  );
  // make table board
  return (
    <div>
      {/* <h1>{board}</h1> */}
    <div class="neon">Lights<div class="flux"> Out</div></div>
    <table className="Board">
      {board.map((nrow, y) => 
        <tr key={y}>
          {nrow.map((ncell, x) => 
            <Cell
              isLit={ncell}
              flipCellsAroundMe={() => final(`${y}-${x}`)}
            />
          )}
        </tr>
      )}
    </table>
    <div class="flux2">Tries Left: {total_tries}</div>
    </div>  
  )
  
}

export default Board;