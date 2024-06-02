import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
  Tooltip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useRef, useState } from "react";
import VirtualKeyboard from "../../Components/VirtualKeyboard";
import CheckoutTable from "../../Components/CheckoutTable";
import { useAlert } from "../../Hooks/useAlert";
import { useTranslation } from "react-i18next";
import usePreferences from "../../Hooks/usePreferences";
import CardPayment from "./CardPayment";
import OfferBox from "../../Components/OfferBox";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToLocalStorage,
  SaveToSessionStorage,
} from "../../Utils/utilities";
import ShiftButton from "../../Components/Shift";
import useStore from "../../Hooks/useStore";

export default function Payment() {
  const { isDesktop } = usePreferences();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const storeInfo = useStore();

  const keyboard = useRef();
  const checkoutRef = useRef();

  const cashout = GetFromSessionStorage("cashout");
  const totalsObject = GetFromSessionStorage("totals");

  const [payment, setPayment] = useState({ cash: 0.0, card: 0.0, change: 0.0 });
  const [input, setInput] = useState("");
  const [showCardPayment, setShowCardPayment] = useState(false);

  //handles if the payment is by card or cash
  const handleClick = (e) => {
    const paymentAmount = parseFloat(input);

    switch (e.target.name) {
      case "card":
        //checks if the amount is bigger than the due
        if (paymentAmount <= due) {
          setShowCardPayment(true);
        } else {
          setAlert({
            text: t("tooMuchCredit"),
            type: "error",
          });
          setInput("");
          keyboard.current.setInput("");
        }
        break;
      case "cash":
        //checks if the amount is bigger than due and calculates the change
        if (paymentAmount <= due) {
          setPayment({
            ...payment,
            change: 0,
            cash: paymentAmount,
          });
        } else {
          setPayment({
            ...payment,
            cash: paymentAmount.toFixed(2),
            change: (
              paymentAmount -
              (totalsObject.total - payment.card)
            ).toFixed(2),
          });
        }
        setInput("");
        keyboard.current.setInput("");
        break;
    }
  };

  //pushes the receipt after finishing the payment
  const pushReceipt = () => {
    const receipts = GetFromLocalStorage("receipts");
    const currentReceipt = {
      id: receipts.length,
      date: new Date().toLocaleString(),
      products: cashout,
      payment: {
        ...payment,
        card: parseFloat(payment.card),
        change: parseFloat(payment.change),
        ...GetFromSessionStorage("totals"),
      },
    };
    receipts.push(currentReceipt);
    SaveToSessionStorage("currentReceipt", currentReceipt);
    SaveToLocalStorage("receipts", receipts);
  };

  //calculates the due whenever payment changes
  const due = useMemo(() => {
    return payment.change > 0
      ? 0
      : totalsObject.total -
          (parseFloat(payment.cash) + parseFloat(payment.card));
  }, [payment]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        overflow: "hidden",
        flexDirection: { sm: "row", md: "row", xs: "column" },
        justifyContent: isDesktop && "space-around",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: { md: "100%", sm: 600, xs: "100%" },
          minWidth: 400,
          maxWidth: 800,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          overflowY: "hidden",
          height: "100vh",
          backgroundColor: "background.default",
          zIndex: 2,
        }}
      >
        <Paper
          sx={{
            height: "8%",
            // borderBottom: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            borderRadius: 7,
            marginBlock: 1,
            zIndex: 100,
          }}
          elevation={2}
        >
          <Tooltip title="FİYAT GÖR" arrow>
            <IconButton
              sx={{
                ml: 1,
                overflow: "hidden",
                color: "text.primary",
              }}
            >
              <QrCodeScannerIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>

          <OfferBox />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{
                height: 50,
              }}
              onClick={() =>
                checkoutRef.current.scroll({
                  behavior: "smooth",
                  top: checkoutRef.current.scrollTop - 250,
                })
              }
            >
              <ArrowUpward />
            </IconButton>
            <IconButton
              sx={{
                height: 50,
              }}
              onClick={() =>
                checkoutRef.current.scroll({
                  behavior: "smooth",
                  top: checkoutRef.current.scrollTop + 250,
                })
              }
            >
              <ArrowDownward />
            </IconButton>
          </Box>
        </Paper>
        <Paper
          sx={{
            height: "87vh",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            borderRadius: 7,
          }}
          elevation={5}
        >
          <CheckoutTable
            disabled={true}
            ref={checkoutRef}
            data={cashout}
            accordionVisible={false}
          />
          <Accordion
            expanded
            onChange={(e, expanded) => {}}
            sx={{
              margin: 0,
              width: "100%",
              position: "sticky",
              bottom: 0,
            }}
            disableGutters
            square
            elevation={5}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {t("total")}: {totalsObject.total}₺
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("subTotal")}: {totalsObject.subTotal}₺
              </Typography>
              <Typography color={"text.discount"}>
                {t("discounts").toUpperCase()}: {totalsObject.discount}₺
              </Typography>
              <Typography color={"text.discount"}>
                {t("campaigns").toUpperCase()}: {totalsObject.payback}₺
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails sx={{ paddingBlock: 0 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {t("cash").toUpperCase()}: {payment.cash}₺
              </Typography>
            </AccordionDetails>
            <AccordionDetails sx={{ paddingBlock: 0 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {t("creditCard").toUpperCase()}: {payment.card}₺
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography sx={{ color: "text.discount", fontWeight: "bold" }}>
                {t("due").toUpperCase()}: {due.toFixed(2)}₺
              </Typography>
              {payment.change != 0 && (
                <Typography sx={{ color: "red", fontWeight: "bold" }}>
                  {t("change").toUpperCase()}: {payment.change}₺
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
      <Box
        sx={{
          width: { md: 650, sm: 600, xs: "100%" },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ marginBlock: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              focused
              autoFocus
              variant="standard"
              name="amount"
              autoComplete="off"
              label={t("enterAmountText")}
              value={input}
              sx={{
                height: "inherit",
                width: "90%",
                marginBottom: 1.5,
                marginLeft: 2,
              }}
              onChange={(e) => {
                setInput(e.target.value);
                keyboard.current.setInput(e.target.value);
              }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{
                height: 40,
                ml: 1,
              }}
              onClick={() => {
                setInput(due);
                keyboard.current.setInput(due.toString());
              }}
            >
              {t("due").toUpperCase()}
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              disabled={input == "" ? true : false}
              name="cash"
              variant="contained"
              disableElevation
              sx={{
                width: 160,
                height: 80,
              }}
              onClick={handleClick}
            >
              {t("cash")}
            </Button>
            <Button
              disabled={input == "" ? true : false}
              name="card"
              variant="contained"
              disableElevation
              sx={{
                width: 160,
                height: 80,
              }}
              onClick={handleClick}
            >
              {t("creditCard")}
            </Button>
            <CardPayment
              open={showCardPayment}
              onClose={() => setShowCardPayment(false)}
              onDone={() => {
                setPayment({
                  ...payment,
                  card: parseFloat(input).toFixed(2),
                });
                setInput("");
                keyboard.current.setInput("");
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <VirtualKeyboard
              ref={keyboard}
              layout="cashier"
              onChangeInput={(input) => {
                setInput(input);
              }}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                onClick={() => navigate("../sale")}
              >
                {t("goBack")}
              </Button>
              <Button
                disabled={due}
                variant="contained"
                disableElevation
                color="secondary"
                sx={{
                  height: 80,
                  fontSize: 20,
                }}
                onClick={() => {
                  SaveToSessionStorage("cashout", cashout);
                  SaveToSessionStorage("payment", payment);
                  pushReceipt();
                  navigate("./result");
                }}
              >
                {t("pay")}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.default",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: 50,
            zIndex: 1,
          }}
        >
          <Stack width={"100%"} justifyContent={"space-between"}>
            <Stack justifyContent={"space-between"} direction={"row"}>
              <Stack direction={"row"} alignItems={"center"}>
                <div
                  style={{
                    marginLeft: 10,
                    height: 15,
                    width: 15,
                    backgroundColor: storeInfo.online ? "green" : "red",
                    borderRadius: 200,
                    marginRight: 10,
                  }}
                ></div>
                <Typography color={"primary"}>{t("storeOnline")}</Typography>
              </Stack>
              <Typography marginRight={1} color={"primary"} fontWeight={"bold"}>
                {t("cashierID")}: {GetFromSessionStorage("employee").employeeID}
              </Typography>
            </Stack>
            <ShiftButton disabled={true} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
