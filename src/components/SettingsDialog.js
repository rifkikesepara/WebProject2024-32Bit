import { ArrowBack, Edit, Print } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePreferences from "../Hooks/usePreferences";
import { useTranslation } from "react-i18next";
import { ThemeToggleSwitch } from "./ThemeToggleSwitch";
import { OffersDialog, UsedOffersDialog } from "./OfferBox";
import { useRef, useState } from "react";
import { Receipt } from "./Receipt";
import { GetFromLocalStorage } from "../Utils/utilities";
import { useReactToPrint } from "react-to-print";

const Setting = ({ sx, children }) => {
  const { theme } = usePreferences();

  return (
    <Stack
      sx={{
        ...sx,
        alignSelf: "center",
        backgroundColor: theme.palette.background.default,
        borderRadius: 10,
        height: 80,
        paddingInline: 5,
      }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"80%"}
    >
      {children}
    </Stack>
  );
};

export default function SettingsDialog({ open }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isThemeDark, toggleTheme } = usePreferences();

  const receiptRef = useRef();
  const receipts = GetFromLocalStorage("receipts");

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const [offersDialog, setOffersDialog] = useState(false);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100vh",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <Dialog
        open={open}
        maxWidth="xl"
        PaperProps={{
          sx: { width: "100%", height: "100%" },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          position={"relative"}
          justifyContent={"center"}
          height={60}
        >
          <IconButton
            onClick={() => navigate("../home")}
            sx={{ position: "absolute", left: 0, fontSize: 40 }}
          >
            <ArrowBack fontSize="inherit" />
          </IconButton>
          <Typography fontSize={40}>Settings</Typography>
        </Stack>
        <Stack spacing={2}>
          <Setting>
            <Typography fontSize={30}>Tema</Typography>
            <ThemeToggleSwitch
              checked={isThemeDark}
              onChange={() => toggleTheme()}
            />
          </Setting>
          <Setting>
            <Typography fontSize={30}>Uygulama Dili</Typography>
            <Select
              variant="standard"
              value={localStorage.getItem("language")}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem("language", e.target.value);
              }}
            >
              <MenuItem value="tr">Türkçe</MenuItem>
              <MenuItem value="en">İngilizce</MenuItem>
            </Select>
          </Setting>
          <Setting>
            <Typography fontSize={30}>Kampanyalar</Typography>
            <IconButton
              sx={{ fontSize: 30 }}
              onClick={() => setOffersDialog(true)}
            >
              <Edit fontSize="inherit" />
            </IconButton>
            <OffersDialog
              open={offersDialog}
              onClose={() => setOffersDialog(false)}
            />
          </Setting>
          <Setting>
            <Typography fontSize={30}>Print Test</Typography>
            <IconButton sx={{ fontSize: 30 }} onClick={handlePrint}>
              <Print fontSize="inherit" />
            </IconButton>
          </Setting>
        </Stack>
      </Dialog>
      <Box sx={{ overflow: "hidden", height: 0 }}>
        <Receipt
          ref={receiptRef}
          payment={receipts[0].payment}
          cashout={receipts[0].products}
        />
      </Box>
    </Paper>
  );
}