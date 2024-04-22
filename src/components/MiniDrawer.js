import * as React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Paper,
  Box,
  IconButton,
  Divider,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 500;

const DrawerItems = ({ menuItems, oriantation }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: oriantation == "vertical" ? "column" : "row",
        width: "100%",
      }}
    >
      {menuItems.map((data, index) => {
        return (
          <Tooltip title={data.name} placement="right" arrow>
            <Box key={index}>
              <Button fullWidth onClick={() => navigate(data.path)}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    height: { md: 50, sm: 50, xs: 30 },
                    borderRadius: 5,
                    marginBlock: 2,
                    cursor: "pointer",
                    paddingRight: 1,
                  }}
                >
                  {data.icon}
                  {oriantation == "vertical" && (
                    <Typography
                      sx={{
                        fontSize: { md: 30, sm: 30, xs: 20 },
                        fontWeight: "bold",
                        marginLeft: 2,
                        color: "black",
                        width: 300,
                      }}
                      boxSizing={"border-box"}
                    >
                      {data.name}
                    </Typography>
                  )}
                </Box>
              </Button>
              <Divider />
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default function MiniDrawer({
  open,
  onOpen = () => {},
  items,
  oriantation = "vertical",
}) {
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
          position: oriantation == "vertical" ? "fixed" : "absolute",
          height: oriantation == "vertical" ? "100vh" : "auto",
          width:
            oriantation == "vertical" ? (!open ? 100 : drawerWidth) : "100%",
          transition: "width 0.2s ease-in-out",
          zIndex: 100,
          backgroundColor: "white",
          overflowX: oriantation == "vertical" ? "hidden" : "scroll",
          overflowY: oriantation == "vertical" ? "scroll" : "hidden",
          left: oriantation == "vertical" && 0,
          top: oriantation != "vertical" && 0,
          "&::-webkit-scrollbar": { height: 0 },
        }}
        elevation={3}
        // onBlur={() => onOpen(false)}
      >
        {oriantation == "vertical" && (
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
            </IconButton>
            <Divider absolute />
          </Box>
        )}
        <Box
          sx={
            {
              // display: "flex",
              // flexDirection: "column",
            }
          }
          disablePadding
        >
          <DrawerItems oriantation={oriantation} menuItems={items} />
        </Box>
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
