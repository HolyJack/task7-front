import { useState } from "react";
import Fight from "./BattleshipsGame/Fight";
import Preparation from "./BattleshipsGame/Preparation";

export type Battleship = { name: string; size: number; amount: number };

export default function BattleshipsGame({
  player,
  gameID,
}: {
  player: number;
  gameID: string;
}) {
  const [gameState, setGameState] = useState<"preparation" | "fight">(
    "preparation",
  );
  const [playerField, setPlayerField] = useState<number[]>(
    Array(10 * 10).fill(0),
  );

  return (
    <section className="mx-auto flex w-fit flex-col gap-5 p-5 md:flex-row">
      {gameState === "preparation" && (
        <Preparation
          player={player}
          gameID={gameID}
          playerField={playerField}
          setPlayerField={setPlayerField}
          setGameReady={() => setGameState("fight")}
        />
      )}
      {gameState === "fight" && (
        <Fight
          player={player}
          gameID={gameID}
          initialPlayerField={playerField}
        />
      )}
    </section>
  );
}
