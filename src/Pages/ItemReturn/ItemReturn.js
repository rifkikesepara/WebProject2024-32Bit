import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TextFieldVK from "../../Components/TextFieldVK";
import { useNavigate } from "react-router-dom";
import { forwardRef, useRef, useState } from "react";
import {
  ChangeProductAmount,
  GetFromLocalStorage,
  SaveToLocalStorage,
} from "../../Utils/utilities";
import { ReturnItemDialog } from "./ReturnItemTable";
import useData from "../../Hooks/useData";
import CheckoutTable from "../../Components/CheckoutTable";
import VirtualKeyboard from "../../Components/VirtualKeyboard";
import { useAlert } from "../../Hooks/useAlert";
import { LoadingButton } from "@mui/lab";
import DialogWithButtons from "../../Components/DialogWithButtons";
import ScrollButtons from "../../Components/ScrollButtons";
import { Receipt, ReturnReceipt } from "../../Components/Receipt";
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

//shows the receipts data and provides button to select the receipt or show the receipt
const ReceiptBox = ({ data, onSelect = (receipt) => {} }) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        width: "70%",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Stack spacing={1}>
        <Typography>
          {t("receiptID")}: {data.id}
        </Typography>
        <Typography>
          {t("total")}: {data.payment.total.toFixed(2)}₺
        </Typography>
        <Typography>
          {t("date")}: {data.date}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            console.log(data);
            setShowReceipt(true);
          }}
          sx={{
            paddingBlock: 2,
            display: { md: "none", sm: "block", xs: "block" },
          }}
        >
          {t("show")}
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onSelect(data)}
          sx={{ paddingBlock: 2 }}
        >
          {t("choose")}
        </Button>
        <Dialog
          maxWidth="xl"
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          scroll="body"
        >
          <Box>
            <Receipt payment={data.payment} cashout={data.products} />
          </Box>
        </Dialog>
      </Stack>
    </Paper>
  );
};

//shows the receipts from the latest sales
const LastReceipts = forwardRef(({ onSelect = (receipt) => {} }, ref) => {
  const receipts = GetFromLocalStorage("receipts");

  return (
    <Stack
      ref={ref}
      sx={{
        paddingBlock: 1,
        overflowY: "scroll",
        overflowX: "hidden",
        height: "100%",
      }}
      alignItems={"center"}
      width={"100%"}
      alignSelf={"center"}
      spacing={3}
    >
      {receipts.map((receipt) => {
        return (
          <ReceiptBox key={receipt.id} data={receipt} onSelect={onSelect} />
        );
      })}
    </Stack>
  );
});

//shows the receipts from the latest sales as dialog
const ReceiptsDialog = ({
  open,
  onClose = () => {},
  onSelect = (receipt) => {},
}) => {
  const scrollRef = useRef();
  return (
    <DialogWithButtons
      open={open}
      sx={{
        width: { md: "50%", xs: "100%" },
        maxWidth: 500,
        height: "70%",
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
      }}
      onClose={onClose}
      scrollRef={scrollRef}
    >
      <LastReceipts ref={scrollRef} onSelect={onSelect} />
    </DialogWithButtons>
  );
};

//the function that returns the receipt by indicated receipt id
const findTheReceiptByID = (receiptID) => {
  return GetFromLocalStorage("receipts").find(({ id }) => id == receiptID);
};

