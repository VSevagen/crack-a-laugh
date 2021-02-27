import React, {useState} from "react";
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

    const [hasWon, setHasWon] = useState(false);
    const [board, setBoard] = useState(createBoard);
    const [left, setLeft] = useState(20);
    const [over, setOver] = useState(false);

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    function createBoard() {
        let board = Array(props.nrows).fill().map(
            () => Array(props.ncols).fill().map(u => Math.random() > 0.8)
        )
        return board;
    }

    /** handle changing a cell: update board & determine if winner */

    function flipCellsAround(coord) {
        let {ncols, nrows} = props;
        let tempBoard = Object.assign([], board);
        let {y, x} = coord;


        function flipCell(y, x) {
            // if this coord is actually on board, flip it

            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                tempBoard[y][x] = !tempBoard[y][x];
                (tempBoard[y-1] || [])[x] = !(tempBoard[y-1] || [])[x] // top
                if (isFinite(tempBoard[y][x+1]))
                    tempBoard[y][x+1] = !tempBoard[y][x+1]; // right
                (tempBoard[y+1] || [])[x] = !(tempBoard[y+1] || [])[x] // bottom
                if (isFinite(tempBoard[y][x-1]))
                    tempBoard[y][x-1] = !tempBoard[y][x-1] // left
            }
        }

        flipCell(y, x);

        // win when every cell is turned off
        let hasWon = true;
        board.forEach(u => u.forEach(v => v ? hasWon = false : ''))

        setBoard(tempBoard);
        setHasWon(hasWon);

        // decrement chance left
        setLeft(l => l - 1)

        if (hasWon || left === 0)
            setOver(true);
    }


    /** Render game board or winning message. */
    return (
        // if the game is won, just show a winning msg along with the leaderboard
        <div>
            <div className={'Board'} style={{'gridTemplateColumns': `repeat(${props.ncols}, 1fr)`}}>
                {board.map((row, y) =>
                    row.map((col, x) => (
                        <Cell key={y * board.length + x} flipCellsAroundMe={() => flipCellsAround({y, x})}
                              isLit={board[y][x]}/>
                    ))
                )}
            </div>

            <div className={'left'}>
                Tries left: {left}
            </div>

            {
            /* make table board
            render leaderboard when won or lost

             TODO */}
        </div>
    );
}


export default Board;
