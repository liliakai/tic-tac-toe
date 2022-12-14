import { useState } from "react";
import './App.css';

function Cell(props) {

  function onClick() {
    props.onClick(props.index);
  }

  return (
    <div className="cell" onClick={onClick}>
      { props.mark }
    </div>
  );
}

function App() {
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  function didWin(newBoard) {
    const winStates = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const i in winStates) {
      const cells = winStates[i];
      if (cells.every((i) => newBoard[i] === turn)) {
        return true;
      }
    }

    return false;
  }

  function onCellClick(i) {
    if (board[i] !== "" || winner) {
      return;
    }
    const newBoard = board.slice(); // treat board as immutable
    newBoard[i] = turn;
    setBoard(newBoard);

    if (didWin(newBoard)) {
      setWinner(turn);
      return;
    }

    if (turn === 'X') {
      setTurn("O");
    } else if (turn === 'O') {
      setTurn("X");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          TicTacToe
        </p>
        { winner ? <p> Winner: {winner} </p> : null }
      </header>
      <div className="content">
        <div className="board">
          {
            board.map(function(cell, i) {
              return (
                <Cell key={i} index={i} mark={cell} onClick={onCellClick} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
