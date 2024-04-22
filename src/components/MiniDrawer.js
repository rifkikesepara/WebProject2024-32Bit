import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Paper, Box, IconButton, List, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 500;

export default function MiniDrawer({ open, onOpen = () => {}, items }) {
  const handleDrawerOpen = () => {
    onOpen(true);
  };

  const handleDrawerClose = () => {
    onOpen(false);
  };
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          height: "100vh",
          width: !open ? 100 : drawerWidth,
          transition: "width 0.2s ease-in-out",
          zIndex: 100,
          backgroundColor: "white",
          overflowX: "hidden",
          overflowY: "scroll",
          left: 0,
        }}
        elevation={3}
        // onBlur={() => onOpen(false)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
          }}
        >
          <IconButton
            sx={{ fontSize: 60, p: 0, ml: 2 }}
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
          >
            {!open ? (
              <ChevronRightIcon fontSize="inherit" />
            ) : (
              <ChevronLeftIcon fontSize="inherit" />
            )}
            {/* <MenuIcon fontSize="inherit" /> */}
          </IconButton>
          <Divider absolute />
        </Box>
        <List disablePadding>{items()}</List>
      </Paper>
      {open && (
        <Box
          sx={{
            position: "absolute",
            // left: "100%",
            width: "100vw",
            height: "100vh",
            // backgroundColor: "green",
          }}
          onClick={() => onOpen(false)}
        />
      )}
    </>
  );
}
