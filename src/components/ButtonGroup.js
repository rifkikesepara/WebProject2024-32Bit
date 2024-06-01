import {
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  IconButton,
} from "@mui/material";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import usePreferences from "../Hooks/usePreferences";

export default function ButtonGroup({
  sx,
  force = false,
  buttonSX = { height: 50, minWidth: 150 },
  buttons = [],
  spacing,
  borderRadius = 0,
  border = "none",
  onSelect = () => {},
  intialSelected = "",
  elevation = 0,
}) {
  const { t } = useTranslation();
  const { theme, isThemeDark } = usePreferences();
  const [selected, setSelected] = useState(intialSelected);
  const scrollRef = useRef();

  return (
    <Paper
      ref={scrollRef}
      sx={{ ...sx, overflowX: "scroll" }}
      elevation={elevation}
    >
      <ToggleButtonGroup
        sx={{
          gridGap: spacing,
          alignSelf: "center",
          border: "0px",
          position: "relative",
        }}
        exclusive
        value={selected}
        onChange={(e, v) => {
          if (v != null || !force) {
            setSelected(v);
            onSelect(v, e);
          }
        }}
      >
        <IconButton
          disableRipple
          disableTouchRipple
          disableFocusRipple
          sx={{
            position: "sticky",
            left: 0,
            // height: "100%",
            borderRadius: 0,
            zIndex: 2,
            backgroundImage: !isThemeDark
              ? "linear-gradient(to right, rgba(255,255,255,1) 70% , rgba(255,255,255,0))"
              : "linear-gradient(to right, rgba(60,60,60,1) 70% , rgba(60,60,60,0))",
          }}
          onClick={() =>
            scrollRef.current.scroll({
              behavior: "smooth",
              left: scrollRef.current.scrollLeft - 250,
            })
          }
        >
          <ArrowLeft />
        </IconButton>

        {buttons.map(({ name, value }, index) => {
          console.log(name);
          return (
            <ToggleButton
              key={index}
              sx={{
                ...buttonSX,
                borderRadius: borderRadius,
                border: border,
                "&.MuiToggleButtonGroup-middleButton": {
                  borderRadius: borderRadius,
                  border: border,
                },
                "&.MuiToggleButtonGroup-firstButton": {
                  borderRadius: borderRadius,
                  border: border,
                },
                "&.MuiToggleButtonGroup-lastButton": {
                  borderRadius: borderRadius,
                  border: border,
                },
              }}
              value={value}
            >
              {t(name)}
            </ToggleButton>
          );
        })}
        <IconButton
          disableRipple
          disableTouchRipple
          disableFocusRipple
          sx={{
            position: "sticky",
            right: 0,
            borderRadius: 0,
            backgroundImage: !isThemeDark
              ? "linear-gradient(to left, rgba(255,255,255,1) 70% , rgba(255,255,255,0))"
              : "linear-gradient(to left, rgba(60,60,60,1) 70% , rgba(60,60,60,0))",
          }}
          onClick={() =>
            scrollRef.current.scroll({
              behavior: "smooth",
              left: scrollRef.current.scrollLeft + 250,
            })
          }
        >
          <ArrowRight />
        </IconButton>
      </ToggleButtonGroup>
    </Paper>
  );
}

ButtonGroup.propTypes = {
  border: PropTypes.oneOf(["none", "1px solid black"]),
  buttons: PropTypes.array.isRequired,
};
