import Grid from "./Grid";

const defaultValues = [
  "O",
  undefined,
  undefined,
  undefined,
  "X",
  "O",
  undefined,
  undefined,
  "X",
];

export default function TicTacToeGrid({ values }: { values?: Array<string> }) {
  return (
    <Grid
      size={3}
      bgcolor="bg-yellow-300"
      textSize="text-[8vh]"
      values={values ? values : defaultValues}
    />
  );
}
