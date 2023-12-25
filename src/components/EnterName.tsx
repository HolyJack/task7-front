import { useState } from "react";

export default function EnterName({
  setUsername,
}: {
  setUsername: (enteredName: string) => void;
}) {
  const [enteredUsername, setEnteredUsername] = useState("");

  return (
    <section
      className="flex w-fit  flex-col items-center gap-5
              rounded-md border bg-gray-800 p-10 shadow"
    >
      <h2 className="font-semibold">Please Enter your beatiful nickname!</h2>
      <input
        className="w-full rounded px-1.5 py-0.5 text-black"
        placeholder="DO IT! 🔪 OR ELSE! 💀"
        value={enteredUsername}
        onChange={(e) => setEnteredUsername(e.target.value)}
      />
      <button
        className="h-8 w-full rounded border bg-green-300 text-gray-800
              hover:bg-white"
        onClick={() => {
          setUsername(enteredUsername);
          sessionStorage.setItem("username", enteredUsername);
        }}
      >
        OK...
      </button>
    </section>
  );
}
