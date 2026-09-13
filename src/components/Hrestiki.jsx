import { useState, useEffect } from "react";
import NameForm from "./NameForm";

function Hrestiki() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState({ xWins: 0, oWins: 0, draws: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const handleNameSubmit = (enteredName) => {
    setPlayerName(enteredName);
    localStorage.setItem("hrestiki_name", enteredName);
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("hrestiki_score");
    const savedName = localStorage.getItem("hrestiki_name");
    if (savedScore) setScore(JSON.parse(savedScore));
    if (savedName) setPlayerName(savedName);
  }, []);

  const handleClick = (index) => {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  const handleStop = () => {
    setPlayerName("");
    setGameStarted(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="game-container">
      <div className="left-panel">
        <NameForm
          onNameSubmit={handleNameSubmit}
          isNameEntered={!!playerName}
          isGameActive={gameStarted}
        />
      </div>
      <div className="game-zone">
        <p className="vs-text">
          {playerName ? playerName : "???"} VS Комп'ютер
        </p>{" "}
        <button disabled={!playerName} onClick={() => setGameStarted(true)}>
          Старт
        </button>{" "}
        <button onClick={handleStop}>Стоп</button>
        <div className="board">
          {board.map((kletka, index) => (
            <button
              key={index}
              className="kletka"
              disabled={!gameStarted}
              onClick={() => handleClick(index)}
            >
              {kletka}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hrestiki;
