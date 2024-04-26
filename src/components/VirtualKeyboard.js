import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../Styles/Keyboard.css";
import logo from "../Resources/enter.png";
import { usePreferences } from "../Context/Theme";

const numericLayout = {
  default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {tick}"],
  shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"],
};

const cashierLayout = {
  default: ["{cancel} +/- {bksp}", "1 2 3", "4 5 6", "7 8 9", "00 0 ."],
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
  keyboardRef,
  sx,
  onBlur = () => {},
  onInit = () => {},
  onDone = () => {},
  onPress = () => {},
  layout = "default",
  buttonSX = {},
}) {
  const { isThemeDark, theme } = usePreferences();
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
          class: "hg-theme-default hg-layout-default",
        };
      case "numeric":
        return {
          layout: numericLayout,
          class: "hg-theme-default hg-layout-numeric",
        };
      case "cashier":
        return {
          layout: cashierLayout,
          class: "hg-theme-default hg-layout-numeric",
        };
    }
  };

  useEffect(() => {
    // setState({ ...state, input: "" });

    //event of clicked outside of the keyboard
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

  const onKeyPress = (button, e) => {
    onPress(button);
    if (button === "{enter}") e.preventDefault(); //preventing default event to not clicking somthing else behind the keyboard
    if (button === "{cancel}") keyboard.current.setInput("");
    if (button === "{tick}") setTimeout(() => onDone(), 400);
    if (button === "{shift}" || button === "{lock}")
      /**
       * If you want to handle the shift and caps lock buttons
       */
      handleShift();
  };

  return (
    <Box
      sx={{
        ...sx,
        ".hg-button.hg-red": {
          background: "rgb(255, 0, 0, 0.7)",
          color: "white",
          border: "none",
          fontWeight: "bold",
        },
        ".hg-button.hg-red:active": {
          background: "#d53c3e",
          color: "white",
          border: "none",
          fontWeight: "bold",
        },
        ".hg-button": {
          ...buttonSX,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border:
            layout === "default" && isThemeDark ? "1px solid white" : "none",
        },
        ".hg-button:active": {
          backgroundColor: isThemeDark && "#2f2f2f",
        },
      }}
      ref={ref}
    >
      <Keyboard
        onInit={() => onInit()}
        theme={adjustLayout().class}
        buttonTheme={[
          {
            class: "hg-red",
            buttons: "{bksp}",
          },
        ]}
        display={{
          "{bksp}": "⌫",
          "{tick}": "✔",
          "{enter}": "←----------",
          "{cancel}": "C",
          "{tab}": "⇆",
          "{lock}": "CapsLk",
          "{shift}": "⇧",
          "{space}": " ",
        }}
        // buttonTheme={[
        //   {
        //     class: "hg-red",
        //     buttons: "Q W E R T Y q w e r t y",
        //   },
        // ]}
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
