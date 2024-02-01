import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../resources/32bitlogo.png";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import VirtualKeyboard from "../components/VirtualKeyboard";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { usePreferences } from "../context/Theme";
import { useAlert } from "../context/AlertProvider";

export default function Login() {
  let keyboard = useRef();
  const [currentInput, setCurrentInput] = useState("");
  const [inputs, setInputs] = useState({ userCode: "", password: "" });
  const [showDialog, setShowDialog] = useState(false);

  const { theme, toggleTheme } = usePreferences();
  const { setAlert } = useAlert();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: {
          md: "row",
          sm: "column",
          xs: "column",
        },
        justifyContent: { xs: "center", sm: "center" },
        alignItems: { xs: "center", sm: "center" },
        backgroundColor: theme.background,
      }}
    >
      <Box
        sx={{
          width: { md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Logo} width={200} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { md: "40%", sm: "90%", xs: "90%" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography>Hoşgeldiniz!</Typography>
          <Typography>Lütfen kullanıcı kodu ve şifrenizi giriniz.</Typography>
        </Box>
        <TextField
          sx={{ marginBlock: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Kulanıcı Kodu"
          autoComplete="off"
          value={inputs.userCode}
          onClick={() => {
            setShowDialog(true);
            setCurrentInput("userCode");
          }}
        />
        <TextField
          sx={{ marginBlock: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Şifre"
          autoComplete="off"
          value={inputs.password}
          onClick={() => {
            setShowDialog(true);
            setCurrentInput("password");
          }}
        />
        <LoadingButton
          variant="contained"
          disableElevation
          fullWidth
          sx={{ paddingBlock: 2 }}
          href="/home"
        >
          Giriş
        </LoadingButton>
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          maxWidth="xl"
          PaperProps={{
            sx: {
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Box sx={{ width: "90%" }}>
            <Typography textAlign={"center"}>
              {currentInput == "userCode" ? "Kullanıcı kodunuzu" : "Şifrenizi"}{" "}
              giriniz.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <TextField
                value={
                  currentInput == "userCode" ? inputs.userCode : inputs.password
                }
                fullWidth
                autoComplete="off"
              />
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  keyboard.current.clearInput();
                  setInputs({ ...inputs, [currentInput]: "" });
                }}
              >
                Sil
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "90%",
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <VirtualKeyboard
              keyboardRef={(r) => (keyboard.current = r)}
              onChangeInput={(input) =>
                setInputs({ ...inputs, [currentInput]: input })
              }
            />
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setShowDialog(false);
              }}
              sx={{ padding: 5 }}
            >
              Giriş
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}
