import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../Styles/Keyboard.css";

export default function VirtualKeyboard({ onChangeInput, clear, keyboardRef }) {
  const [state, setState] = useState({ layoutName: "default", input: "" });

  //   const onChangeInput = (event) => {
  //     const input = event.target.value;
  //     this.setState({ input });
  //     this.keyboard.setInput(input);
  //   };

  useEffect(() => {
    setState({ ...state, input: "" });
  }, [clear]);

  const onChange = (input) => {
    onChangeInput(input);
    setState({ input });
  };

  const handleShift = () => {
    const layoutName = state.layoutName;

    setState({
      layoutName: layoutName === "default" ? "shift" : "default",
    });
  };

  const onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Keyboard
        theme="hg-theme-default hg-layout-default myTheme"
        buttonTheme={[
          {
            class: "hg-red",
            buttons: "Q W E R T Y q w e r t y",
          },
        ]}
        keyboardRef={keyboardRef}
        layoutName={state.layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Box>
  );
}
