import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Battleship } from "../BattleshipsGame";
import PlayerField from "./PlayerField";
import { socket } from "../../../utils/socket-io/socket-io";

const battleships: Battleship[] = [
  { name: "Carrier", size: 5, amount: 1 },
  { name: "Battleship", size: 4, amount: 2 },
  { name: "Cruiser", size: 3, amount: 3 },
  { name: "Destroyer", size: 2, amount: 4 },
];

export default function Preparation({
  gameID,
  player,
  playerField,
  setPlayerField,
  setGameReady,
}: {
  gameID: string;
  player: number;
  playerField: number[];
  setPlayerField: Dispatch<SetStateAction<number[]>>;
  setGameReady: () => void;
}) {
  const [unplacedShips, setUnplacedShips] = useState<Battleship[]>(battleships);
  const [rotation, setRotation] = useState<0 | 1>(0);
  const [shipIndex, setShipIndex] = useState<number>(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [enemyReady, setEnemyReady] = useState(false);
  if (playerReady && enemyReady) setGameReady();

  useEffect(() => {
    function onPlayerReady(readyPlayer: number) {
      if (readyPlayer === player) setPlayerReady(true);
      else setEnemyReady(true);
    }
    socket.on("player ready", onPlayerReady);
    return () => {
      socket.on("player ready", onPlayerReady);
    };
  }, [setGameReady, player]);

  function placeShip(i: number) {
    let step = 1;
    if (rotation) step = 10;
    const ship = unplacedShips[shipIndex];

    function validatePosition() {
      if (i + step * (ship.size - 1) > 99) return false;
      if (
        step === 1 &&
        Math.floor(i / 10) != Math.floor((i + (ship.size - 1)) / 10)
      )
        return false;

      for (let j = 0; j < ship.size; j++) {
        if (playerField[i + j * step] === 1) return false;
      }
      return true;
    }

    if (!validatePosition()) return;

    setPlayerField((prev: number[]) => {
      const newArr = [...prev];
      for (let j = 0; j < ship.size; j++) {
        newArr[i + j * step] = 1;
      }
      return newArr;
    });
    setUnplacedShips((prev) => {
      const newVal = { ...prev[shipIndex] };
      newVal.amount -= 1;
      if (newVal.amount > 0)
        return [
          ...prev.slice(0, shipIndex),
          newVal,
          ...prev.slice(shipIndex + 1),
        ];
      return prev.filter((_, i) => i !== shipIndex);
    });
  }
  return (
    <>
      <div className="flex flex-col items-center overflow-hidden rounded border bg-gray-800">
        <PlayerField playerField={playerField} onClick={placeShip} />
        <h3 className="w-full bg-gray-800 text-center">Your Field</h3>
      </div>
      <div className="flex aspect-square w-96 flex-col justify-between rounded border bg-gray-800 p-5">
        {playerReady && (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p>Waiting for another player!</p>
          </div>
        )}
        {!playerReady && (
          <>
            <div className="flex flex-col gap-5">
              <h2 className="text-center text-xl font-semibold">
                Position planner
              </h2>
              <div className="flex flex-col">
                <label>Rotation: </label>
                <div className="flex">
                  <button
                    className={`flex-1 rounded-l border-l border-t border-b ${
                      rotation === 1 ? "bg-white" : undefined
                    }`}
                    onClick={() => setRotation(1)}
                  >
                    Vertical
                  </button>
                  <button
                    className={`flex-1 rounded-r border-r border-t border-b ${
                      rotation === 0 ? "bg-white" : undefined
                    }`}
                    onClick={() => setRotation(0)}
                  >
                    Horizontal
                  </button>
                </div>
              </div>
              <ul className="flex flex-col gap-1">
                {unplacedShips.map((ship, i) => {
                  if (!ship) return;
                  return (
                    <li
                      className={`flex justify-between hover:bg-white hover:text-black p-1 cursor-pointer rounded ${
                        i === shipIndex ? "bg-white text-black" : ""
                      }`}
                      key={ship.name}
                      onClick={() => setShipIndex(i)}
                    >
                      <div>{ship.name + ":"}</div>{" "}
                      <div>{`${"🚢".repeat(ship.size)} x ${ship.amount}`}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mx-auto p-2">
              <button
                className="h-10 w-48 rounded border  bg-green-300 text-black hover:bg-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-100"
                disabled={unplacedShips.length > 0}
                onClick={() => {
                  socket.emit("player ready", gameID, playerField);
                }}
              >
                Apply
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
