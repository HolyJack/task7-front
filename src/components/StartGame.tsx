import { useEffect, useState } from "react";
import { Game } from "../App";
import { socket } from "../utils/socket-io/socket-io";
import BattleshipsGrid from "./Grid/BattleshipsGrid";
import TicTacToeGrid from "./Grid/TicTacToeGrid";
import TicTacToeGame from "./games/TicTacToeGame";
import BattleshipsGame from "./games/BattleshipsGame";

const color: Record<Game, { text: string }> = {
  "tic-tac-toe": { text: "text-yellow-300" },
  battleships: { text: "text-purple-400" },
};

export default function StartGame({ game }: { game: Game }) {
  const [gameID, setGameID] = useState<string>("");
  const [player, setPlayer] = useState<0 | 1 | undefined>(undefined);
  const [enteredGameID, setEnteredGameID] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);

  function createNewGame() {
    socket.emit("create new game", game);
  }

  function joinGame() {
    setPlayer(1);
    socket.emit("join game", enteredGameID, game);
  }

  useEffect(() => {
    function onGameCreated(gameID: string) {
      setGameID(gameID);
      setPlayer(0);
    }

    function onPlayer2Joined(gameID: string) {
      setEnteredGameID("");
      setGameID(gameID);
      setGameStarted(true);
    }

    function onExitGame() {
      setPlayer(undefined);
      setGameStarted(false);
      setGameID("");
    }

    socket.on("game created", onGameCreated);
    socket.on("exit game", onExitGame);
    socket.on("player 2 joined", onPlayer2Joined);

    return () => {
      socket.off("game created", onGameCreated);
      socket.on("exit game", onExitGame);
      socket.off("player 2 joined", onPlayer2Joined);
    };
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-10 pt-10">
      <h2
        className={`text-4xl font-bold capitalize ${color[game].text}`}
      >{`>>> ${game} <<<`}</h2>
      {!gameStarted && (
        <div className="w-96">
          {game === "tic-tac-toe" ? <TicTacToeGrid /> : <BattleshipsGrid />}
        </div>
      )}
      {gameStarted && player !== undefined && (
        <div className="w-fit">
          {game === "tic-tac-toe" ? (
            <TicTacToeGame player={player} gameID={gameID} />
          ) : (
            <BattleshipsGame player={player} gameID={gameID} />
          )}
        </div>
      )}
      {!gameID && (
        <div className="flex w-full gap-5 text-xl font-semibold">
          <button
            className="h-20 flex-1 rounded border bg-gray-800 hover:bg-white"
            onClick={createNewGame}
          >
            Create new game!
          </button>
          <div className="flex flex-1">
            <input
              type="text"
              className="flex-1 rounded-l text-center text-black placeholder:text-center"
              value={enteredGameID}
              onChange={(e) => setEnteredGameID(e.target.value)}
              placeholder="Enter Game ID!"
            />
            <button
              onClick={joinGame}
              className="h-20 flex-1 rounded-r border bg-gray-800 hover:bg-white"
            >
              Join exisiting game!
            </button>
          </div>
        </div>
      )}
      {gameID && !gameStarted && (
        <div className="bg-gray-800 p-5">
          <p className="mx-auto">
            Share Game ID:{" "}
            <span
              className="cursor-copy hover:text-white"
              onClick={() => {
                navigator.clipboard.writeText(gameID);
              }}
            >
              {gameID}
            </span>
          </p>
        </div>
      )}
      {gameID && gameStarted && (
        <button
          className="h-20 w-full rounded border bg-gray-800 text-xl font-semibold text-white"
          onClick={() => socket.emit("exit game", gameID)}
        >
          Leave Game
        </button>
      )}
    </section>
  );
}
