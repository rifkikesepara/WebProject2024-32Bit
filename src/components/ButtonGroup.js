import { ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function ButtonGroup({
  sx,
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

  useEffect(() => {
    if (intialSelected != "") onSelect(intialSelected);
  }, [intialSelected]);

  return (
    <Paper sx={{ ...sx, overflowX: "scroll" }} elevation={elevation}>
      <ToggleButtonGroup
        sx={{
          // overflowX: "scroll",
          gridGap: spacing,
          alignSelf: "center",
          paddingInline: 1,
          border: "0px",
        }}
        exclusive
        value={intialSelected != "" ? selected : intialSelected}
        onChange={(e, v) => {
          setSelected(v);
          onSelect(v);
        }}
      >
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
      </ToggleButtonGroup>
    </Paper>
  );
}

ButtonGroup.propTypes = {
  border: PropTypes.oneOf(["none", "1px solid black"]),
  buttons: PropTypes.array.isRequired,
};
