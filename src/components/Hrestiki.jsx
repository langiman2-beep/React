import { useState, useEffect } from "react";
import NameForm from "./NameForm";
import SetupPanel from "./SetupPanel";
import { calculateWinner } from "../helpers.js";
import ScoreTable from "./ScoreTable";
import GameBoard from "./GameBoard";

function Hrestiki() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [smartAI, setSmartAI] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5);
  const [winnerMessage, setWinnerMessage] = useState("");

  const handleNameSubmit = (enteredName) => {
    setPlayerName(enteredName);
    localStorage.setItem("hrestiki_name", enteredName);
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("hrestiki_score");
    const savedName = localStorage.getItem("hrestiki_name");
    if (savedScore) {
      const parsed = JSON.parse(savedScore);
      if (Array.isArray(parsed)) setScore(parsed);
    }
    if (savedName) setPlayerName(savedName);
  }, []);

  // 1. Таймер обратного отсчета для хода игрока
  useEffect(() => {
    if (gameStarted && xIsNext) {
      setTimeLeft(5);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);

            // Техническое поражение по таймеру
            const existingPlayer = score.find((p) => p.name === playerName);
            let newScore;
            if (existingPlayer) {
              newScore = score.map((p) =>
                p.name === playerName ? { ...p, compWins: p.compWins + 1 } : p,
              );
            } else {
              newScore = [
                ...score,
                { name: playerName, playerWins: 0, compWins: 1, draws: 0 },
              ];
            }
            setScore(newScore);
            localStorage.setItem("hrestiki_score", JSON.stringify(newScore));
            setWinnerMessage("Комп'ютер");
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, xIsNext, board]);

  // 2. Умные мозги компьютера
  useEffect(() => {
    if (gameStarted && !xIsNext) {
      const emptyCells = board
        .map((cell, i) => (cell === null ? i : null))
        .filter((val) => val !== null);
      if (emptyCells.length === 0) return;

      const timer = setTimeout(() => {
        let targetIndex = null;

        if (smartAI) {
          const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          const mySign = "O";
          const enemySign = "X";

          // Атака
          for (let line of lines) {
            const [a, b, c] = line;
            const values = [board[a], board[b], board[c]];
            if (
              values.filter((v) => v === mySign).length === 2 &&
              values.filter((v) => v === null).length === 1
            ) {
              targetIndex = line[values.indexOf(null)];
              break;
            }
          }

          // Защита
          if (targetIndex === null) {
            for (let line of lines) {
              const [a, b, c] = line;
              const values = [board[a], board[b], board[c]];
              if (
                values.filter((v) => v === enemySign).length === 2 &&
                values.filter((v) => v === null).length === 1
              ) {
                targetIndex = line[values.indexOf(null)];
                break;
              }
            }
          }
        }

        if (targetIndex === null) {
          targetIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        handleClick(targetIndex);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [gameStarted, xIsNext, board, smartAI]);

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (!gameStarted || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const roundWinner = calculateWinner(newBoard);
    const isDraw = !roundWinner && newBoard.every((cell) => cell !== null);

    if (roundWinner || isDraw) {
      const existingPlayer = score.find((p) => p.name === playerName);
      let pWins = 0;
      let cWins = 0;
      let drawsCount = 0;

      if (roundWinner) {
        if (xIsNext) {
          pWins = 1;
          setWinnerMessage(playerName);
        } else {
          cWins = 1;
          setWinnerMessage("Комп'ютер");
        }
      } else if (isDraw) {
        drawsCount = 1;
      }

      let newScore;
      if (existingPlayer) {
        newScore = score.map((p) =>
          p.name === playerName
            ? {
                ...p,
                playerWins: p.playerWins + pWins,
                compWins: p.compWins + cWins,
                draws: (p.draws || 0) + drawsCount,
              }
            : p,
        );
      } else {
        newScore = [
          ...score,
          {
            name: playerName,
            playerWins: pWins,
            compWins: cWins,
            draws: drawsCount,
          },
        ];
      }

      setScore(newScore);
      localStorage.setItem("hrestiki_score", JSON.stringify(newScore));
      setGameStarted(false);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const handleStop = () => {
    setPlayerName("");
    setGameStarted(false);
    setWinnerMessage("");
    setBoard(Array(9).fill(null));
  };

  const toggleFirstMove = () => {
    setXIsNext(!xIsNext);
  };

  const isDraw =
    !calculateWinner(board) && board.every((cell) => cell !== null);

  return (
    <div className="game-container">
      <div className="left-panel">
        <NameForm
          onNameSubmit={handleNameSubmit}
          isNameEntered={!!playerName}
          isGameActive={gameStarted}
        />
      </div>
      <div className="game-zone relative-zone">
        <div className="setup-row">
          <SetupPanel
            isXNext={xIsNext}
            onToggleFirstMove={toggleFirstMove}
            isGameActive={gameStarted}
          />
          {!gameStarted && (
            <span className="setup-hint-blink">
              ← Оберіть хто перший ходить
            </span>
          )}
          <button
            className={`ai-toggle-btn ${smartAI ? "active" : ""}`}
            disabled={gameStarted}
            onClick={() => setSmartAI(!smartAI)}
          >
            {smartAI ? "Розумний" : "Рандом"}
          </button>

          {gameStarted && xIsNext && (
            <div className="countdown-timer">{timeLeft}</div>
          )}
        </div>

        {winnerMessage && (
          <h2 className="blink-text">Переміг: {winnerMessage}!</h2>
        )}
        {isDraw && !winnerMessage && <h2 className="blink-text">Нічия!</h2>}

        <p className="vs-text">
          <span className="player-name-highlight">
            {playerName ? playerName : "???"}
          </span>
          <span className="vs-span"> VS </span>
          <span className="comp-name-highlight">Комп'ютер</span>
        </p>

        <div className="controls-row">
          <button
            disabled={!playerName}
            className="start-btn"
            onClick={() => {
              setBoard(Array(9).fill(null));
              setWinnerMessage("");
              setGameStarted(true);
            }}
          >
            Старт
          </button>
          <button className="stop-btn" onClick={handleStop}>
            Стоп
          </button>
        </div>

        <GameBoard
          board={board}
          gameStarted={gameStarted}
          onCellClick={handleClick}
        />
      </div>
      <ScoreTable
        score={score}
        onFullReset={() => {
          localStorage.removeItem("hrestiki_score");
          setScore([]);
        }}
      />
    </div>
  );
}

export default Hrestiki;
