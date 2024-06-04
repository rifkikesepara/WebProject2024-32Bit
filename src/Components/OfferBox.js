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
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToLocalStorage,
} from "../Utils/utilities";
import DialogWithButtons from "./DialogWithButtons";
import { useTranslation } from "react-i18next";

//shows the offers that is used and the payback amount from that offer
export const UsedOffersDialog = ({ open, onClose = () => {} }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      PaperProps={{ sx: { p: 2 } }}
    >
      {GetFromSessionStorage("usedOffers").map((offer) => {
        return (
          <Stack
            key={offer.id}
            direction={"row"}
            spacing={5}
            justifyContent={"space-between"}
          >
            <Typography>{offer.offerName}</Typography>
            <Typography fontWeight={"bold"}>{offer.payback / 100}₺</Typography>
          </Stack>
        );
      })}
    </Dialog>
  );
};

//a dialog to set the activeness of the offers
export const OffersDialog = ({
  open,
  onClose = () => {},
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const scrollRef = useRef();

  const [offers, setOffers] = useState(GetFromLocalStorage("offers"));

  //changes the activeness of the offer
  const changeActiveOffers = (offer, active) => {
    const temp = [...offers];
    const index = temp.indexOf(temp.find((data) => data.id == offer.id));
    temp[index].activated = active;
    setOffers(temp);
    SaveToLocalStorage("offers", temp);
  };

  return (
    <DialogWithButtons
      scrollRef={scrollRef}
      open={open}
      onClose={onClose}
      sx={{ width: "50%" }}
    >
      <Stack paddingBlock={3} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h4">{t("offers")}</Typography>
        <Box
          ref={scrollRef}
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
                  disabled={readOnly}
                  checked={offer.activated}
                  onChange={(e, checked) => changeActiveOffers(offer, checked)}
                />
                <Typography>{offer.offerName}</Typography>
              </Stack>
            );
          })}
        </Box>
      </Stack>
    </DialogWithButtons>
  );
};

export default function OfferBox() {
  const i = useRef(0);

  const [animation, setAnimation] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [offers, setOffers] = useState(GetFromLocalStorage("offers"));

  //getting active offers
  const activeOffers = useMemo(
    () => offers.filter(({ activated }) => activated),
    [offers]
  );

  //fetching the offers datas
  useData("../offers.json", (data) => {
    LOG("fetching offers...", "red");
    const array = [];
    data.map((data) => {
      array.push({ ...data });
    });
    if (GetFromLocalStorage("offers").length != array.length) {
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
              fontSize: { xs: 13, md: 16, sm: "1.7vw" },
            }}
          >
            {activeOffers[i.current]?.offerName}
          </Typography>
        </Fade>
      </Button>
      <OffersDialog
        readOnly={true}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Stack>
  );
}
