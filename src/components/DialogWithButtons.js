import { Close } from "@mui/icons-material";
import { Box, Dialog, IconButton, Paper } from "@mui/material";
import { useRef } from "react";
import ScrollButtons from "./ScrollButtons";

const DialogPaper = (props) => {
  const scrollRef = useRef(props.scrollref);
  //   console.log(scrollRef);
  return (
    <>
      {props.startadornment}
      <Paper {...props}>
        <Box
          ref={(r) => {
            if (props.scrollref) scrollRef.current = props.scrollref.current;
            else scrollRef.current = r;
          }}
          sx={{ height: "100%", width: "100%" }}
        >
          {props.children}
        </Box>
        <ScrollButtons
          direction="column"
          scrollRef={scrollRef}
          sx={{ right: -50 }}
          startAdornment={
            <Paper sx={{ backgroundColor: "red" }}>
              <IconButton sx={{ borderRadius: 0 }} onClick={props.onClose}>
                <Close />
              </IconButton>
            </Paper>
          }
        />
      </Paper>
      {props.endadornment}
    </>
  );
};

export default function DialogWithButtons({
  children,
  startAdornment,
  endAdornment,
  open = true,
  sx = {},
  onClose = (e) => {},
  scrollRef,
}) {
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      PaperComponent={DialogPaper}
      PaperProps={{
        sx: { ...sx, overflowY: "visible" },
        scrollref: scrollRef,
        startadornment: startAdornment,
        endadornment: endAdornment,
        onClose: onClose,
      }}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
}
