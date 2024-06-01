import { ErrorOutline } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";

export default function Error() {
  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "background.default" }}
    >
      <Paper sx={{ p: 1 }}>
        <Stack alignItems={"center"}>
          <ErrorOutline sx={{ fontSize: 40 }} />
          <Typography variant="h3">Something went wrong!</Typography>
          <Typography variant="h4">Please Try Again Later.</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
