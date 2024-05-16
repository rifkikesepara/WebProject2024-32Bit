import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

const texts = [
  { text: "one", activated: true },
  { text: "two", activated: true },
  { text: "three", activated: true },
];

export default function OfferBox() {
  const [animation, setAnimation] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const i = useRef(0);
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Button sx={{ width: "100%", height: "100%" }}>
        <Fade
          in={animation}
          timeout={1500}
          onEntered={() => setAnimation(false)}
          onExited={() => {
            if (i.current == texts.length - 1) {
              for (let index = 0; index < texts.length; index++) {
                if (texts[index].activated) {
                  i.current = index;
                  break;
                }
              }
            } else {
              do {
                i.current += 1;
              } while (!texts[i.current].activated);
            }
            setAnimation(true);
          }}
          onClick={() => setOpenDialog(true)}
        >
          <Typography width={"100%"}>{texts[i.current].text}</Typography>
        </Fade>
      </Button>
      <Dialog
        maxWidth="lg"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Stack
          //   height={"80vh"}
          width={"80vw"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4">Aktif Teklifler</Typography>
          <Box height={100} overflow={"scroll"} width={"50%"}>
            {texts.map((text, index) => {
              return (
                <Stack
                  key={index}
                  width={"20%"}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Checkbox
                    checked={text.activated}
                    onChange={(e, c) => (text.activated = c)}
                  />
                  <Typography>{text.text}</Typography>
                </Stack>
              );
            })}
          </Box>
        </Stack>
      </Dialog>
    </Stack>
  );
}
