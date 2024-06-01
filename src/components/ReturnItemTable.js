import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  GetFromLocalStorage,
  dateDiffInDays,
  getDateFromString,
} from "../Utils/utilities";
import usePreferences from "../Hooks/usePreferences";
import {
  CheckCircleOutline,
  CircleOutlined,
  InfoRounded,
} from "@mui/icons-material";
import ProductDetail from "./ProductDetail";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import DialogWithButtons from "./DialogWithButtons";
import { ReceiptWithScrollButtons } from "./Receipt";

export function ReturnItemDialog({
  open = false,
  receipt,
  onClose = () => {},
  onSelected = (items) => {},
  onDone = (items) => {},
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const scrollRef = useRef();
  const { isDesktop } = usePreferences();

  const handleClick = (event) => {
    const temp = [];
    selectedItems.map((item) => temp.push({ ...item, bought: item.count }));
    onDone(temp);
  };

  return (
    <DialogWithButtons
      open={open}
      onClose={onClose}
      scrollRef={scrollRef}
      sx={{
        overflowY: "scroll",
        width: "100%",
        maxWidth: !isDesktop ? { md: 400 } : 600,
      }}
      startAdornment={
        <Paper
          sx={{
            display: { xs: "none", md: "block", sm: "none" },
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}
        >
          <ReceiptWithScrollButtons
            sx={{
              justifyContent: "flex-start",
              width: "unset",
              paddingInline: 2,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
            receiptData={receipt}
          />
        </Paper>
      }
    >
      <Paper
        sx={{ position: "sticky", top: 0, zIndex: 10, paddingBlock: 3 }}
        elevation={3}
      >
        <Typography fontSize={20} textAlign={"center"}>
          Select Items To Return
        </Typography>
      </Paper>
      <ReturnItemTable
        ref={scrollRef}
        receipt={receipt}
        onSelected={(items) => {
          onSelected(items);
          setSelectedItems(items);
        }}
      />
      <Button
        disabled={!selectedItems.length}
        variant="contained"
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
        }}
        onClick={handleClick}
      >
        Return the Items
      </Button>
    </DialogWithButtons>
  );
}

const ReturnItem = forwardRef(
  ({ product, selected, returnable, onSelect = (product) => {} }, ref) => {
    const [showDetail, setShowDetail] = useState(false);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Button
          ref={ref}
          disableRipple
          disabled={!returnable}
          sx={{
            position: "relative",
            width: 170,
            height: 200,
            borderRadius: 5,
            overflow: "visible",
            animation: selected && "myEffect 500ms infinite alternate",
            mt: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            transition: "transform 0.2s ease", //animation
            boxShadow: "0px 0px 20px -1px rgba(0, 0, 0, 0.3)",
            backgroundColor: selected ? "green" : "background.paper",
            "&:hover": {
              transition: "transform 0.2s ease",
              cursor: "pointer",
              transform: "scale(1.05)",
              backgroundColor: selected ? "green" : "background.paper",
            },
            "@keyframes myEffect": {
              "0%": {
                transform: "scale(1.0)",
              },
              "100%": {
                transform: "scale(1.05)",
              },
            },
          }}
          onClick={(e) => {
            onSelect(product);
          }}
        >
          <img
            src={
              product.images.find(({ imageType }) => imageType == "product").url
            }
            width={"75%"}
            style={{
              position: "absolute",
              bottom: "50%",
              borderRadius: 100,
              boxShadow: "0px 0px 10px -1px rgba(0, 0, 0, 0.3)",
            }}
          />

          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                mr: 1,
              }}
            >
              {product.price.cashout / 100}₺
            </Typography>
            <Typography sx={{ color: "text.discount" }}>
              X{product.count}
            </Typography>
          </Box>
          <Typography
            sx={{
              width: "100%",
              fontSize: "95%",
            }}
            maxHeight={35}
            overflow={"hidden"}
          >
            {product.attributes.name}
          </Typography>
          <Paper
            sx={{
              position: "absolute",
              top: -15,
              right: -5,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selected ? (
              <CheckCircleOutline />
            ) : (
              <CircleOutlined color={!returnable ? "disabled" : "primary"} />
            )}
          </Paper>
        </Button>
        <IconButton
          onClick={() => {
            setShowDetail(true);
          }}
          sx={{ position: "absolute", bottom: 60 }}
        >
          <InfoRounded />
        </IconButton>

        <ProductDetail
          product={product}
          open={showDetail}
          onClose={() => setShowDetail(false)}
        />
      </Box>
    );
  }
);

export const ReturnItemTable = forwardRef(
  (
    {
      receipt = GetFromLocalStorage("receipts")[3],
      onSelected = (selectedItems) => {},
    },
    ref
  ) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const animationRef = useRef();
    useEffect(() => {
      animationRef?.current?.getAnimations({ subtree: true }).map((anim) => {
        anim.startTime = 0;
      });
    }, [selectedItems]);

    function addSelectedItems(product) {
      let temp = [...selectedItems];
      const doesContain = temp.find(({ id }) => id == product.id);
      if (doesContain == undefined) {
        temp = [...temp, { ...product, selected: true }];
        setSelectedItems(temp);
      } else {
        const index = temp.indexOf(doesContain);
        temp.splice(index, 1);
        setSelectedItems(temp);
      }

      onSelected(temp);
    }

    function alreadyReturnedItems() {
      const temp = [];
      GetFromLocalStorage("returnReceipts")
        .map((returnReceipt) => {
          if (returnReceipt.receiptID == receipt.id) return returnReceipt;
        })
        .map(({ returnedItems }) => {
          returnedItems.map(({ id, count }) => {
            const findProduct = temp.findIndex(
              ({ productID }) => productID == id
            );
            if (findProduct != -1) {
              return (temp[findProduct].count += count);
            } else
              temp.push({
                productID: id,
                count: count,
              });
          });
        });

      // console.log(temp);
      receipt.products = receipt.products.map((product) => {
        const findProduct = temp.find(
          ({ productID }) => productID == product.id
        );
        if (findProduct)
          return { ...product, count: product.count - findProduct.count };
        else return { ...product };
      });
    }
    useMemo(() => {
      alreadyReturnedItems();
    }, []);
    function isReturnValid(product) {
      const date = getDateFromString(receipt.date);
      if (product.attributes.returnDay >= dateDiffInDays(date, new Date()))
        return true;
      else return false;
    }
    return (
      <Stack
        ref={ref}
        sx={{
          width: "100%",
          height: 500,
          overflowY: "scroll",
          overflowX: "hidden",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Stack
          ref={animationRef}
          sx={{
            width: "100%",
            backgroundColor: "background.paper",
            pb: 10,
            // paddingInline: 2,
          }}
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={"wrap"}
        >
          {receipt.products.map((product) => {
            const selected = selectedItems.find(
              ({ id }) => id == product.id
            )?.selected;
            return (
              <ReturnItem
                key={product.id}
                product={product}
                returnable={isReturnValid(product) && product.count}
                onSelect={addSelectedItems}
                selected={selected}
              />
            );
          })}
        </Stack>
      </Stack>
    );
  }
);
