import React, {useState} from "react";
import Cell from "./Cell";
import './Board.css';
import { render } from "react-dom";

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
  constructor(props){
    super(props);
    this.state={
      triesLeft:20,
    
      hasWon: false,
      board: this.createBoard()
    }
  }

  // componentWillMount(){
  //   this.createBoard()
  // }

  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
  
    for(let i=0;i<this.props.nrows;i++){
      let row=[]
      for(let j=0;j<this.props.ncols;j++){
      //  board[i][j]=Math.random()>this.props.chanceLightStartsOn
        row[j]=(Math.random()<this.props.chanceLightStartsOn); 
      }
      board.push(row)
    }
   // this.setState({board: board})
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround=(coord) =>{
    console.log("clicked")
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x]; 
      }
    }

    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y,x+1);
    flipCell(y+1,x);
    flipCell(y,x-1);
    let a=this.state.triesLeft
    a--
    this.setState({triesLeft:a})

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

   

    let hasWon = board.every(row => row.every(cell => !cell));
    console.log(hasWon)
     this.setState({board,hasWon: hasWon});
  }


  renderCells(){
    let board=[]
    
    for (let j=0;j<this.props.nrows;j++){
      let row=[]
      for (let i=0;i<this.props.ncols;i++){
        let key=`${j}-${i}`;
        row[i]=(
          <Cell
          key={key}
          isLit={this.state.board[j][i]}
          flipCellsAroundMe={()=>this.flipCellsAround(key)}
          />
        )
          
      }
      board.push(<tr>{row}</tr>)
    }
    return board;

  }

  /** Render game board or winning message. */
 render(){
  return (

    // if the game is won, just show a winning msg along with the leaderboard

    // TODO

    // make table board
    // render leaderboard when won or lost

    // TODO
    <div>
      {
        this.state.hasWon? 
          <div>You won</div>:
          this.state.triesLeft>0?
          <div>
            LightsOut
            <table className="Board">
            {this.renderCells()}
          </table>
          Tries Left: {this.state.triesLeft}
            </div>:
            <div>
              Game Over
              </div>

          
      }
    </div>
    
  );
 }
 
}


export default Board;

