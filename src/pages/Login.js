import { Box, Typography } from "@mui/material";
import Logo from "../resources/32bitlogo.png";

export default function Login() {
  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Logo} width={200} />
      </Box>
    </Box>
  );
}
