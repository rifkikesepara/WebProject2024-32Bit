import {
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

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
  const [selected, setSelected] = useState(intialSelected);
  const scrollRef = useRef();

  // useEffect(() => {
  //   if (intialSelected != "") onSelect(intialSelected);
  // }, [intialSelected]);

  return (
    <Paper
      ref={scrollRef}
      sx={{ ...sx, overflowX: "scroll" }}
      elevation={elevation}
    >
      <ToggleButtonGroup
        sx={{
          // overflowX: "scroll",
          gridGap: spacing,
          alignSelf: "center",
          // paddingInline: 1,
          border: "0px",
          position: "relative",
          // width: "100%",
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
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1) 70% , rgba(255,255,255,0))",
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
              {name}
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
            // height: "100%",
            borderRadius: 0,
            backgroundImage:
              "linear-gradient(to left, rgba(255,255,255,1) 70% , rgba(255,255,255,0))",
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
