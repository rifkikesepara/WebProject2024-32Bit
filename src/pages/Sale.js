import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import Products from "../Components/Products";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import LOG from "../Debug/Console";

export default function Sale() {
  const navigate = useNavigate();
  const mainDiv = useRef();
  let keyboard = useRef();

  const [selectedItems, setSelectedItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [selectedInputField, setSelectedInputField] = useState("");
  const [cashout, setCashout] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [selectListOpen, setSelectListOpen] = useState(false);

  const addProductToCashout = ({ attributes, id, price, images }) => {
    if (!cashout.find((data) => data.name == attributes.name)) {
      setCashout([
        ...cashout,
        {
          id: id,
          name: attributes.name,
          price: price.normal,
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

  const changeProductAmount = (increment, id) => {
    let newArray = cashout.map((a) => {
      var returnValue = { ...a };
      if (a.id == id) {
        returnValue = {
          ...returnValue,
          price: increment
            ? a.price + productsData.find(({ id }) => a.id == id).price.normal
            : a.price - productsData.find(({ id }) => a.id == id).price.normal,
          count: increment ? a.count + 1 : a.count - 1,
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
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, marginTop: 1, zIndex: 100 }}
            disableRipple
            onClick={() => navigate("../home")}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 35, marginRight: 2 }} />
          </IconButton>
          <TextField
            name="barcode"
            autoComplete="off"
            placeholder="Klaveden Barkod Girişi"
            onFocus={(e) => setSelectedInputField(e.target.name)}
            value={inputFields.barcode}
            sx={{ width: "90%", marginTop: 1.5, marginLeft: 2 }}
          />
        </Box>
        <Box width={"100%"} height={"100%"} marginBottom={"auto"}>
          <Products
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingBottom: 5,
              marginBottom: "auto",
              height: "100%",
            }}
            onSelectProduct={(data) => addProductToCashout(data)}
            onProducts={(data) => setProductsData(data)}
            onCount={(amount) => setProductAmount(amount)}
          />
        </Box>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 1,
            borderTop: 1,
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
          <Typography marginLeft={"auto"}>
            Product Amount: {productAmount}
          </Typography>
        </Box> */}
        <Box
          sx={{
            height: "8%",
            borderBottom: 1,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton
            sx={{
              borderRadius: 5,
            }}
          >
            <QrCodeScannerIcon
              sx={{ fontSize: 40, color: "black", border: 1 }}
            />
            <motion.div
              style={{ display: "flex", alignItems: "center" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  border: 1,
                  borderLeft: 0,
                  color: "black",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  padding: 0.5,
                  width: 100,
                }}
              >
                FİYAT GÖR
              </Typography>
            </motion.div>
          </IconButton>
          <IconButton onClick={deleteSelected}>
            <DeleteForeverIcon sx={{ fontSize: 40, color: "black" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            borderBottom: 1,
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ToggleButtonGroup
            value={selectedItems}
            onChange={(e, newformats) => setSelectedItems(newformats)}
            orientation="vertical"
            sx={{ width: "100%" }}
          >
            {cashout.map((data, index) => {
              return (
                <Box
                  key={index}
                  ref={mainDiv}
                  sx={{
                    display: "flex",
                    width: "100%",
                    minHeight: 80,
                    paddingInline: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ padding: 0, minWidth: 30, height: "80%" }}
                      onClick={() => changeProductAmount(false, data.id)}
                    >
                      -
                    </Button>
                    {/* <TextField
                      name={data.name}
                      value={inputFields[data.name]}
                      onFocus={(e) => setSelectedInputField(e.target.name)}
                      sx={{ width: 50 }}
                      autoComplete="off"
                    /> */}
                    <Typography sx={{ paddingInline: 1.5 }}>
                      {data.count}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ padding: 0, minWidth: 30, height: "80%" }}
                      onClick={() => changeProductAmount(true, data.id)}
                    >
                      +
                    </Button>
                  </Box>
                  <ToggleButton
                    key={index}
                    value={data.id}
                    sx={{
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      color: "black",
                      width: "100%",
                    }}
                    onClick={(e) => {}}
                  >
                    <Typography>{data.name}</Typography>
                    <Typography>{data.price / 100}₺</Typography>
                  </ToggleButton>
                </Box>
              );
            })}
          </ToggleButtonGroup>
          <Accordion
            onChange={(e, expanded) => {}}
            sx={{
              margin: 0,
              width: "100%",
              position: "sticky",
              bottom: 0,
              borderTop: 1,
            }}
            disableGutters
            square
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Total: {total}₺</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Ara Toplam: 30.35₺</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          borderLeft: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          name="barcode"
          autoComplete="off"
          placeholder="Klaveden Barkod Girişi"
          onFocus={(e) => setSelectedInputField(e.target.name)}
          value={inputFields.barcode}
          sx={{ width: "90%", marginBottom: 1.5, marginLeft: 2 }}
        />

        <Dialog
          maxWidth="xl"
          open={selectListOpen}
          onClose={() => {
            setSelectListOpen(false);
            closeSnackbar();
          }}
        >
          <Box width={"100%"} height={"100vh"} overflow={"hidden"}>
            <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
              <IconButton
                sx={{ marginLeft: "auto" }}
                onClick={() => setSelectListOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Products
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                paddingBottom: 5,
                marginBottom: "auto",
                height: "100%",
              }}
              onSelectProduct={(data) => addProductToCashout(data)}
              onProducts={(data) => setProductsData(data)}
              onCount={(amount) => setProductAmount(amount)}
            />
          </Box>
          <Typography textAlign={"center"}>
            Ürün Sayısı: {productAmount}
          </Typography>
        </Dialog>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
            Listeden Ürün Eklemek için Tıklayın
          </Button>
          <VirtualKeyboard
            keyboardRef={keyboard}
            layout="numeric"
            onChangeInput={(input) => {
              console.log(inputFields[selectedInputField]);
              console.log(inputFields);
              if (selectedInputField != "")
                setInputFields({ ...inputFields, [selectedInputField]: input });
            }}
            onDone={() => setSelectedInputField("")}
          />
        </Box>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 1,
            borderTop: 1,
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
