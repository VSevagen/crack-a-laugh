import React from "react";
import { useState } from 'react';
import Cell from "./Cell";
import "./Board.css";

function Board(props) {
  

  const [board, setBoard] = useState(createBoard(props));
  const [triesLeft, setTriesLeft] = useState(2);
  const [hasWon, setHasWon] = useState(false);
  
  function createBoard() {
    let board = [];
    for (let row = 0; row < props.nrows; row++) {
      let cell_row = new Array(props.ncols); 
      for (let column = 0; column < props.ncols; column++) {
        cell_row[column] = (Math.floor(Math.random() * 2)) ? true : false;  // Randomly assign true or false values 
      }
      board[row] = cell_row; 
    }
    return board;
  }

  const flipCellsAround = (coord) => {
    let { ncols, nrows } = props;
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
      cell_row.push(<Cell flipCellsAroundMe={flipCellsAround} coords={coords} isLit={board[row][col]} />);

    }

    table[row] = <tr>{cell_row}</tr>;

  }


    if (hasWon)
    return (
      <>
       <div className="neon-yellow" >You <spam className="neon-blue-out">Won!</spam></div>
        {/* <div><Leaderboard hasWon={hasWon}/></div> */}
        <div className="neon-blue">Tries Left: {triesLeft}</div>
      </>
    );

    if (triesLeft <= 0)
      return (
        <>
          <div className="neon-yellow" >You<spam className="neon-blue-out">Lost!</spam></div>
          {/* <Leaderboard hasWon={hasWon}/> */}
          <div className="neon-blue">Tries Left: {triesLeft}</div>
        </>
      );


    return (
      <>
        <div className="Board-title">
          <div className="neon-orange">Ligths</div>
          <div className="neon-blue-out">Out</div>
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