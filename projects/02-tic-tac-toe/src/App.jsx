import { useState } from "react";

import "./App.css";
const TURNS = {
  x: "x",
  o: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""} `;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  //estado para saber el turno
  const [turn, setTurn] = useState(TURNS.x);
  //null no a ganador y false como un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras
    //para ver si  X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //si no hay ganador
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  const updateBoard = (index) => {
    //no sobreescribe en la posicion
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } // TODO: check if game over
  };
  return (
    <main className="board">
      <h1>Tic tac toc</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Gano"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de Nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
