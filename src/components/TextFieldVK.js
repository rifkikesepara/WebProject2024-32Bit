import { Box, Paper, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import { motion } from "framer-motion";

export default function TextFieldVK({
  textFieldSX,
  placeholder,
  autoComplete,
  divSX,
  elevation = 0,
}) {
  const [textInput, setInput] = useState("");
  const [animateState, setAnimateState] = useState("inactive");
  let keyboard = useRef();

  const variants = {
    active: {
      opacity: 1,
      scaleY: 1,
    },
    inactive: {
      opacity: 0,
      scaleY: 0,
    },
  };
  return (
    <Box
      sx={{
        ...divSX,
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TextField
        sx={{ ...textFieldSX }}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={textInput}
        onFocus={() => {
          setAnimateState("active");
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: -350,
          // display: !visible && "none",
          zIndex: 10000,
        }}
        variants={variants}
        animate={animateState}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={elevation}>
          <VirtualKeyboard
            keyboardRef={keyboard}
            layout="numeric"
            onBlur={() => {
              setAnimateState("inactive");
            }}
            onChangeInput={(input) => setInput(input)}
            onDone={() => {
              setAnimateState("inactive");
            }}
          />
        </Paper>
      </motion.div>
    </Box>
  );
}
