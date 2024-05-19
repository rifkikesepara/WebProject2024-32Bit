import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useRef, useState } from "react";
import useData from "../Hooks/useData";
import LOG from "../Debug/Console";
import { GetFromLocalStorage, SaveToLocalStorage } from "../Utils/utilities";

export default function OfferBox() {
  const i = useRef(0);

  const [animation, setAnimation] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [offers, setOffers] = useState(GetFromLocalStorage("offers"));

  const activeOffers = useMemo(
    () => offers.filter(({ activated }) => activated),
    [offers]
  );

  const setOffer = (offerID, active) => {
    const array = offers;
    const index = offers.indexOf(offers.find(({ id }) => id == offerID));
    array[index].activated = active;
    setOffers(array);
    SaveToLocalStorage("offers", array);
  };

  useData("./offers.json", (data) => {
    LOG("fetching offers...", "red");
    const array = [];
    data.map((data) => {
      array.push({ ...data, activated: true });
    });
    if (!GetFromLocalStorage("offers").length) {
      SaveToLocalStorage("offers", array);
      setOffers(array);
    }
  });

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Button
        key={0}
        sx={{ width: "100%", height: "100%" }}
        onClick={() => setOpenDialog(true)}
      >
        <Fade
          in={animation}
          timeout={1500}
          onEntered={() => setAnimation(false)}
          onExited={() => {
            if (i.current < activeOffers.length - 1) i.current += 1;
            else i.current = 0;
            setAnimation(true);
          }}
        >
          <Typography
            sx={{
              width: "100%",
              fontSize: { xs: 13, md: "1.5vw", sm: "1.7vw" },
            }}
          >
            {activeOffers[i.current]?.offerName}
          </Typography>
        </Fade>
      </Button>
      <Dialog
        maxWidth="lg"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { width: "50%" } }}
      >
        <Stack paddingBlock={3} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h4">Aktif Teklifler</Typography>
          <Box
            sx={{
              height: 200,
              width: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {offers.map((offer, index) => {
              return (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Checkbox
                    checked={offer.activated}
                    onChange={(e, value) => {
                      setOffer(offer.id, value);
                      i.current = 0;
                    }}
                  />
                  <Typography>{offer.offerName}</Typography>
                </Stack>
              );
            })}
          </Box>
        </Stack>
      </Dialog>
    </Stack>
  );
}
