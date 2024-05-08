import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../Resources/32bitlogo.png";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import { useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { usePreferences } from "../Context/Theme";
import { useAlert } from "../Context/AlertProvider";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = { userCode: "admin", password: 123 };

  const keyboard = useRef();
  const navigate = useNavigate();

  const [currentInput, setCurrentInput] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = usePreferences();
  const { setAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      userCode: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      // alert(JSON.stringify(values, null, 2));
      if (
        values.userCode == user.userCode &&
        values.password == user.password
      ) {
        console.log(values.userCode);
        setTimeout(() => {
          setAlert({ text: "Başarıyla giriş yapıldı", type: "success" });
        }, 2000);
        setTimeout(() => {
          navigate("/home");
        }, 3500);
      } else {
        setTimeout(() => {
          setAlert({ text: "Kullanıcı geçersiz!", type: "error" });
          setLoading(false);
        }, 2000);
      }
    },
  });

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
        // backgroundColor: theme.background,
        backgroundColor: "#e7ecf1",
      }}
    >
      {/* <Box
        sx={{
          width: { md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Logo} width={200} />
      </Box> */}
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // width: { md: "40%", sm: "90%", xs: "90%" },
          p: 2,
        }}
        elevation={3}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography textAlign={"inherit"} variant="h4" fontWeight={"bold"}>
              Hoşgeldiniz!
            </Typography>
            <Typography textAlign={"inherit"}>
              Lütfen kullanıcı kodu ve şifrenizi giriniz.
            </Typography>
          </Box>
          <TextField
            disabled={loading}
            name="userCode"
            sx={{ marginBlock: 2 }}
            onChange={formik.handleChange}
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
            value={formik.values.userCode}
            onClick={() => {
              setShowDialog(true);
              setCurrentInput("userCode");
            }}
          />
          <TextField
            disabled={loading}
            type="password"
            name="password"
            sx={{ marginBlock: 2 }}
            onChange={formik.handleChange}
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
            value={formik.values.password}
            onClick={() => {
              setShowDialog(true);
              setCurrentInput("password");
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ paddingBlock: 2 }}
            loading={loading}
            // href="/home"
          >
            Giriş
          </LoadingButton>
        </form>
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          maxWidth="md"
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
                name={currentInput}
                value={
                  currentInput == "userCode"
                    ? formik.values.userCode
                    : formik.values.password
                }
                fullWidth
                autoComplete="off"
                onChange={(event) => {
                  formik.handleChange(event);
                  const input = event.target.value;
                  keyboard.current?.setInput(input);
                }}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  keyboard.current?.setInput("");
                  console.log(keyboard.current);
                  formik.setValues({ ...formik.values, [currentInput]: "" });
                }}
              >
                Sil
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <VirtualKeyboard
              sx={{ width: "100%" }}
              ref={keyboard}
              onChangeInput={(input) =>
                formik.setValues({ ...formik.values, [currentInput]: input })
              }
              onPress={(key) => {
                if (key == "{enter}") {
                  setShowDialog(false);
                }
              }}
            />
            {/* <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setShowDialog(false);
              }}
              sx={{ padding: 5 }}
            >
              Giriş
            </Button> */}
          </Box>
        </Dialog>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Version 1.2.3</Typography>
          <Select>
            <MenuItem>Türkçe</MenuItem>
            <MenuItem>İngilizce</MenuItem>
          </Select>
        </Box>
      </Paper>
    </Box>
  );
}
