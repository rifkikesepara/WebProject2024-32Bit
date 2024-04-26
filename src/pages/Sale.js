import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import Products from "../Components/Products";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import LOG from "../Debug/Console";
import CheckoutTable from "../Components/CheckoutTable";
import { useTranslation } from "react-i18next";

export default function Sale() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mainDiv = useRef();
  let keyboard = useRef();

  const [selectedItems, setSelectedItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [selectedInputField, setSelectedInputField] = useState("");
  const [cashout, setCashout] = useState(
    JSON.parse(localStorage.getItem("cashout"))
  );
  const [productAmount, setProductAmount] = useState(0);
  const [selectListOpen, setSelectListOpen] = useState(false);
  const [testID, setID] = useState();

  const addProductToCashout = ({ attributes, id, price, images }) => {
    if (!cashout.find((data) => data.name == attributes.name)) {
      setCashout([
        ...cashout,
        {
          id: id,
          name: attributes.name,
          price: price.normal,
          images: images,
          count: 1,
        },
      ]);
    } else {
      let newArray = cashout.map((a) => {
        var returnValue = { ...a };
        if (a.name == attributes.name) {
          returnValue = {
            ...returnValue,
            price: a.price + a.price,
            count: a.count + 1,
          };
        }

        return returnValue;
      });
      setCashout(newArray);
    }
  };

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
      if (a.id == id) {
        returnValue = {
          ...returnValue,
          price:
            productsData.find(({ id }) => a.id == id).price.normal * amount,
          count: amount,
        };
      }

      return returnValue;
    });
    setCashout(newArray);
  };

  const total = useMemo(() => {
    LOG("total calculated!", "yellow");
    let total = 0;
    cashout.map(({ price }) => (total = total + price));
    return total / 100;
  }, [cashout, cashout.length]);

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
                  fontWeight: "bold",
                }}
              >
                {t("checkPrice").toUpperCase()}
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
                {t("total")}: {total}₺
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("subTotal")}: {total}₺
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
          <TextField
            autoFocus
            focused
            variant="standard"
            name="barcode"
            autoComplete="off"
            label={t("enterBarcodeText")}
            onFocus={(e) => setSelectedInputField(e.target.name)}
            value={inputFields.barcode}
            sx={{
              width: "90%",
              marginBottom: 1.5,
              marginLeft: 2,
            }}
            onChange={(e) => {
              setInputFields({
                ...inputFields,
                [selectedInputField]: e.target.value,
              });
            }}
          />

          <Dialog
            maxWidth="xl"
            open={selectListOpen}
            onClose={() => {
              setSelectListOpen(false);
              closeSnackbar();
            }}
            PaperProps={{ sx: { borderRadius: 7 } }}
          >
            <Box
              width={"100%"}
              height={"100vh"}
              overflow={"hidden"}
              position={"relative"}
            >
              <IconButton
                sx={{
                  marginLeft: "auto",
                  position: "absolute",
                  right: 10,
                  zIndex: 11,
                }}
                onClick={() => {
                  setSelectListOpen(false);
                  closeSnackbar();
                }}
              >
                <CloseIcon />
              </IconButton>
              <Products
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  paddingBottom: 20,
                  marginBottom: "auto",
                  height: "100%",
                }}
                onSelectProduct={(data) => {
                  addProductToCashout(data);
                  console.log(cashout);
                }}
                onProducts={(data) => setProductsData(data)}
                onCount={(amount) => setProductAmount(amount)}
              />
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                boxShadow: "10px 20px 50px 70px white",
                zIndex: 100,
              }}
            >
              {t("productAmount")}: {productAmount}
            </Typography>
          </Dialog>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{ width: "80%", height: 60 }}
              size="large"
              startIcon={<LocalGroceryStoreIcon />}
              onClick={() => setSelectListOpen(true)}
            >
              {t("addProductText")}
            </Button>
            <VirtualKeyboard
              keyboardRef={keyboard}
              layout="cashier"
              onChangeInput={(input) => {
                if (selectedInputField != "") {
                  setInputFields({
                    ...inputFields,
                    [selectedInputField]: input,
                  });
                  if (selectedInputField != "barcode")
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
                onClick={() => navigate("../home")}
              >
                {t("goBack")}
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="secondary"
                sx={{
                  height: 80,
                  fontSize: 20,
                }}
                onClick={() => {
                  localStorage.setItem("cashout", JSON.stringify(cashout));
                  navigate("./payment");
                }}
              >
                {t("goPayment")}
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
          <Typography>{t("storeOnline")}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
