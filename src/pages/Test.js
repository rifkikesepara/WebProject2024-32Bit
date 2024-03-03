import { Card, Container, TextField, Typography } from "@mui/material";
import VirtualKeyboard from "../Components/VirtualKeyboard";
import { useRef, useState } from "react";
import TextFieldVK from "../Components/TextFieldVK";

export default function Test() {
  const [input, setInput] = useState("");
  let keyboard = useRef();
  return (
    <Container sx={{ backgroundColor: "red" }}>
      <Card
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <TextField
          value={input}
          onChange={(e) => {
            keyboard.current.setInput(e.target.value);
            setInput(e.target.value);
          }}
          sx={{ marginTop: 1, width: "100%" }}
          placeholder="Input here..."
          autoComplete="off"
        />
        <VirtualKeyboard
          keyboardRef={keyboard}
          sx={{ width: "60%", height: 200 }}
          onChangeInput={(input) => {
            setInput(input);
          }}
        /> */}
        <TextFieldVK />
      </Card>
    </Container>
  );
}
