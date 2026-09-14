function ScoreTable({ score, onFullReset }) {
  return (
    <div className="score-table-container">
      <div className="table-header-block">
        <h3 className="table-title">Турнірна Таблиця</h3>
        <button className="reset-btn" onClick={onFullReset}>
          Скинути все
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Гравець</th>
            <th>Перемоги гравця</th>
            <th>Перемоги комп'ютера</th>
            <th>Нічиї</th> {/* ДОБАВИЛИ КОЛОНКУ */}
          </tr>
        </thead>
        <tbody>
          {score.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.playerWins}</td>
              <td>{player.compWins}</td>
              <td>{player.draws || 0}</td> {/* ДОБАВИЛИ ДАННЫЕ */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreTable;
