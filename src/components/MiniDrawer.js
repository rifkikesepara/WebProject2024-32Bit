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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowDownward,
  ArrowLeft,
  ArrowRight,
  ArrowUpward,
} from "@mui/icons-material";

const drawerWidth = 500;

const DrawerItems = React.forwardRef(
  ({ open, menuItems, oriantation }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <Paper
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: oriantation == "vertical" ? "column" : "row",
          width: "100%",
          height: "100%",
          backgroundColor: "background.paper",
          overflowX: oriantation == "vertical" ? "hidden" : "scroll",
          overflowY: oriantation == "vertical" ? "hidden" : "hidden",
          "&::-webkit-scrollbar": { backgroundColor: "grey" },
        }}
      >
        {menuItems.map((data, index) => {
          return (
            <Tooltip
              title={t(data.name.toLowerCase())}
              placement={oriantation == "vertical" ? "right" : "bottom"}
              arrow
              key={index}
            >
              <Box>
                <Button
                  fullWidth
                  onClick={() => {
                    if (data.onClick) data.onClick();
                    navigate(data.path);
                  }}
                >
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
                          width: 300,
                          transition: "opacity 0.2s ease",
                          transitionDelay: open && "0.2s",
                          opacity: open ? 1 : 0,
                        }}
                        boxSizing={"border-box"}
                      >
                        {t(data.name.toLowerCase())}
                      </Typography>
                    )}
                  </Box>
                </Button>
                <Divider />
              </Box>
            </Tooltip>
          );
        })}
      </Paper>
    );
  }
);

export default function MiniDrawer({
  expand = false,
  onOpen = () => {},
  items,
  oriantation = "vertical",
}) {
  const [open, setOpen] = React.useState(expand);

  const [top, setTop] = React.useState(0);
  const [bottom, setBottom] = React.useState(10);
  const scrollRefVertical = React.useRef();
  const scrollRefHorizontal = React.useRef();

  const handleScroll = (amount) => {
    const ref =
      oriantation == "vertical" ? scrollRefVertical : scrollRefHorizontal;
    const current =
      oriantation == "vertical"
        ? ref.current.scrollTop
        : ref.current.scrollLeft;

    ref.current.scroll({
      behavior: "smooth",
      top: oriantation == "vertical" && current + amount,
      left: oriantation != "vertical" && current + amount,
    });

    setTop(current + amount);

    if (oriantation == "vertical")
      setBottom(ref.current.scrollHeight - ref.current.clientHeight);
    else setBottom(ref.current.scrollWidth - ref.current.clientWidth);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    onOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onOpen(false);
  };
  return (
    <>
      <Paper
        ref={scrollRefVertical}
        sx={{
          position: oriantation == "vertical" ? "fixed" : "absolute",
          height: oriantation == "vertical" ? "100vh" : "auto",
          width:
            oriantation == "vertical" ? (!open ? 100 : drawerWidth) : "100%",
          transition: "width 0.2s linear",
          transitionDelay: !open && "0.2s",
          zIndex: 100,
          left: oriantation == "vertical" && 0,
          top: oriantation != "vertical" && 0,
          "&::-webkit-scrollbar": { height: 0, width: 0 },
          borderTopRightRadius: oriantation == "vertical" && 20,
          borderBottomRightRadius: oriantation == "vertical" && 20,
          overflow: "scroll",
        }}
        elevation={3}
        // onBlur={() => onOpen(false)}
      >
        {oriantation == "vertical" && (
          <Paper
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "background.paper",
              borderTopRightRadius: 20,
              overflow: "hidden",
            }}
            elevation={0}
          >
            <IconButton
              sx={{
                fontSize: 60,
                p: 0,
                ml: 2,
                color: "text.primary",
              }}
              onClick={!open ? handleDrawerOpen : handleDrawerClose}
            >
              {!open ? (
                <ChevronRightIcon fontSize="inherit" />
              ) : (
                <ChevronLeftIcon fontSize="inherit" />
              )}
            </IconButton>
            <Divider absolute />
          </Paper>
        )}
        <Box
          sx={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          {top > 0 && (
            <IconButton
              sx={{
                position: oriantation != "vertical" ? "absolute" : "fixed",
                bottom: oriantation == "vertical" && 0,
                left: 0,
                top: oriantation == "vertical" && 60,
                height: oriantation != "vertical" ? "100%" : 40,
                width:
                  oriantation == "vertical" ? (!open ? 100 : drawerWidth) : 40,
                borderRadius: 0,
                transition: "width 0.2s linear",
                transitionDelay: !open && "0.2s",
                backgroundColor: "background.paper",
                zIndex: 100,
              }}
              onClick={() => {
                handleScroll(-100);
              }}
            >
              {oriantation == "vertical" ? <ArrowUpward /> : <ArrowLeft />}
            </IconButton>
          )}
          <DrawerItems
            ref={scrollRefHorizontal}
            open={open}
            oriantation={oriantation}
            menuItems={items}
          />
          {top < bottom && (
            <IconButton
              sx={{
                position: oriantation != "vertical" ? "absolute" : "fixed",
                bottom: oriantation == "vertical" && 0,
                left: oriantation == "vertical" && 0,
                right: oriantation != "vertical" && 0,
                top: oriantation != "vertical" && 0,
                height: oriantation != "vertical" ? "100%" : 40,
                width:
                  oriantation == "vertical" ? (!open ? 100 : drawerWidth) : 40,
                borderRadius: 0,
                borderBottomRightRadius: oriantation == "vertical" && 20,
                transition: "width 0.2s linear",
                transitionDelay: !open && "0.2s",
                backgroundColor: "background.paper",
                zIndex: 100,
              }}
              onClick={() => {
                handleScroll(100);
              }}
            >
              {oriantation == "vertical" ? <ArrowDownward /> : <ArrowRight />}
            </IconButton>
          )}
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
          onClick={() => {
            setOpen(false);
            onOpen(false);
          }}
        />
      )}
    </>
  );
}
