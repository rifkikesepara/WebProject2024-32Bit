import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";

export default function TextFieldVK({
  textFieldSX,
  placeholder,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);
  const [textInput, setInput] = useState("");
  let keyboard = useRef();

  return (
    <Box
      sx={{
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
        onFocus={() => setVisible(true)}
      />

      <VirtualKeyboard
        keyboardRef={keyboard}
        sx={{
          position: "absolute",
          bottom: -350,
          display: !visible && "none",
          zIndex: 10000,
        }}
        layout="numeric"
        onBlur={() => setVisible(false)}
        onChangeInput={(input) => setInput(input)}
      />
    </Box>
  );
}
