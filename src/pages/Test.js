import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import TextFieldVK from "../Components/TextFieldVK";
import Products from "../Components/Products";

export default function Test() {
  const [input, setInput] = useState(true);
  let keyboard = useRef();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Button onClick={() => setInput(true)}>Open</Button>
      <Dialog maxWidth="xl" open={input} onClose={() => setInput(false)}>
        <Box width={"100%"} height={"100vh"} overflow={"hidden"}>
          <Box>
            <Typography>X</Typography>
          </Box>
          <Products
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingBottom: 10,
              marginBottom: "auto",
              height: "100%",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}
