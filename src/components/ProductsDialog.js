import { Box, Dialog, IconButton, Slide, Typography } from "@mui/material";
import { forwardRef, useMemo, useState } from "react";

import usePreferences from "../Hooks/usePreferences";
import Products from "./Products";
import { Close } from "@mui/icons-material";

export default function ProductsDialog({
  open = false,
  onClose = (e) => {},
  onSelectProduct = (product) => {},
}) {
  const Transition = useMemo(
    () =>
      forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      }),
    []
  );

  const { theme } = usePreferences();
  const [productAmount, setProductAmount] = useState(0);

  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth="xl"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          margin: 0,
          marginInline: { md: 6, xs: 0 },
          maxWidth: { xs: "98%", md: 928 },
          borderBottomLeftRadius: { xs: 0, md: 30 },
          borderBottomRightRadius: { xs: 0, md: 30 },
          maxHeight: "90vh",
          marginTop: { xs: "auto", md: 0 },
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 10000,
          right: 10,
        }}
      >
        <Close />
      </IconButton>
      <Box height={"100vh"}>
        <Products
          onCount={(amount) => setProductAmount(amount)}
          onSelectProduct={onSelectProduct}
        />
      </Box>
      {/* <Typography
        sx={{
          textAlign: "center",
          boxShadow: "10px 20px 50px 70px " + theme.palette.background.paper,
          zIndex: 100,
        }}
      >
        Ürün Sayısı: {productAmount}
      </Typography> */}
    </Dialog>
  );
}
