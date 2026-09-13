import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(arr) {
  let board = [...initialGameBoard.map((array) => [...array])];
  for (const turn of arr) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function deriveGameWinner(board, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol = board[combination[0].row][combination[0].column];
    const secondPlayerSymbol = board[combination[1].row][combination[1].column];
    const thirdPlayerSymbol = board[combination[2].row][combination[2].column];

    if (
      firstPlayerSymbol &&
      firstPlayerSymbol === secondPlayerSymbol &&
      secondPlayerSymbol === thirdPlayerSymbol
    ) {
      winner = players[firstPlayerSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });

  const board = deriveGameBoard(gameTurns);
  const winner = deriveGameWinner(board, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  let activePlayer = deriveCurrentPlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveCurrentPlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  function handleGameRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        {hasDraw && <GameOver onRestart={handleGameRestart} />}
        {winner && <GameOver winner={winner} onRestart={handleGameRestart} />}
        <GameBoard handleSelectSquare={handleSelectSquare} board={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
