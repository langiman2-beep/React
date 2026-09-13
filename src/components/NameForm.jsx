import { useState } from "react";

function NameForm({ onNameSubmit, isNameEntered, isGameActive }) {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onNameSubmit(name.trim());
    setName("");
  };
  return (
    <form onSubmit={handleSubmit} className="name-form">
      {!isNameEntered ? (
        <h2 className="blink-text">Введіть ім'я гравця для початку гри!</h2>
      ) : null}
      <input
        type="text"
        value={name}
        disabled={isGameActive}
        onChange={(e) => setName(e.target.value)}
        placeholder="Твоє ім'я, Командир"
      />
      <button type="submit">Ввести</button>
    </form>
  );
}

export default NameForm;
