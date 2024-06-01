import { Box, Typography, Paper, Divider, Button, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import LOG from "../../Debug/Console";
import CheckoutTable from "../../Components/CheckoutTable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Receipt } from "../../Components/Receipt";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

export default function PaymentResult() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef();

  const payment = JSON.parse(sessionStorage.getItem("payment"));
  const cashout = JSON.parse(sessionStorage.getItem("cashout"));

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const total = useMemo(() => {
    console.log(receiptRef);
    LOG("total calculated!", "yellow");
    let total = 0;
    cashout.map(({ price }) => (total = total + price.cashout));
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
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80vw",
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
          <Typography variant="h3" textAlign={"center"}>
            {t("paymentSuccess")}
          </Typography>
        </Paper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { md: "row", sm: "row", xs: "column" },
          }}
        >
          <Paper
            sx={{
              height: "50vh",
              width: { md: "70%", sm: "62%", xs: "100%" },
              display: { md: "flex", sm: "flex", xs: "none" },
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              borderRadius: 7,
            }}
            elevation={5}
          >
            <CheckoutTable
              sx={{ padding: 0 }}
              disabled={true}
              data={cashout}
              selectionValues={selectedItems}
              onChange={(newformats) => setSelectedItems(newformats)}
            />
          </Paper>
          <Paper
            sx={{
              ml: { md: 5, sm: 2 },
              width: { md: "30%", sm: "35%", xs: "100%" },
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
            <Typography
              textAlign={"center"}
              fontWeight={"bold"}
              sx={{ fontSize: 28 }}
            >
              {t("total").toUpperCase()}: <br />
              {total}₺
            </Typography>
            <Divider sx={{ borderWidth: 2, width: "70%" }} />
            <Typography sx={{ fontSize: 20 }}>
              {t("cash").toUpperCase()}: {payment.cash}₺
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              {t("creditCard").toUpperCase()}: {payment.card}₺
            </Typography>
            <Typography sx={{ fontSize: 20 }}>
              {t("change").toUpperCase()}: {payment.change}₺
            </Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            // height: "10vh",
            paddingBlock: 3,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: { md: 200, sm: 200, xs: 120 },
              height: 80,
              borderRadius: 7,
            }}
            onClick={() => {
              sessionStorage.setItem("cashout", JSON.stringify([]));
              sessionStorage.setItem("payment", JSON.stringify({}));
              navigate("../sale");
            }}
          >
            {t("newSale")}
          </Button>
          <Button
            variant="contained"
            sx={{
              width: { md: 200, sm: 200, xs: 120 },
              height: 80,
              borderRadius: 7,
            }}
            onClick={() => {
              console.log(receiptRef);
              setShowReceipt(true);
            }}
          >
            {t("showReceipt")}
          </Button>
          <Button
            variant="contained"
            sx={{
              width: { md: 200, sm: 200, xs: 120 },
              height: 80,
              borderRadius: 7,
            }}
            onClick={handlePrint}
          >
            {t("printReceipt")}
          </Button>
        </Box>
      </Box>
      <Box sx={{ overflow: "hidden", height: 0 }}>
        <Receipt ref={receiptRef} />
      </Box>
      <Dialog
        maxWidth="xl"
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        scroll="body"
      >
        <Box>
          <Receipt />
        </Box>
      </Dialog>
    </Box>
  );
}
