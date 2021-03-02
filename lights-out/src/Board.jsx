import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board(props) {

  const [board, setBoard] = useState(createBoard(props));
  const [triesLeft, setTriesLeft] = useState(20);
  const [hasWon, setHasWon] = useState(false);
  
  function createBoard() {
    let board = [];
    for (let row = 0; row < props.nrows; row++) {
      let cellRow = new Array(props.ncols); 
      for (let column = 0; column < props.ncols; column++) {
        cellRow[column] = (Math.random() < props.chanceLightStartsOn); 
      }
      board[row] = cellRow; 
    }
    return board;
  }

  const flipCellsAround = (coord) => {
    let {nrows, ncols} = props;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    setBoard(board);
    setTriesLeft(triesLeft - 1);
    setHasWon(hasWon);
  }  
  
  let table = new Array(board.length);

  for (let row = 0; row < table.length; row++) {
    let cell_row = new Array(board[row].length);

    for (let col = 0; col < board[row].length; col++) {
      let coords = row + "-" + col;
      cell_row.push(
      <Cell flipCellsAroundMe={flipCellsAround} coords={coords} isLit={board[row][col]} />
      );
    }

    table[row] = <tr>{cell_row}</tr>;

  }
    if (hasWon)
    return (
      <>
       <div className="neon-orange" >You <spam className="neon-blue">Won !</spam></div>
        <div className="neon-blue">Tries Left: {triesLeft}</div>
      </>
    );

    if (triesLeft <= 0)
      return (
        <>
          <div className="neon-orange">You<spam className="neon-blue">Lost!</spam></div>
        </>
      );

    return (
      <>
        <div className="Board-title">
          <div className="neon-orange">Lights<spam className="neon-orange">Out</spam></div>
        </div>
        <table class="Board">
          {table}
        </table>
        <div className="Tries-left">
          <div className="neon-blue">Tries Left: {triesLeft}</div>            
        </div>
      </>
    );
}

export default Board;