export default function Cell({
  bgcolor,
  value,
  textSize,
  onClick,
}: {
  bgcolor: string;
  value?: string;
  textSize?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-md text-white text-center font-bold hover:bg-white ${textSize} ${bgcolor}`}
    >
      {value}
    </div>
  );
}
