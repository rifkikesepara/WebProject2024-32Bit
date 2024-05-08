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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import LOG from "../Debug/Console";
import CheckoutTable from "../Components/CheckoutTable";

export default function Payment() {
  const navigate = useNavigate();
  const mainDiv = useRef();
  const keyboard = useRef();

  const [selectedItems, setSelectedItems] = useState([]);
  const [payment, setPayment] = useState({ cash: 0, card: 0 });
  const [inputFields, setInputFields] = useState({});
  const [selectedInputField, setSelectedInputField] = useState("");
  const [cashout, setCashout] = useState(
    JSON.parse(sessionStorage.getItem("cashout"))
  );
  const [testID, setID] = useState();

  const deleteSelected = () => {
    LOG("deletedSelected", "yellow");
    let array = cashout;
    selectedItems.map((data) => {
      let index = array.indexOf(cashout.find(({ id }) => id == data));
      array.splice(index, 1);
    });
    setCashout(array);
    setSelectedItems([]);
  };

  const changeProductAmount = (amount, id) => {
    let newArray = cashout.map((a) => {
      var returnValue = { ...a };
      if (a.id == id && amount != 0) {
        let unitPrice =
          cashout.find(({ id }) => a.id == id).price /
          cashout.find(({ id }) => a.id == id).count;
        console.log("Unit Price: " + unitPrice);
        returnValue = {
          ...returnValue,
          price: unitPrice * amount,
          count: amount,
        };
      }

      return returnValue;
    });
    setCashout(newArray);
  };

  const handleClick = (e) => {
    let paymentAmount = parseFloat(inputFields.amount);
    setInputFields({ ...inputFields, amount: "" });
    keyboard.current.setInput("");
    switch (e.target.name) {
      case "card":
        if (paymentAmount <= total) {
          setPayment({ ...payment, card: paymentAmount });
        }
        break;
      case "cash":
        if (paymentAmount <= total) {
          setPayment({ ...payment, cash: paymentAmount });
        }
        break;
    }
  };

  const total = useMemo(() => {
    LOG("total calculated!", "yellow");
    let total = 0;
    cashout.map(({ price }) => (total = total + price));
    return total / 100;
  }, [cashout, cashout.length]);
  let due = total - (payment.cash + payment.card);

  useEffect(() => {
    keyboard.current.setInput(inputFields[selectedInputField]);
  }, [selectedInputField]);

  useEffect(() => {
    mainDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [cashout.length]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        overflow: "hidden",
        flexDirection: { sm: "row", md: "row", xs: "column" },
      }}
    >
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "hidden",
          height: "100vh",
          backgroundColor: "#e7ecf1",
          zIndex: 2,
        }}
      >
        <Paper
          sx={{
            height: "8%",
            // borderBottom: 1,
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            borderRadius: 7,
            marginBlock: 1,
            zIndex: 100,
          }}
          elevation={2}
        >
          <IconButton sx={{ ml: 1, color: "black" }}>
            <QrCodeScannerIcon sx={{ fontSize: 40 }} />
            <motion.div
              style={{ display: "flex", alignItems: "center" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  color: "black",
                  padding: 0.5,
                  width: 100,
                  fontWeight: "bold",
                }}
              >
                FİYAT GÖR
              </Typography>
            </motion.div>
          </IconButton>
          <IconButton
            onClick={deleteSelected}
            disabled={selectedItems.length == 0 ? true : false}
            aria-label="delete"
            sx={{ fontSize: 40, marginRight: 2, color: "black" }}
            color="black"
          >
            <DeleteIcon fontSize="inherit" color="inherit" />
          </IconButton>
        </Paper>
        <Paper
          sx={{
            height: "87vh",
            width: "95%",
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
            data={cashout}
            inputValues={inputFields}
            onFocus={(e, { id }) => {
              setSelectedInputField(e.target.name);
              setID(id);
            }}
            selectionValues={selectedItems}
            onChange={(newformats) => setSelectedItems(newformats)}
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
              <Typography>Toplam: {total}₺</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Ara Toplam: {total}₺</Typography>
            </AccordionDetails>
            <AccordionDetails sx={{ paddingBlock: 0 }}>
              <Typography sx={{ color: "green", fontWeight: "bold" }}>
                NAKİT: {payment.cash}₺
              </Typography>
            </AccordionDetails>
            <AccordionDetails sx={{ paddingBlock: 0 }}>
              <Typography sx={{ color: "blue", fontWeight: "bold" }}>
                KREDİ KARTI: {payment.card}₺
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionDetails>
              <Typography sx={{ color: "red", fontWeight: "bold" }}>
                KALAN: {total - (payment.cash + payment.card)}₺
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#e7ecf1",
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
              label="Tutar Giriniz"
              onFocus={(e) => setSelectedInputField(e.target.name)}
              value={inputFields.amount}
              sx={{
                height: "inherit",
                width: "90%",
                marginBottom: 1.5,
                marginLeft: 2,
              }}
              onChange={(e) => {
                setInputFields({
                  ...inputFields,
                  [selectedInputField]: e.target.value,
                });
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
                setInputFields({ ...inputFields, amount: due });
              }}
            >
              KALAN
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
              name="cash"
              variant="contained"
              disableElevation
              sx={{
                width: 160,
                height: 80,
                background: "green",
              }}
              onClick={handleClick}
            >
              NAKİT
            </Button>
            <Button
              name="card"
              variant="contained"
              disableElevation
              sx={{
                width: 160,
                height: 80,
                background: "blue",
              }}
              onClick={handleClick}
            >
              KREDİ KARTI
            </Button>
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
                if (selectedInputField != "") {
                  setInputFields({
                    ...inputFields,
                    [selectedInputField]: input,
                  });
                  if (selectedInputField != "amount")
                    changeProductAmount(input, testID);
                }
              }}
              onDone={() => {
                setSelectedInputField("");
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
                Geri Dön
              </Button>
              <Button
                disabled={due != 0}
                variant="contained"
                disableElevation
                color="secondary"
                sx={{
                  height: 80,
                  fontSize: 20,
                }}
                onClick={() => {
                  sessionStorage.setItem("payment", JSON.stringify(payment));
                  navigate("./result");
                }}
              >
                ÖDEME YAP
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#e7ecf1",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: 50,
            zIndex: 1,
          }}
        >
          <div
            style={{
              marginLeft: 10,
              height: 15,
              width: 15,
              backgroundColor: "green",
              // boxShadow: "0px 0px 8px 0.5px green",
              borderRadius: 200,
              marginRight: 10,
            }}
          ></div>
          <Typography>Mağaza Çevrimiçi</Typography>
        </Box>
      </Box>
    </Box>
  );
}
