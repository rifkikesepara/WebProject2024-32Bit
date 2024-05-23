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
  Circle,
  CircleOutlined,
  Done,
  InfoRounded,
} from "@mui/icons-material";
import ProductDetail from "./ProductDetail";
import { useState } from "react";

const ReturnItem = ({
  product,
  selected,
  returnable,
  onSelect = (product) => {},
}) => {
  const { theme } = usePreferences();
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
        disableRipple
        disabled={!returnable}
        key={product.id}
        // color="primary"
        sx={{
          width: 170,
          height: 200,
          borderRadius: 5,
          overflow: "visible",
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "transform 0.2s ease", //animation
          boxShadow: "0px 0px 20px -1px rgba(0, 0, 0, 0.3)",
          backgroundColor: selected ? "green" : theme.palette.background.paper,
          "&:hover": {
            transition: "transform 0.2s ease",
            cursor: "pointer",
            transform: "scale(1.05)",
            backgroundColor: selected
              ? "green"
              : theme.palette.background.paper,
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
          <Typography sx={{ color: "red" }}>X{product.count}</Typography>
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
          {selected ? <CheckCircleOutline /> : <CircleOutlined />}
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
};

export default function ReturnItemTable({
  receipt = GetFromLocalStorage("receipts")[3],
}) {
  const { theme } = usePreferences();
  const [selectedItems, setSelectedItems] = useState([]);

  function addSelectedItems(product) {
    const doesContain = selectedItems.find(({ id }) => id == product.id);
    if (doesContain == undefined) {
      setSelectedItems([...selectedItems, { ...product, selected: true }]);
    } else {
      let temp = [...selectedItems];
      const index = temp.indexOf(doesContain);
      temp.splice(index, 1);
      setSelectedItems(temp);
    }
  }

  function isReturnValid(product) {
    const date = getDateFromString(receipt.payment.date);
    if (product.attributes.returnDay >= dateDiffInDays(date, new Date()))
      return true;
    else return false;
  }
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.default,
      }}
    >
      <Paper
        sx={{
          height: "80%",
          padding: 4,
          borderRadius: 7,
          overflowY: "scroll",
          "&::-webkit-scrollbar": { width: 0 },
        }}
        elevation={3}
      >
        <Stack
          sx={{}}
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          width={600}
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
                returnable={isReturnValid(product)}
                onSelect={addSelectedItems}
                selected={selected}
              />
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}
