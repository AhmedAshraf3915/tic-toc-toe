import React, { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  const [btnText, setBtnText] = useState("Edit");

  function handleNameClick() {
    setIsEditing((prevValue) => !prevValue);
    setBtnText((prevValue) => (prevValue === "Save" ? "Edit" : "Save"));
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleNameChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleNameClick}>{btnText}</button>
    </li>
  );
}
