function GameBoard({ board, gameStarted, onCellClick }) {
  return (
    <div className="board">
      {board.map((kletka, index) => (
        <button
          key={index}
          className="kletka"
          disabled={!gameStarted}
          onClick={() => onCellClick(index)}
        >
          {kletka}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
