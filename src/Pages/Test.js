import ZReport from "../Components/ZReport";
import { Paper, Stack } from "@mui/material";
import { getCollapsedReceiptsByDate } from "../Utils/receipts";

export default function Test() {
  const zReportsData = getCollapsedReceiptsByDate()[2];
  console.log(zReportsData);
  return (
    <Stack
      minHeight={"100vh"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "background.default" }}
    >
      <Paper>
        <ZReport data={zReportsData} />
      </Paper>
    </Stack>
  );
}
