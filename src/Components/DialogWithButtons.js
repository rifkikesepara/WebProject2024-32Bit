import { Close } from "@mui/icons-material";
import { Box, Dialog, IconButton, Paper } from "@mui/material";
import React, { useRef } from "react";
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
            <>
              {props.buttons.startAdornment}
              <Paper sx={{ backgroundColor: "red" }}>
                <IconButton sx={{ borderRadius: 0 }} onClick={props.onClose}>
                  <Close />
                </IconButton>
              </Paper>
            </>
          }
          endAdornment={props.buttons.endAdornment}
        />
      </Paper>
      {props.endadornment}
    </>
  );
};

//custom dialog component that includes scrolling buttons
export default function DialogWithButtons({
  scrollRef, //the ref of the div that will be scrolled by the scrolling buttons
  children, //dialog content
  open = true,
  sx = {}, //styling object
  startAdornment = <></>, //adding new elements to dialog's start
  endAdornment = <></>, //adding new elments to dialog's end
  buttons = { startAdornment: <></>, endAdornment: <></> }, //adding new button to start and end of the scrolling button
  onClose = (e) => {}, //callback function that is executed whenever dialog is closed
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
        buttons: buttons,
      }}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
}
