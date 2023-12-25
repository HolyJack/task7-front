const sprites = ["🌊", "🚢", "🔥", "❌", "🌫️"];

export default function PlayerField({
  playerField,
  onClick,
}: {
  playerField: number[];
  onClick: (i: number) => void;
}) {
  return (
    <div
      className="grid-rows-10 grid aspect-square w-96 grid-flow-row
      grid-cols-10 gap-1 bg-gray-800 p-1 hover:shadow-white"
    >
      {playerField.map((val, i) => (
        <div
          key={i}
          className="aspect-square cursor-pointer overflow-hidden rounded
          bg-white text-4xl hover:border hover:border-green-400"
          onClick={() => onClick(i)}
        >
          {sprites[val]}
        </div>
      ))}
    </div>
  );
}
