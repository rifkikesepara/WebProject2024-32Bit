import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import { KeyboardAlt } from "@mui/icons-material";

//the text field component combined with virtual keyboard
export default function TextFieldVK({
  disabled = false, //disabled indicator of the TextField
  value = "", //value of the TextField
  name = "", //name value of the TextField
  type = "text", //type of the TextField
  inputSX, //styling object of the TextField
  divSX, //styling object of the container div
  placeholder, //placeholder of the TextField
  autoComplete = "off",
  layout = "default", //layout of the virtual keyboard
  elevation = 0,
  dialog = false, //indicates if the virtual keyboard is gonna be shown as dialog or not
  startAdornment, //start adornments of the TextField
  onChange = (event, value) => {}, //callback function that is executed whenever the input of TextField changes
  onClear = () => {}, //callback function that is executed whenever TextFiled input has been cleared
}) {
  const keyboard = useRef();

  const [textInput, setInput] = useState(value);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [displayInfo, setDisplayInfo] = useState("block");

  const handleChange = (event, value) => {
    setInput(value);
    keyboard?.current?.setInput(value);
    onChange(event, value);
  };

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
        disabled={disabled}
        type={type}
        sx={{ ...inputSX }}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={textInput}
        onChange={(e) => {
          handleChange(e, e.target.value);
        }}
        startAdornment={
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
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
      {dialog ? (
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
            ref={keyboard}
            sx={{
              height: 0,
              display: displayInfo,
            }}
            layout={layout}
            onBlur={() => setShowKeyboard(false)}
            onChangeInput={(input) => {
              handleChange(null, input);
            }}
            onDone={() => {
              setShowKeyboard(false);
            }}
          />
        </Paper>
      ) : (
        <Dialog
          open={showKeyboard}
          onClose={() => setShowKeyboard(false)}
          maxWidth="md"
          PaperProps={{
            sx: {
              paddingBlock: 5,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
            },
          }}
        >
          <Stack direction={"row"} width={"90%"}>
            <TextField
              name={name}
              type={type}
              placeholder={placeholder}
              value={textInput}
              fullWidth
              autoComplete="off"
              onChange={(event) => {
                const input = event.target.value;
                keyboard.current?.setInput(input);
                setInput(input);
                onChange(event, input);
              }}
            />
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                handleChange(null, "");
                onClear();
              }}
            >
              Sil
            </Button>
          </Stack>
          <Stack
            sx={{
              width: "90%",
              alignItems: "center",
            }}
          >
            <VirtualKeyboard
              ref={keyboard}
              initialInput={textInput}
              sx={{ width: "100%" }}
              onChangeInput={(input) => {
                handleChange(null, input);
              }}
              onPress={(key) => {
                if (key == "{enter}") {
                  setShowKeyboard(false);
                }
              }}
            />
          </Stack>
        </Dialog>
      )}
    </Box>
  );
}
