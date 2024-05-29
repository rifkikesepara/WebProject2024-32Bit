import { Box, Stack } from "@mui/material";
import OfferBox from "../Components/OfferBox";
import Products from "../Components/Products";
import usePreferences from "../Hooks/usePreferences";

export default function Test() {
  const { theme } = usePreferences();
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Products />
      </Box>
    </Stack>
  );
}
