export default function EnemyField() {
  return (
    <div className="grid-rows-10 grid aspect-square w-96 grid-flow-row grid-cols-10 gap-1 bg-gray-800 p-1 hover:shadow-white">
      {Array(10 * 10)
        .fill("🌊")
        .map((val, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded bg-white text-4xl"
          >
            {val}
          </div>
        ))}
    </div>
  );
}
