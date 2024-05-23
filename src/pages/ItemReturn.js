import { Box, Button, Dialog, Paper, Stack, Typography } from "@mui/material";
import usePreferences from "../Hooks/usePreferences";
import Products from "../Components/Products";
import TextFieldVK from "../Components/TextFieldVK";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GetFromLocalStorage } from "../Utils/utilities";
import { Receipt } from "../Components/Receipt";

const ReceiptBox = ({ data }) => {
  const { theme } = usePreferences();
  const [showReceipt, setShowReceipt] = useState(false);
  return (
    <Paper
      sx={{
        width: 300,
        backgroundColor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Stack spacing={1}>
        <Typography>Fatura Kodu: {data.id}</Typography>
        <Typography>Toplam Tutar: {data.payment.cash}</Typography>
        <Typography>Tarih: {data.payment.date}</Typography>
        <Button variant="contained" onClick={() => setShowReceipt(true)}>
          Göster
        </Button>
        <Button color="secondary" variant="contained">
          Seç
        </Button>
      </Stack>
      <Dialog
        scroll="body"
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
      >
        <Receipt payment={data.payment} cashout={data.products} />
      </Dialog>
    </Paper>
  );
};

const ReceiptsDialog = ({ open, onClose = () => {} }) => {
  const receipts = GetFromLocalStorage("receipts");

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      PaperProps={{ sx: { width: "50%", height: "70%" } }}
      onClose={onClose}
    >
      <Stack
        sx={{
          overflowY: "scroll",
          paddingBlock: 1,
        }}
        alignItems={"center"}
        width={"100%"}
        spacing={3}
      >
        {receipts.map((receipt) => {
          console.log(receipt);
          return <ReceiptBox key={receipt.id} data={receipt} />;
        })}
      </Stack>
    </Dialog>
  );
};

export default function ItemReturn() {
  const { theme } = usePreferences();
  const navigate = useNavigate();

  const [showReceipts, setShowReceipts] = useState(false);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack spacing={3}>
        <Button variant="contained" onClick={() => setShowReceipts(true)}>
          Son Satışlar
        </Button>
        <TextFieldVK placeholder="Fatura Kodunu Giriniz" />
        <Button color="secondary" variant="contained">
          Giriş
        </Button>
        <Button variant="contained" onClick={() => navigate("../home")}>
          Geri Dön
        </Button>
      </Stack>
      <ReceiptsDialog
        open={showReceipts}
        onClose={() => setShowReceipts(false)}
      />
    </Stack>
  );
}
