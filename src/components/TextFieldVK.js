import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import { KeyboardAlt } from "@mui/icons-material";

export default function TextFieldVK({
  value = "",
  inputSX,
  divSX,
  placeholder,
  autoComplete = "off",
  layout = "default",
  elevation = 0,
  onChange = () => {},
}) {
  const [textInput, setInput] = useState(value);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const keyboard = useRef();

  const [displayInfo, setDisplayInfo] = useState("block");

  useEffect(() => {
    if (!showKeyboard) {
      setTimeout(() => {
        setDisplayInfo("none");
      }, 400);
    }
  }, [showKeyboard, textInput]);

  return (
    <Box
      sx={{
        ...divSX,
        display: "flex",
        justifyContent: "flex-start ",
      }}
    >
      <OutlinedInput
        sx={{ ...inputSX }}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={textInput}
        onChange={(e) => {
          setInput(e.target.value);
          keyboard.current.setInput(e.target.value);
          onChange(e, e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setDisplayInfo("block");
                setShowKeyboard(true);
              }}
            >
              <KeyboardAlt />
            </IconButton>
          </InputAdornment>
        }
      />
      <Paper
        sx={{
          position: "absolute",
          transition: "top 0.5s ease,opacity 0.2s ease",
          top: showKeyboard ? 210 : -50,
          opacity: showKeyboard ? 1 : 0,
          width: "50%",
          zIndex: -10,
        }}
        elevation={elevation}
      >
        <VirtualKeyboard
          sx={{
            height: 0,
            display: displayInfo,
          }}
          ref={keyboard}
          layout={layout}
          onBlur={() => setShowKeyboard(false)}
          onChangeInput={(input) => {
            setInput(input);
            onChange(null, input);
          }}
          onDone={() => {
            setShowKeyboard(false);
          }}
        />
      </Paper>
    </Box>
  );
}
