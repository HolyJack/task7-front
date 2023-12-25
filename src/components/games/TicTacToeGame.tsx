import { useEffect, useState } from "react";
import { socket } from "../../utils/socket-io/socket-io";

export default function TicTacToeGame({
  gameID,
  player,
}: {
  gameID: string;
  player: 0 | 1;
}) {
  const [turns, setTurns] = useState<number[]>([]);
  const allowedToMakeATurn = turns.length % 2 === player ? true : false;
  const cross = turns.filter((_, i) => i % 2 === 0);
  const circle = turns.filter((_, i) => i % 2 === 1);

  function makeTurn(i: number) {
    if (allowedToMakeATurn && !turns.filter((old) => old === i).length) {
      setTurns((prev) => prev.concat([i]));
      socket.emit("make turn", gameID, i);
    }
  }

  useEffect(() => {
    function onNewTurn(turn: number) {
      setTurns((prev) => prev.concat(turn));
    }

    function onGameFinished(winner: 0 | 1 | 2) {
      if (winner === player) {
        window.alert("Victory!");
        return;
      } else if (winner === 2) {
        window.alert("Draw!");
      } else {
        window.alert("You Lost!");
      }
    }

    socket.on("new turn", onNewTurn);
    socket.on("game finished", onGameFinished);

    return () => {
      socket.off("new turn", onNewTurn);
      socket.off("game finished", onGameFinished);
    };
  }, [player]);

  return (
    <section
      className="grid aspect-square w-96 grid-flow-row grid-cols-3 grid-rows-3
      gap-2 bg-gray-800 p-2"
    >
      {Array(9)
        .fill(undefined)
        .map((_, i) => (
          <div
            key={i}
            className="flex select-none items-center justify-center rounded-md
            bg-yellow-300 text-8xl font-semibold text-white transition
            hover:bg-white hover:text-black"
            onClick={() => makeTurn(i)}
          >
            {cross.includes(i) ? "X" : circle.includes(i) ? "O" : undefined}
          </div>
        ))}
    </section>
  );
}
