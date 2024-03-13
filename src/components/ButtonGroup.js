import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

export default function ButtonGroup({
  sx,
  buttons = [],
  spacing,
  borderRadius = 0,
  border = "none",
  onSelect = () => {},
}) {
  const [selected, setSelected] = useState();

  return (
    <ToggleButtonGroup
      sx={{
        overflowX: "scroll",
        gridGap: spacing,
        alignSelf: "center",
        padding: 1,
        border: "0px",
      }}
      exclusive
      value={selected}
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
              height: 50,
              minWidth: 150,
              // boxShadow: "1px 1px 10px 1px #d4d4d4",
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
  );
}
