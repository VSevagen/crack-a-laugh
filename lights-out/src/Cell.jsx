import React from 'react'
import "./Cell.css"


function Cell(props) {

  const handleClick = (evt) => {
    // call up to the board to flip cells around this cell
    props.flipCellsAroundMe(props.coord);
  };

  let classes = "Cell" + (props.isLit ? " Cell-lit" : "");

  return <td className={classes} onClick={handleClick} />;
  }


export default Cell