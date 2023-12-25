export default function Cell({
  bgcolor,
  value,
  textSize,
}: {
  bgcolor: string;
  value?: string;
  textSize?: string;
}) {
  return (
    <div
      className={`rounded-md text-white text-center font-bold hover:bg-white ${textSize} ${bgcolor}`}
    >
      {value}
    </div>
  );
}
