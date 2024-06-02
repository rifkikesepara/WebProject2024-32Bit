import { Box, MenuItem, Paper, Select, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../Hooks/useAlert";
import TextFieldVK from "../../Components/TextFieldVK";
import useStore from "../../Hooks/useStore";
import { useTranslation } from "react-i18next";
import { SaveToSessionStorage } from "../../Utils/utilities";

export default function Login() {
  //mock user data
  const user = {
    userCode: "rifki",
    password: 123,
    employeeID: 254,
    name: "Rıfkı Kesepara",
  };

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const storeInfo = useStore();
  console.log(storeInfo);
  const { setAlert } = useAlert();

  const [loading, setLoading] = useState(false);

  const validateUser = (values) => {
    setLoading(true);
    // alert(JSON.stringify(values, null, 2));
    if (values.userCode == user.userCode && values.password == user.password) {
      console.log(values.userCode);
      setTimeout(() => {
        setAlert({ text: t("loginSuccessful"), type: "success" });
      }, 2000);
      setTimeout(() => {
        navigate("/home");
        SaveToSessionStorage("employee", {
          employeeID: 254,
          employeeName: user.name,
          loginTime: new Date().toLocaleString(),
        });
        SaveToSessionStorage("shift", {
          started: false,
          employeeID: 254,
          startTime: null,
          endTime: null,
          duration: null,
        });
      }, 3500);
    } else {
      setTimeout(() => {
        setAlert({ text: t("undefinedUser"), type: "error" });
        setLoading(false);
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      userCode: "",
      password: "",
    },
    onSubmit: validateUser,
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
        backgroundColor: "background.default",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", md: 614 },
          maxWidth: 614,
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
          <Typography>
            {t("version")} {storeInfo.version}
          </Typography>
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