export default function ItemReturn() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const keyboard = useRef(null);
  const receiptsScrollRef = useRef();
  const returnReceiptRef = useRef();

  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [receiptInput, setReceiptInput] = useState("");
  const [showReceipts, setShowReceipts] = useState(false);
  const [showReturnReceipt, setShowReturnReceipt] = useState(false);
  const [returnItemDialog, setReturnItemDialog] = useState({
    show: false,
    receipt: -1,
  });

  //handles the change of product amount
  const handleInputChange = (input) => {
    const amount = input != "" ? input : 0;

    //if this is a product that an offer is applied then must return whole amount of it
    if (selectedProduct.offer) {
      setAlert({
        text: "Kampanya ile alınan ürünün tamamı iade gerektirir",
        type: "error",
      });
    }
    //else if amount is more than the amount of that has been bought show an alert
    else if (amount > selectedProduct.bought) {
      setAlert({ text: "Satın Alınan Sayı Geçildi", type: "error" });
    } else
      setSelectedProducts(
        ChangeProductAmount(parseInt(amount), selectedProduct, selectedProducts)
      );
  };

  //handles printing the return receipt
  const handlePrint = useReactToPrint({
    content: () => returnReceiptRef.current,
  });

  //handles returning the products pushes the return receipt to the storage
  const handleReturn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowReturnReceipt(true);
      const returnReceipts = GetFromLocalStorage("returnReceipts");
      returnReceipts.push({
        id: returnReceipts.length,
        receiptID: returnItemDialog.receipt.id,
        returnedItems: selectedProducts,
        date: new Date().toLocaleString(),
      });
      SaveToLocalStorage("returnReceipts", returnReceipts);
    }, 1000);
  };

  // useData("./fakeReceipts.json", (data) => {
  //   if (!GetFromLocalStorage("receipts").length)
  //     SaveToLocalStorage("receipts", data);
  // });

  return (
    <Stack
      sx={{
        backgroundColor: "background.default",
        flexDirection: { md: "row", sm: "row", xs: "column" },
      }}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      {selectedProducts.length != 0 && (
        <Box alignSelf={"center"} height={"80vh"}>
          <Paper
            sx={{
              borderRadius: 7,
              overflow: "hidden",
              width: { md: "50vw", xs: "100%" },
              height: "100%",
            }}
          >
            <CheckoutTable
              // accordionVisible={false}
              data={selectedProducts}
              onFocus={(event, product) => {
                setSelectedProduct(product);
              }}
            />
          </Paper>
        </Box>
      )}
      {selectedProducts.length == 0 && (
        <Stack
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            width: "50%",
            minWidth: 300,
            maxWidth: 700,
            position: "relative",
          }}
        >
          <Typography variant="h4" color={"primary"} textAlign={"center"}>
            {t("lastSales")}
          </Typography>
          <ScrollButtons
            scrollRef={receiptsScrollRef}
            direction="column"
            sx={{ right: -50, top: 50 }}
          />
          <Paper
            sx={{
              height: "80vh",
              width: "100%",
              borderRadius: 7,
              overflow: "hidden",
            }}
            elevation={3}
          >
            <LastReceipts
              ref={receiptsScrollRef}
              onSelect={(receipt) => {
                setShowReceipts(false);
                setReturnItemDialog({ receipt: receipt, show: true });
              }}
            />
          </Paper>
        </Stack>
      )}
      <Stack
        sx={{
          height: "100vh",
          justifySelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Stack spacing={2}>
          {selectedProducts.length == 0 ? (
            <>
              <Button
                variant="contained"
                sx={{ display: { md: "none", xs: "block", sm: "block" } }}
                onClick={() => setShowReceipts(true)}
              >
                Son Satışlar
              </Button>
              <TextFieldVK
                placeholder={t("enterReceiptID")}
                onChange={(e, v) => setReceiptInput(v)}
              />
              <Button
                disabled={
                  !receiptInput.length || !findTheReceiptByID(receiptInput)
                }
                color="secondary"
                sx={{ paddingBlock: 3 }}
                variant="contained"
                onClick={() =>
                  setReturnItemDialog({
                    receipt: findTheReceiptByID(receiptInput),
                    show: true,
                  })
                }
              >
                {t("enter")}
              </Button>
            </>
          ) : (
            <VirtualKeyboard
              ref={keyboard}
              layout="cashier"
              onChangeInput={handleInputChange}
              onDone={() => {}}
            />
          )}
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
            spacing={2}
          >
            <Button
              variant="contained"
              sx={{ paddingBlock: 3, width: "100%" }}
              onClick={() => {
                if (!selectedProducts.length) navigate("../home");
                else setSelectedProducts([]);
              }}
            >
              {t("goBack")}
            </Button>
            {selectedProducts.length != 0 && (
              <LoadingButton
                loading={loading}
                onClick={handleReturn}
                color="secondary"
                variant="contained"
                sx={{ paddingBlock: 3, width: "100%" }}
              >
                {t("return")}
              </LoadingButton>
            )}
          </Stack>
        </Stack>
        <ReceiptsDialog
          open={showReceipts}
          onClose={() => setShowReceipts(false)}
          onSelect={(receipt) => {
            setShowReceipts(false);
            setReturnItemDialog({ receipt: receipt, show: true });
          }}
        />
        <ReturnItemDialog
          open={returnItemDialog.show}
          onClose={() =>
            setReturnItemDialog({ ...returnItemDialog, show: false })
          }
          receipt={returnItemDialog.receipt}
          onDone={(items) => {
            setReturnItemDialog({ ...returnItemDialog, show: false });
            console.log(items);
            setSelectedProducts(items);
          }}
        />
        <DialogWithButtons
          open={showReturnReceipt}
          onClose={() => {
            setShowReturnReceipt(false);

            setSelectedProducts([]);
          }}
          buttons={{
            endAdornment: (
              <Paper>
                <IconButton onClick={handlePrint} sx={{ borderRadius: 0 }}>
                  <Print />
                </IconButton>
              </Paper>
            ),
          }}
        >
          <Paper>
            <ReturnReceipt
              ref={returnReceiptRef}
              returnedItems={{
                receipt: returnItemDialog.receipt,
                date: new Date(),
                products: selectedProducts,
              }}
            />
          </Paper>
        </DialogWithButtons>
      </Stack>
    </Stack>
  );
}
