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
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();
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
          setAlert({ text: t("loginSuccessful"), type: "success" });
        }, 2000);
        setTimeout(() => {
          navigate("/home");
        }, 3500);
      } else {
        setTimeout(() => {
          setAlert({ text: t("undefinedUser"), type: "error" });
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
        backgroundColor: theme.palette.background.default,
        // backgroundColor: theme.background,
        // backgroundColor: "#e7ecf1",
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
              {t("welcome")}
            </Typography>
            <Typography textAlign={"inherit"}>{t("loginDesc")}</Typography>
          </Box>
          <TextFieldVK
            disabled={loading}
            name="userCode"
            placeholder={t("userCode")}
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
            placeholder={t("password")}
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
            {t("login")}
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
          <Select
            value={localStorage.getItem("language")}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              localStorage.setItem("language", e.target.value);
            }}
          >
            <MenuItem value="tr">Türkçe</MenuItem>
            <MenuItem value="en">İngilizce</MenuItem>
          </Select>
        </Box>
      </Paper>
    </Box>
  );
}
