import {
  Box,
  Button,
  Dialog,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../Resources/32bitlogo.png";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { usePreferences } from "../Context/Theme";
import { useAlert } from "../Context/AlertProvider";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let keyboard = useRef();
  const navigate = useNavigate();

  const [currentInput, setCurrentInput] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = { userCode: "", password: "" };

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
        setAlert({ text: "Kullanıcı geçersiz!", type: "error" });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/30693e9e-34e8-45ae-98eb-8198b6b22781")
      // .get("https://run.mocky.io/v3/8d1913e8-b59b-4708-8f84-4cec4452db54")
      // .then((reposne) => setUser(reposne.data[0]))
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  }, []);

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
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ width: "100%" }}>
            <Typography>Hoşgeldiniz!</Typography>
            <Typography>Lütfen kullanıcı kodu ve şifrenizi giriniz.</Typography>
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
                value={
                  currentInput == "userCode"
                    ? formik.values.userCode
                    : formik.values.password
                }
                fullWidth
                autoComplete="off"
                onChange={(event) => {
                  const input = event.target.value;
                  keyboard.setInput(input);
                }}
              />
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  keyboard.current.clearInput();
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
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <VirtualKeyboard
              keyboardRef={(r) => (keyboard.current = r)}
              onChangeInput={(input) =>
                formik.setValues({ ...formik.values, [currentInput]: input })
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
