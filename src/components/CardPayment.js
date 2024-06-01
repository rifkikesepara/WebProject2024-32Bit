import { CreditCard, Done } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CardPayment({
  open = false,
  onClose = () => {},
  onDone = () => {},
}) {
  const { t } = useTranslation();

  const [state, setState] = useState(0);
  const handleClick = () => {
    setState(1);
    setTimeout(() => {
      setState(2);
    }, 1500);
    setTimeout(() => {
      onClose();
      onDone();
    }, 2000);
    setTimeout(() => {
      setState(0);
    }, 2500);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: { height: "40vh", width: { md: "50%", sm: "50%", xs: "100%" } },
      }}
      onClose={onClose}
    >
      <Stack alignItems={"center"} justifyContent={"center"} height={"100%"}>
        {state == 0 ? (
          <>
            <IconButton onClick={handleClick} sx={{ fontSize: 100 }}>
              <CreditCard fontSize="inherit" />
            </IconButton>
            <Typography fontSize={20}>{t("paymentPending")}</Typography>
          </>
        ) : state == 1 ? (
          <CircularProgress />
        ) : (
          <>
            <Done sx={{ fontSize: 100 }} />
            <Typography fontSize={20}>{t("paymentSuccess")}</Typography>
          </>
        )}
      </Stack>
    </Dialog>
  );
}
