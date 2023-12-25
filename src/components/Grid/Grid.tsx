import Cell from "./Cell";

("grid-rows-3");
("grid-cols-3");

("grid-rows-10");
("grid-cols-10");

export default function Grid({
  size,
  values,
  textSize,
  bgcolor,
}: {
  size: number;
  textSize?: string;
  values?: Array<string | undefined>;
  bgcolor: string;
}) {
  return (
    <section
      className={`grid grid-flow-col grid-cols-${size} grid-rows-${size} gap-2 p-2 w-full aspect-square bg-gray-800`}
    >
      {Array(size * size)
        .fill(undefined)
        .map((_, i) => (
          <Cell
            key={i}
            bgcolor={bgcolor}
            textSize={textSize}
            value={
              values && values.length === size * size ? values[i] : undefined
            }
          />
        ))}
    </section>
  );
}
