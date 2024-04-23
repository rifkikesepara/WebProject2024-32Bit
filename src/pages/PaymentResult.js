import { Box, Typography, Paper, Divider, Button, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import LOG from "../Debug/Console";
import CheckoutTable from "../Components/CheckoutTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Receipt from "../Components/Receipt";

export default function PaymentResult() {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const payment = JSON.parse(localStorage.getItem("payment"));
  const cashout = JSON.parse(localStorage.getItem("cashout"));

  const total = useMemo(() => {
    LOG("total calculated!", "yellow");
    let total = 0;
    cashout.map(({ price }) => (total = total + price));
    return total / 100;
  }, [cashout, cashout.length]);
  let due = total - (payment.cash + payment.card);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#e7ecf1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "65%",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            mb: 3,
            width: "100%",
            borderRadius: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: 1,
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 80 }} />
          <Typography variant="h3">Ödeme Başarılı</Typography>
        </Paper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              height: "50vh",
              width: "70%",
              // overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: "white",
              overflow: "hidden",
              // borderTopLeftRadius: 10,
              // borderTopRightRadius: 10,
              borderRadius: 7,
            }}
            elevation={5}
          >
            <CheckoutTable
              disabled={true}
              data={cashout}
              selectionValues={selectedItems}
              onChange={(newformats) => setSelectedItems(newformats)}
            />
          </Paper>
          <Paper
            sx={{
              ml: 5,
              width: "30%",
              height: "50vh",
              borderRadius: 7,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBlock: 1,
            }}
            elevation={5}
          >
            <Typography fontWeight={"bold"} sx={{ fontSize: 28 }}>
              TOPLAM: {total}₺
            </Typography>
            <Divider sx={{ borderWidth: 2, width: "60%" }} />
            <Typography sx={{ fontSize: 20 }}>
              NAKİT: {payment.cash}₺
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              KREDİ KARTI: {payment.card}₺{" "}
            </Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "10vh",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: 200, height: 80 }}
            onClick={() => setShowReceipt(true)}
          >
            Belgeyi Göster
          </Button>
          <Button variant="contained" sx={{ width: 200, height: 80 }}>
            Belgeyi Yazdır
          </Button>
        </Box>
      </Box>
      <Dialog
        maxWidth="xl"
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
      >
        <Box overflowX={"hidden"}>
          <Receipt />
        </Box>
      </Dialog>
    </Box>
  );
}
