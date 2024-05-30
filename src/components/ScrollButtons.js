import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { IconButton, Paper, Stack } from "@mui/material";
import React from "react";

export default function ScrollButtons({
  sx,
  scrollRef,
  direction = "row",
  startAdornment = <></>,
  endAdornment = <></>,
  elevation = 1,
}) {
  return (
    <Stack
      justifyContent={"center"}
      spacing={2}
      direction={direction}
      sx={{ position: "absolute", ...sx }}
    >
      {startAdornment}
      <Paper elevation={elevation}>
        <IconButton
          sx={{ borderRadius: 0 }}
          onClick={() =>
            scrollRef.current?.scroll({
              behavior: "smooth",
              top: scrollRef.current?.scrollTop - 250,
            })
          }
        >
          <ArrowUpward />
        </IconButton>
      </Paper>
      <Paper elevation={elevation}>
        <IconButton
          sx={{ borderRadius: 0 }}
          onClick={() =>
            scrollRef.current?.scroll({
              behavior: "smooth",
              top: scrollRef.current?.scrollTop + 250,
            })
          }
        >
          <ArrowDownward />
        </IconButton>
      </Paper>
      {endAdornment}
    </Stack>
  );
}
