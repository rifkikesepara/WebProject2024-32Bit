import { Button, Paper, Typography } from "@mui/material";
import usePreferences from "../Hooks/usePreferences";
import DialogWithButtons from "../Components/DialogWithButtons";
import { useState } from "react";
import { GetFromLocalStorage } from "../Utils/utilities";
import { Receipt } from "../Components/Receipt";

export default function Test() {
  const { theme } = usePreferences();
  const [show, setShow] = useState(false);

  const testData = GetFromLocalStorage("receipts")[3];
  return (
    <>
      <Button variant="contained" onClick={() => setShow(true)}>
        Show
      </Button>
      <DialogWithButtons
        sx={{
          width: { md: "50%", xs: "100%" },
          maxWidth: 200,
          height: "70%",
          borderTopLeftRadius: 7,
          borderBottomLeftRadius: 7,
        }}
        open={show}
        onClose={() => setShow(false)}
        startAdornment={
          <Paper
            sx={{
              // width: { md: "50%", xs: "100%" },
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          >
            <Receipt payment={testData.payment} cashout={testData.cashout} />
          </Paper>
        }
      >
        <Typography>deneme</Typography>
        <Typography>deneme</Typography>
        <Typography>deneme</Typography>
      </DialogWithButtons>
    </>
  );
}
