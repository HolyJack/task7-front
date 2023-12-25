import { useEffect, useState } from "react";
import EnterName from "./components/EnterName";
import ChooseGame from "./components/ChooseGame";
import StartGame from "./components/StartGame";
import { socket } from "./utils/socket-io/socket-io";

export type Game = "tic-tac-toe" | "battleships";

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [game, setGame] = useState<Game | undefined>();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div
      className="flex h-screen w-screen flex-col bg-gray-600 font-mono
      text-green-300"
    >
      <header className="flex h-16 w-full items-center bg-gray-800 shadow">
        <h1 className="mx-auto items-center text-2xl font-semibold">
          Welcome, to Task7 Gaming Portal!
        </h1>
      </header>
      <main className="h-fit w-full overflow-scroll">
        <div className="flexflex-col container mx-auto gap-10 transition-transform ">
          {!username && (
            <div className="mx-auto flex h-full flex-col pt-10">
              <EnterName setUsername={setUsername} />
            </div>
          )}
          {username && !game && (
            <ChooseGame username={username} setGame={setGame} />
          )}
          {username && game && isConnected && <StartGame game={game} />}
          {username && game && (
            <button
              className="mx-auto h-20 w-full rounded  border bg-gray-800 text-xl font-semibold"
              onClick={() => {
                setGame(undefined);
                socket.emit("exit game");
              }}
            >
              Back to Game selection
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
