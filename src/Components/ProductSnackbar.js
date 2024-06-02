import { Card, IconButton, Typography } from "@mui/material";
import { SnackbarContent, useSnackbar } from "notistack";
import { forwardRef, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const ProductSnackbar = forwardRef(({ id, ...props }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card
        elevation={6}
        sx={{
          height: 100,
          display: "flex",
          width: 300,
          borderRadius: 7,
        }}
      >
        <img
          src={props.img.find(({ imageType }) => imageType == "product").url}
        />
        <Typography
          sx={{
            marginBlock: "auto",
          }}
        >
          {props.message}
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleDismiss}>
          <CloseIcon />
        </IconButton>
      </Card>
    </SnackbarContent>
  );
});
