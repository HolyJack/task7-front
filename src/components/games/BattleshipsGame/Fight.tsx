import { useEffect, useState } from "react";
import PlayerField from "./PlayerField";
import { socket } from "../../../utils/socket-io/socket-io";

export default function Fight({
  gameID,
  player,
  initialPlayerField,
}: {
  gameID: string;
  player: number;
  initialPlayerField: number[];
}) {
  const [playerField, setPlayerField] = useState<number[]>(initialPlayerField);
  const [isMadeTurn, setIsMadeTurn] = useState<boolean>(player !== 0);
  const [enemyField, setEnemyField] = useState<number[]>(
    Array(10 * 10).fill(4),
  );

  useEffect(() => {
    function onTurnResult(targetPlayer: number, i: number, res: number) {
      if (player === targetPlayer) {
        setPlayerField((prev) => {
          const newField = [...prev];
          newField[i] = res === 3 ? 3 : res;
          return newField;
        });
        setIsMadeTurn(false);
      } else {
        setEnemyField((prev) => {
          const newField = [...prev];
          newField[i] = res === 3 ? 0 : res;
          return newField;
        });
        setIsMadeTurn(true);
      }
    }
    function onGameFinish(winner: number) {
      if (winner === player) window.alert("You Won!");
      else window.alert("You Lost!");
      setIsMadeTurn(true);
    }
    socket.on("turn result", onTurnResult);
    socket.on("game finished", onGameFinish);
    return () => {
      socket.off("turn result", onTurnResult);
      socket.off("game finished", onGameFinish);
    };
  }, [player]);

  function makeTurn(i: number) {
    if (i < 0 || i > 99) return;
    if (isMadeTurn) return;
    socket.emit("make turn battleships", gameID, i);
  }

  return (
    <>
      <div className="flex flex-col items-center overflow-hidden rounded border bg-gray-800">
        <PlayerField playerField={playerField} onClick={() => undefined} />
        <h3 className="w-full  text-center font-bold">Your Field</h3>
      </div>
      <div className="flex flex-col items-center overflow-hidden rounded border bg-gray-800">
        <PlayerField playerField={enemyField} onClick={makeTurn} />
        <h3 className="w-full  text-center font-bold text-red-300">
          Enemy Field
        </h3>
      </div>
    </>
  );
}
