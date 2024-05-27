import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useMemo, useRef, useState } from "react";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import ProductsDialog from "../Components/ProductsDialog";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import LOG from "../Debug/Console";
import CheckoutTable from "../Components/CheckoutTable";
import { ArrowDownward, ArrowUpward, Done, Info } from "@mui/icons-material";
import { useAlert } from "../Hooks/useAlert";
import useStore from "../Hooks/useStore";
import useProduct from "../Hooks/useProduct";
import OfferBox from "../Components/OfferBox";
import { useTranslation } from "react-i18next";
import usePreferences from "../Hooks/usePreferences";
import { CheckAndApplyOffer } from "../Utils/offers";
import Products from "../Components/Products";
import {
  GetFromSessionStorage,
  SaveToSessionStorage,
} from "../Utils/utilities";

export default function Sale() {
  const storeInfo = useStore();
  const navigate = useNavigate();
  const { theme, isDesktop } = usePreferences();
  const { t } = useTranslation();
  const { setAlert } = useAlert();
  const { getAllProducts } = useProduct();

  const checkoutRef = useRef(null);
  const keyboard = useRef();

  const [selectedItems, setSelectedItems] = useState([]);
  const [inputFields, setInputFields] = useState({ barcode: "" });
  const [selectedInputField, setSelectedInputField] = useState("");
  const [cashout, setCashout] = useState(GetFromSessionStorage("cashout"));
  const [selectListOpen, setSelectListOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const addProductToCashout = (productData) => {
    var product = cashout.find(
      (data) => data.attributes.name == productData.attributes.name
    );
    console.log(productData);
    var data = {
      ...productData,
      price: {
        ...productData.price,
        cashout: productData.price.discounted,
      },
      count: 1,
    };

    if (!product) {
      data = CheckAndApplyOffer(data, cashout);
      setCashout([...cashout, data]);
      SaveToSessionStorage("cashout", [...cashout, data]);
    } else {
      changeProductAmount(parseFloat(product.count) + 1, data);
    }
    console.log(data);

    //pushing a snackbar to show the user which product has been added
    enqueueSnackbar(productData.attributes.name + " eklendi.", {
      variant: "product",
      img: productData.images,
    });
  };

  const deleteSelected = () => {
    LOG("deletedSelected", "yellow");
    let array = cashout;
    const usedOffers = GetFromSessionStorage("usedOffers");
    selectedItems.map((data) => {
      let index = array.indexOf(cashout.find(({ id }) => id == data));
      console.log(array[index]);

      const isThereOffer = usedOffers.find(
        ({ id }) => id == array[index].offer?.id
      );
      if (isThereOffer) {
        usedOffers.splice(usedOffers.indexOf(isThereOffer), 1);
        SaveToSessionStorage("usedOffers", usedOffers);
      }
      array.splice(index, 1);
    });
    setCashout(array);
    setSelectedItems([]);
  };

  const changeProductAmount = (amount, product) => {
    let newArray = cashout.map((a) => {
      var returnValue = { ...a };
      if (a.id == product.id) {
        if (amount <= a.stock) {
          returnValue = {
            ...returnValue,
            price: {
              ...product.price,
              cashout: product.price.discounted * amount,
            },
            count: amount,
          };
          returnValue = CheckAndApplyOffer(returnValue, cashout);
        } else {
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

  const barcodeToProduct = () => {
    getAllProducts().map(({ attributes, id, images, price, stock }) => {
      if (inputFields.barcode == attributes.barcodes[0]) {
        addProductToCashout({
          attributes: attributes,
          id: id,
          images: images,
          price: price,
          stock: stock,
        });
      }
    });
    setInputFields({ ...inputFields, barcode: "" });
  };

  useEffect(() => {
    keyboard.current.setInput(inputFields[selectedInputField]);
  }, [selectedInputField]);

  useEffect(() => {
    // sessionStorage.clear();
    const cachedProducts = [];
    cashout.map((product) => {
      cachedProducts.push(CheckAndApplyOffer(product, cashout));
    });
    setCashout(cachedProducts);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        overflow: "hidden",
        flexDirection: { sm: "row", md: "row", xs: "column" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {isDesktop && (
        <Box
          sx={{
            maxWidth: { md: 600, xs: "100%" },
            minWidth: 550,
            height: "100vh",
            backgroundColor: theme.palette.background.default,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            paddingInline: 2,
          }}
        >
          <Paper
            sx={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              margin: 0,
              borderBottomLeftRadius: { xs: 0, md: 30 },
              borderBottomRightRadius: { xs: 0, md: 30 },
              // maxHeight: "90vh",
              marginTop: { xs: "auto", md: 0 },
              backgroundColor: theme.palette.background.paper,
              overflowY: "hidden",
              width: "100%",
              height: "96%",
            }}
            elevation={3}
          >
            <Products
              open={true}
              onSelectProduct={(data) => addProductToCashout(data)}
            />
          </Paper>
        </Box>
      )}
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
          backgroundColor: theme.palette.background.default,
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
                color: theme.palette.text.primary,
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
                display: { xs: "none", sm: "block", md: "block" },
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
                display: { xs: "none", sm: "block", md: "block" },
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
              sx={{ fontSize: 40, marginRight: 2 }}
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            borderRadius: 7,
            position: "relative",
          }}
          elevation={5}
        >
          <CheckoutTable
            ref={checkoutRef}
            data={cashout}
            onFocus={(e, product) => {
              setSelectedInputField(e.target.name);
              setSelectedProduct(product);
            }}
            selectionValues={selectedItems}
            onChange={(newformats) => setSelectedItems(newformats)}
          />
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
          backgroundColor: theme.palette.background.default,
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
            onKeyDown={(e) => {
              if (e.key == "Enter") barcodeToProduct();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={barcodeToProduct}>
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
            {!isDesktop && (
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
            )}
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
                      changeProductAmount(input, selectedProduct);
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
                {t("goBack")}
              </Button>
              <Button
                disabled={!storeInfo.online || cashout.length == 0}
                variant="contained"
                disableElevation
                color="secondary"
                sx={{
                  height: 80,
                  fontSize: 20,
                }}
                onClick={() => {
                  SaveToSessionStorage("cashout", cashout);
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
            backgroundColor: theme.palette.background.default,
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
          <Typography color={"primary"}>{t("storeOnline")}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
