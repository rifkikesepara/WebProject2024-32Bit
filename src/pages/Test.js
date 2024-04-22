import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Paper } from "@mui/material";

const drawerWidth = 300;

const Drawer = ({ open, onOpen = () => {} }) => {
  const handleDrawerOpen = () => {
    onOpen(true);
  };

  const handleDrawerClose = () => {
    onOpen(false);
  };
  return (
    <Paper
      sx={{
        position: "fixed",
        height: "100vh",
        width: !open ? 70 : drawerWidth,
        transition: "width 0.2s linear",
        zIndex: 100,
        backgroundColor: "white",
        left: 0,
      }}
      elevation={3}
    >
      <Box
        sx={{
          width: 50,
          display: "flex",
          justifyContent: "center",
          ml: 1,
        }}
      >
        <IconButton
          sx={{ fontSize: 30 }}
          onClick={!open ? handleDrawerOpen : handleDrawerClose}
        >
          {!open ? (
            <ChevronRightIcon fontSize="inherit" />
          ) : (
            <ChevronLeftIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                height: 60,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                height: 60,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "100%",
          width: "100vw",
          height: "100vh",
          // backgroundColor: "green",
        }}
        onClick={() => onOpen(false)}
      />
    </Paper>
  );
};

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <Drawer open={open} onOpen={(o) => setOpen(o)} />
      <Box sx={{ ml: 20, height: 500, width: 800, border: 1 }}>
        <Typography>Denem</Typography>
      </Box>
    </Box>
  );
}
