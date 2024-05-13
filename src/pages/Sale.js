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
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useRef, useState } from "react";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import ProductsDialog from "../Components/ProductsDialog";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import LOG from "../Debug/Console";
import CheckoutTable from "../Components/CheckoutTable";
import { ArrowDownward, ArrowUpward, Done } from "@mui/icons-material";
import { useAlert } from "../Hooks/useAlert";
import useStore from "../Hooks/useStore";
import useData from "../Hooks/useData";
import API from "../productsAPI.json";
import useProduct from "../Hooks/useProduct";

export default function Sale() {
  const storeInfo = useStore();
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const { setProducts, getAllProducts } = useProduct();

  const checkoutRef = useRef(null);
  const keyboard = useRef();

  const [selectedItems, setSelectedItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [selectedInputField, setSelectedInputField] = useState("");
  const [cashout, setCashout] = useState(
    JSON.parse(sessionStorage.getItem("cashout"))
  );
  const [selectListOpen, setSelectListOpen] = useState(false);
  const [testID, setID] = useState();

  const addProductToCashout = ({ attributes, id, price, images, stock }) => {
    var product = cashout.find(
      (data) => data.attributes.name == attributes.name
    );
    console.log(product?.count);
    if (!product) {
      setCashout([
        ...cashout,
        {
          id: id,
          attributes: attributes,
          price: {
            cashout: price.discounted,
            normal: price.normal,
            discounted: price.discounted,
          },
          images: images,
          count: 1,
          stock: stock,
        },
      ]);
    } else {
      changeProductAmount(parseFloat(product.count) + 1, id);
    }
    //pushing a snackbar to show the user which product has been added
    enqueueSnackbar(attributes.name + " eklendi.", {
      variant: "product",
      img: images,
    });
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
        if (amount <= a.stock)
          returnValue = {
            ...returnValue,
            price: {
              ...a.price,
              cashout: a.price.discounted * amount,
            },
            count: amount,
          };
        else {
          setInputFields({
            ...inputFields,
            [selectedInputField]: a.stock,
          });
          keyboard.current.setInput(a.stock.toString());
          setAlert({ text: "Stok Yetersiz", type: "error" });
          returnValue = {
            ...returnValue,
            price: {
              ...a.price,
              cashout: a.price.discounted * a.stock,
            },
            count: a.stock,
          };
        }
      }

      return returnValue;
    });
    setCashout(newArray);
  };

  const total = useMemo(() => {
    LOG("total calculated!", "yellow");
    let total = 0;
    cashout.map(({ price }) => (total = total + price.cashout));
    return total / 100;
  }, [cashout, cashout.length]);

  useEffect(() => {
    keyboard.current.setInput(inputFields[selectedInputField]);
  }, [selectedInputField]);

  useData(
    Object.values(API),
    (data) => {
      setProducts(data);
    },
    () => {},
    [API]
  );

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
            alignItems: "center",
            width: "95%",
            borderRadius: 7,
            marginBlock: 1,
            zIndex: 100,
          }}
          elevation={2}
        >
          <IconButton sx={{ ml: 1, color: "black" }}>
            <QrCodeScannerIcon sx={{ fontSize: 40 }} />
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
          </IconButton>

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
            <IconButton
              onClick={deleteSelected}
              disabled={selectedItems.length == 0 ? true : false}
              aria-label="delete"
              sx={{ fontSize: 40, marginRight: 2, color: "black" }}
              color="black"
            >
              <DeleteIcon fontSize="inherit" color="inherit" />
            </IconButton>
          </Box>
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
            position: "relative",
          }}
          elevation={5}
        >
          <CheckoutTable
            ref={checkoutRef}
            data={cashout}
            inputValues={inputFields}
            onFocus={(e, { id }) => {
              setSelectedInputField(e.target.name);
              console.log(id);
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
              <Typography>Toplam: {total}₺</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Ara Toplam: {total}₺</Typography>
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
            variant="standard"
            name="barcode"
            autoComplete="off"
            label="Klaveden Barkod Girişi"
            onFocus={(e) => setSelectedInputField(e.target.name)}
            value={inputFields.barcode}
            sx={{
              width: "90%",
              marginBottom: 1.5,
              marginLeft: 2,
            }}
            onChange={(e) => {
              //sync with physical keyboard(TODO)
              setInputFields({
                ...inputFields,
                [selectedInputField]: e.target.value,
              });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      getAllProducts().map(
                        ({ attributes, id, images, price, stock }) => {
                          if (inputFields.barcode == attributes.barcodes[0]) {
                            addProductToCashout({
                              attributes: attributes,
                              id: id,
                              images: images,
                              price: price,
                              stock: stock,
                            });
                          }
                        }
                      );
                      setInputFields({ ...inputFields, barcode: "" });
                    }}
                  >
                    <Done />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ProductsDialog
            open={selectListOpen}
            onClose={() => {
              setSelectListOpen(false);
              closeSnackbar();
            }}
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingBottom: 20,
              marginBottom: "auto",
              height: "100%",
            }}
            onSelectProduct={(data) => addProductToCashout(data)}
            onProducts={(data) => setProductsData(data)}
          />

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
              Listeden Ürün Eklemek için Tıklayın
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
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
                    if (selectedInputField != "barcode") {
                      console.log(testID);
                      changeProductAmount(input, testID);
                    }
                  }
                }}
                onDone={() => {
                  setSelectedInputField("");
                }}
              />
            </Box>
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
                Geri Dön
              </Button>
              <Button
                disabled={!storeInfo.online}
                variant="contained"
                disableElevation
                color="secondary"
                sx={{
                  height: 80,
                  fontSize: 20,
                }}
                onClick={() => {
                  sessionStorage.setItem("cashout", JSON.stringify(cashout));
                  navigate("./payment");
                }}
              >
                ÖDEMEYE İLERLE
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
              backgroundColor: storeInfo.online ? "green" : "red",
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
