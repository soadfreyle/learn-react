import { useState } from "react";

import "./App.css";
const TURNS = {
  x: "x",
  o: "o",
};

const Square = ({ children, updateBoard, index }) => {
  return <div className="square">{children}</div>;
};
function App() {
  const [board, setBoard] = useState([
    "x",
    "x",
    "x",
    "o",
    "o",
    "o",
    "x",
    "o",
    "x",
  ]);
  console.log(board);
  return (
    <main className="board">
      <h1>Tic tac toc</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index}>
              {board[index]}
            </Square>
          );
        })}
      </section>
    </main>
  );
}

export default App;
