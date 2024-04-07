import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../Styles/Keyboard.css";

const numericLayout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {tick}"],
  shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"],
};

const cashierLayout = {
  default: ["{cancel} +/- {bksp}", "1 2 3", "4 5 6", "7 8 9", "00 0 ,"],
};

const englishLayout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M < > ? {shift}",
    ".com @ {space}",
  ],
};

export default function VirtualKeyboard({
  onChangeInput = () => {},
  clear,
  keyboardRef,
  sx,
  onBlur = () => {},
  onInit = () => {},
  onDone = () => {},
  layout = "default",
}) {
  const [state, setState] = useState({ layoutName: "default", input: "" });
  let keyboard = useRef();

  //   const onChangeInput = (event) => {
  //     const input = event.target.value;
  //     this.setState({ input });
  //     this.keyboard.setInput(input);
  //   };

  const ref = useRef();

  const adjustLayout = () => {
    switch (layout) {
      case "default":
        return {
          layout: englishLayout,
          class: "hg-theme-default hg-layout-default myTheme",
        };
      case "numeric":
        return {
          layout: numericLayout,
          class: "hg-theme-default hg-layout-numeric myTheme",
        };
      case "cashier":
        return {
          layout: cashierLayout,
          class: "hg-theme-default hg-layout-numeric myTheme",
        };
    }
  };

  useEffect(() => {
    // setState({ ...state, input: "" });

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onBlur();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

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
    if (button === "{cancel}") keyboard.current.setInput("");
    if (button == "{tick}") setTimeout(() => onDone(), 400);
    if (button === "{shift}" || button === "{lock}")
      /**
       * If you want to handle the shift and caps lock buttons
       */
      handleShift();
  };

  return (
    <Box sx={{ ...sx }} ref={ref}>
      <Keyboard
        onInit={() => onInit()}
        theme={adjustLayout().class}
        display={{ "{bksp}": "⌫", "{tick}": "✔", "{cancel}": "C" }}
        buttonTheme={[
          {
            class: "hg-red",
            buttons: "{bksp}",
          },
        ]}
        keyboardRef={(r) => {
          if (keyboardRef) keyboardRef.current = r;
          keyboard.current = r;
        }}
        layout={adjustLayout().layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </Box>
  );
}
