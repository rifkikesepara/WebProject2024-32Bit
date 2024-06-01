import { Box, Dialog, IconButton, Slide } from "@mui/material";
import { forwardRef, useMemo } from "react";

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
          backgroundColor: "background.paper",
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
        <Products onSelectProduct={onSelectProduct} />
      </Box>
    </Dialog>
  );
}
