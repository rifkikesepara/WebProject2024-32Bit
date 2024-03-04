import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useRef, useState } from "react";
import useData from "../Hooks/useData";
import { motion } from "framer-motion";

export default function Sale() {
  const navigate = useNavigate();
  const mainDiv = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsData, setProductsData] = useState([]);

  useData("https://dummyjson.com/products", (data) =>
    setProductsData(data.products)
  );

  const changeProductAmount = (increment) => {
    let newArray = cashout.map((a) => {
      var returnValue = { ...a };
      if (a.id == clickedItem) {
        returnValue = {
          ...returnValue,
          price: increment
            ? a.price + productsData.find(({ id }) => a.id == id).price
            : a.price - productsData.find(({ id }) => a.id == id).price,
          count: increment ? a.count + 1 : a.count - 1,
        };
      }

      return returnValue;
    });
    setCashout(newArray);
  };

  const [cashout, setCashout] = useState([]);

  const total = useMemo(() => {
    let total = 0;
    cashout.map(({ price }) => (total = total + price));
    return total;
  }, [cashout]);

  return (
    <Box sx={{ height: "100vh", display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, marginTop: 1 }}
            disableRipple
            onClick={() => navigate("../home")}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 35, marginRight: 2 }} />
          </IconButton>
          <TextField
            sx={{ width: "90%", marginTop: 1.5, marginLeft: 4 }}
            autoComplete="off"
            placeholder="Klavyeden Barkod Girişi"
          />
        </Box>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            height: "auto",
            paddingBlock: 2,
          }}
        >
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "center", horizontal: "left" }}
            open={menuOpen}
            elevation={1}
            onClose={() => setMenuOpen(false)}
            sx={{
              left: -130,
              top: -25,
            }}
            MenuListProps={{ sx: { padding: 0 } }}
          >
            <Button
              sx={{ height: 50, borderRight: 1, borderRadius: 0 }}
              onClick={() => changeProductAmount(true)}
            >
              +
            </Button>
            <Button
              sx={{ height: 50 }}
              onClick={() => changeProductAmount(false)}
            >
              -
            </Button>
          </Menu>
          {productsData.map(({ title, price, id, images }, index) => {
            return (
              <Button
                key={index}
                sx={{
                  width: 150,
                  height: 150,
                  border: "1px solid black",
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  position: "relative",
                }}
                onClick={() => {
                  if (!cashout.find((data) => data.name == title)) {
                    setCashout([
                      ...cashout,
                      { id: id, name: title, price: price, count: 1 },
                    ]);
                  } else {
                    let newArray = cashout.map((a) => {
                      var returnValue = { ...a };
                      if (a.name == title) {
                        returnValue = {
                          ...returnValue,
                          price: a.price + a.price,
                          count: a.count + 1,
                        };
                      }

                      return returnValue;
                    });
                    setCashout(newArray);
                  }
                }}
              >
                <img src={images[0]} width={"100%"} />
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    color: "black",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {title}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          borderLeft: 1,
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            height: "8%",
            borderBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() =>
              mainDiv.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            sx={{
              borderRadius: 5,
            }}
          >
            <QrCodeScannerIcon
              sx={{ fontSize: 40, color: "black", border: 1 }}
            />
            <motion.div
              style={{ display: "flex", alignItems: "center" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  border: 1,
                  borderLeft: 0,
                  color: "black",
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  padding: 0.5,
                  width: 100,
                }}
              >
                FİYAT GÖR
              </Typography>
            </motion.div>
          </IconButton>
          <IconButton>
            <DeleteForeverIcon sx={{ fontSize: 40, color: "black" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "70%",
            borderBottom: 1,
            overflowY: "scroll",
          }}
        >
          <ToggleButtonGroup
            value={selectedItems}
            onChange={(e, newformats) => setSelectedItems(newformats)}
            orientation="vertical"
            sx={{ width: "100%" }}
          >
            {cashout.map((data, index) => {
              return (
                <ToggleButton
                  onTouchMove={() => console.log("test")}
                  key={index}
                  value={data.id}
                  sx={{
                    border: "none",
                    display: "flex",
                    justifyContent: "space-around",
                    color: "black",
                  }}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setMenuOpen(true);
                    setClickedItem(data.id);
                  }}
                >
                  <Typography>{data.count}</Typography>
                  <Typography>{data.name}</Typography>
                  <Typography>{data.price}₺</Typography>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            borderBottom: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Accordion
            onChange={(e, expanded) => {
              setTimeout(() => {
                mainDiv.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 200);
            }}
            sx={{ margin: 0, width: "100%" }}
            disableGutters
            square
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Total: {total}₺</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Ara Toplam: 30.35₺</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "15%",
          }}
        >
          <Button ref={mainDiv} variant="contained" disableElevation>
            ÖDEMEYE İLERLE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
