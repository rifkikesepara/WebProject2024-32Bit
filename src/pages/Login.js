import {
  Box,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Hooks/useAlert";
import usePreferences from "../Hooks/usePreferences";
import TextFieldVK from "../Components/TextFieldVK";
import useStore from "../Hooks/useStore";

export default function Login() {
  const user = { userCode: "admin", password: 123 };

  const navigate = useNavigate();
  const storeInfo = useStore();

  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = usePreferences();
  const { setAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      userCode: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
        backgroundColor: "#e7ecf1",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 614,
          p: 2,
        }}
        elevation={3}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography textAlign={"inherit"} variant="h4" fontWeight={"bold"}>
              Hoşgeldiniz!
            </Typography>
            <Typography textAlign={"inherit"}>
              Lütfen kullanıcı kodu ve şifrenizi giriniz.
            </Typography>
          </Box>
          <TextFieldVK
            disabled={loading}
            placeholder="Kullanıcı Kodu"
            name="userCode"
            inputSX={{ width: "100%" }}
            value={formik.values.userCode}
            onChange={(event, value) => {
              formik.setValues({ ...formik.values, userCode: value });
            }}
            onClear={() => {
              formik.setValues({ ...formik.values, userCode: "" });
            }}
            startAdornment={<AccountCircle />}
          />
          <TextFieldVK
            disabled={loading}
            placeholder="Şifre"
            name="password"
            type="password"
            inputSX={{ width: "100%", marginBlock: 1 }}
            value={formik.values.password}
            onChange={(event, value) => {
              formik.setValues({ ...formik.values, password: value });
            }}
            onClear={() => {
              formik.setValues({ ...formik.values, password: "" });
            }}
            startAdornment={<HttpsIcon />}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ paddingBlock: 2 }}
            loading={loading}
          >
            Giriş
          </LoadingButton>
        </form>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Version {storeInfo.version}</Typography>
          <Select>
            <MenuItem>Türkçe</MenuItem>
            <MenuItem>İngilizce</MenuItem>
          </Select>
        </Box>
      </Paper>
    </Box>
  );
}
