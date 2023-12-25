import { Game } from "../App";
import BattleshipsGrid from "./Grid/BattleshipsGrid";
import TicTacToeGrid from "./Grid/TicTacToeGrid";

export default function ChooseGame({
  username,
  setGame,
}: {
  username: string;
  setGame: (game?: Game) => void;
}) {
  return (
    <section className="flex flex-col overflow-scroll pt-10">
      <h2
        className="mx-auto w-fit rounded border bg-gray-800 p-5 text-xl
              font-bold"
      >
        Ok,{" "}
        <span className="group relative text-white">
          {username}
          <div
            className="absolute left-full top-full mx-1.5 w-44
                      scale-0 rounded-r-lg rounded-bl-lg border bg-white p-3
                      text-base text-black transition-transform group-hover:scale-100"
          >
            Yeap, What a boring nickname!
          </div>
        </span>
        , now choose a game! Yes Yes!!! 🪤 🐀
      </h2>
      <div className="flex flex-1 flex-col items-center  lg:flex-row">
        <div className="flex-1 p-10">
          <div
            className="group flex flex-col items-center gap-5
                  transition-transform hover:scale-110"
            onClick={() => setGame("tic-tac-toe")}
          >
            <h3 className="text-2xl font-bold text-yellow-300">
              Amazing Tic-Tac-Toe!{" "}
              <span className="font-semibold text-white">X O X</span>
            </h3>
            <div
              className="rouned aspect-square w-96 bg-white shadow-md
                    group-hover:shadow-2xl group-hover:shadow-yellow-300 "
            >
              <TicTacToeGrid />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="group relative text-4xl font-bold">
            OR
            <div
              className="absolute bottom-full left-full mx-1.5 scale-0
                      rounded-r-lg rounded-tl-lg bg-white p-3 text-base text-black
                      transition-transform group-hover:scale-100"
            >
              What?
            </div>
          </div>
        </div>
        <div className="flex-1 p-10">
          <div
            className="group flex flex-col items-center gap-5
                  transition-transform hover:scale-110"
            onClick={() => setGame("battleships")}
          >
            <h3 className="text-2xl font-bold text-purple-400">
              Spicy Battleships! 🚢 🚀 🔥
            </h3>
            <div
              className="rouned aspect-square w-96 bg-purple-400
                    shadow-md group-hover:shadow-2xl group-hover:shadow-purple-400"
            >
              <BattleshipsGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
