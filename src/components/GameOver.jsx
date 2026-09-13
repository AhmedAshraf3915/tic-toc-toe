import React from "react";

export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <p>Game Over!</p>
      {winner ? <h2>{winner} wins!</h2> : <h2>It's draw</h2>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
