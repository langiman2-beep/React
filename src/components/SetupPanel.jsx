function SetupPanel({ isXNext, onToggleFirstMove, isGameActive }) {
  return (
    <div className="setup-panel">
      <button disabled={isGameActive} onClick={onToggleFirstMove}>
        Ход: {isXNext ? "Гравця" : "Комп'ютера"}
      </button>
    </div>
  );
}

export default SetupPanel;
