import Grid from "./Grid";

const defaultValues = Array(10 * 10).fill("🌊");

defaultValues[21] = "🚢";
defaultValues[22] = "🚢";
defaultValues[23] = "🚢";
defaultValues[24] = "🚢";
defaultValues[25] = "🚢";

defaultValues[17] = "🚢";
defaultValues[27] = "🚢";
defaultValues[37] = "🚢";
defaultValues[47] = "🚢";

defaultValues[96] = "🚢";
defaultValues[97] = "🚢";
defaultValues[98] = "🚢";
defaultValues[99] = "🚢";

defaultValues[41] = "🚢";
defaultValues[51] = "🚢";
defaultValues[61] = "🚢";

defaultValues[43] = "🚢";
defaultValues[53] = "🚢";
defaultValues[63] = "🚢";

defaultValues[45] = "🚢";
defaultValues[55] = "🚢";
defaultValues[65] = "🚢";

defaultValues[0] = "🚢";
defaultValues[1] = "🚢";

defaultValues[9] = "🚢";
defaultValues[19] = "🚢";

defaultValues[83] = "🚢";
defaultValues[84] = "🚢";

defaultValues[90] = "🚢";
defaultValues[91] = "🚢";

export default function BattleshipsGrid({
  values,
}: {
  values?: Array<string | undefined>;
}) {
  return (
    <Grid
      size={10}
      bgcolor="bg-white"
      textSize="text-3xl"
      values={values ? values : defaultValues}
    />
  );
}
