import { Box } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import usePreferences from "../Hooks/usePreferences";
import {
  NumericLayout,
  CashierLayout,
  EnglishLayout,
  TurkishLayout,
} from "../Layout/KeyboardLayouts";
import "../Styles/Keyboard.css";
import { useTranslation } from "react-i18next";

export const VirtualKeyboard = forwardRef(
  (
    {
      initialInput = "", //virtual keyboard's initial value
      onChangeInput = (input) => {}, //the callback function that shows the current input of the keyboard
      sx, //styling object
      onBlur = () => {}, //the callback function that executes whenever user clicks outside of the keyboard's div
      onInit = () => {}, //the function that is executed when the keyboard is being initialized
      onDone = () => {}, //the function that is executed when the tick button on the virtual keyboard is clicked
      onPress = (key) => {}, //the callback function that shows which button on the virtual keyboard has been clicked
      buttonSX = {}, //styling object of the keyboard buttons
      layout = "default", //defining tthe layout (default,numeric,cashier)
    },
    ref
  ) => {
    const { i18n } = useTranslation();
    const { isThemeDark } = usePreferences();
    const [state, setState] = useState({ layoutName: "default", input: "" });
    const boxRef = useRef();

    //the function that adjust the layout by indicated layout prop
    const adjustLayout = () => {
      switch (layout) {
        case "default":
          return {
            layout: i18n.language == "en" ? EnglishLayout : TurkishLayout,
            class: "hg-theme-default hg-layout-default",
          };
        case "numeric":
          return {
            layout: NumericLayout,
            class: "hg-theme-default hg-layout-numeric",
          };
        case "cashier":
          return {
            layout: CashierLayout,
            class: "hg-theme-default hg-layout-numeric",
          };
      }
    };

    //the hook to check if the user clicked outside of the keyboard's div
    useEffect(() => {
      //event of clicked outside of the keyboard
      function handleClickOutside(event) {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          onBlur();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [boxRef]);

    //setting the initial input if it is given
    useEffect(() => {
      ref.current.setInput(initialInput);
    }, [initialInput]);

    //handling the change of input of the keyboard
    const onChange = (input) => {
      onChangeInput(input);
    };

    //handling the shift event to change the layout
    const handleShift = () => {
      const layoutName = state.layoutName;

      setState({
        layoutName: layoutName === "default" ? "shift" : "default",
      });
    };

    //function to specify events whenever specific button is clicked
    const onKeyPress = (button, e) => {
      onPress(button);
      if (button === "{enter}") e.preventDefault(); //preventing default event to not clicking somthing else behind the keyboard
      if (button === "{cancel}") ref.current.setInput("");
      if (button === "{tick}") setTimeout(() => onDone(), 400);
      if (button === "{shift}" || button === "{lock}") handleShift();
    };

    return (
      <Box
        ref={boxRef}
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
            backgroundColor: "background.paper",
            color: "text.primary",
            border: () => {
              if (layout === "default" && isThemeDark) return "1px solid white";
              else if (layout === "default" && !isThemeDark)
                return "1px solid black";
              else return "none";
            },
          },
          ".hg-button:active": {
            backgroundColor: isThemeDark && "#2f2f2f",
          },
        }}
      >
        <Keyboard
          keyboardRef={(r) => (ref.current = r)}
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
            "{enter}": "Enter",
            "{cancel}": "C",
            "{tab}": "Tab",
            "{lock}": "CapsLk",
            "{shift}": "Shift",
            "{space}": " ",
          }}
          layout={adjustLayout().layout}
          layoutName={state.layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </Box>
    );
  }
);

export default VirtualKeyboard;
