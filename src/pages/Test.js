import { Box, Stack } from "@mui/material";
import OfferBox from "../Components/OfferBox";
import Products from "../Components/Products";
import usePreferences from "../Hooks/usePreferences";
import ReturnItemTable from "../Components/ReturnItemTable";

export default function Test() {
  const { theme } = usePreferences();
  return <ReturnItemTable />;
}
