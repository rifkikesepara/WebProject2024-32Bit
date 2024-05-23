import { Info, InfoRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useMemo, useState } from "react";
import ProductDetail from "./ProductDetail";
import { useTranslation } from "react-i18next";
import usePreferences from "../Hooks/usePreferences";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LOG from "../Debug/Console";
import { GetFromSessionStorage } from "../Utils/utilities";
import { UsedOffersDialog } from "./OfferBox";

const CheckoutTable = forwardRef(
  (
    {
      sx,
      disabled = false,
      data,
      selectionValues,
      accordionVisible = true,
      onFocus = () => {},
      onChange = () => {},
    },
    ref
  ) => {
    const [productDetailWindow, setProductDetailWindow] = useState({
      open: false,
      index: 0,
    });
    const [offerDetail, setOfferDetail] = useState(false);
    const { t } = useTranslation();
    const { theme } = usePreferences();

    const totals = useMemo(() => {
      LOG("total calculated!", "yellow");
      let total = 0,
        subTotal = 0,
        payback = 0,
        discount = 0;

      data.map(({ price, count }) => {
        total = total + price.cashout;
        subTotal += price.normal * count;
      });
      GetFromSessionStorage("usedOffers").map(
        (offer) => (payback += offer.payback)
      );
      discount = subTotal - total - payback;
      return {
        total: total / 100,
        subTotal: subTotal / 100,
        payback: payback / 100,
        discount: discount / 100,
      };
    }, [data, data.length]);

    return (
      <>
        <TableContainer ref={ref}>
          <ToggleButtonGroup
            // disabled={disabled}
            value={selectionValues}
            onChange={(e, newFormat) => {
              onChange(newFormat);
            }}
            orientation="vertical"
            sx={{ width: "100%", paddingBottom: 10, ...sx }}
          >
            <Table
              stickyHeader
              sx={{ width: "100%" }}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: 50,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    {t("amount")}
                  </TableCell>
                  <TableCell
                    align="center"
                    width={"100%"}
                    sx={{ backgroundColor: theme.palette.background.paper }}
                  >
                    {t("product")}
                  </TableCell>
                  <TableCell
                    align="right"
                    width={50}
                    sx={{ backgroundColor: theme.palette.background.paper }}
                  >
                    {t("price")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product, index) => {
                  const isDiscounted =
                    product.price.cashout !=
                      product.count * product.price.discounted ||
                    product.price.discounted != product.price.normal;
                  return (
                    <TableRow key={product.id}>
                      <TableCell sx={{ padding: 0, textAlign: "center" }}>
                        <TextField
                          disabled={disabled}
                          autoComplete="off"
                          name={product.attributes.name}
                          value={product.count}
                          inputProps={{
                            sx: {
                              textAlign: "center",
                              border: "none",
                              minHeight: 70,
                            },
                          }}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          onFocus={(event) => {
                            onFocus(event, product);
                            event.target.select();
                          }}
                        />
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          padding: 0,
                        }}
                      >
                        <Box
                          sx={{
                            padding: 0,
                            position: "relative",
                          }}
                        >
                          <IconButton
                            disableFocusRipple
                            disableRipple
                            onClick={() =>
                              setProductDetailWindow({
                                open: true,
                                index: index,
                              })
                            }
                            sx={{
                              height: "100%",
                              position: "absolute",
                              left: 15,
                              zIndex: 10,
                            }}
                          >
                            <InfoRounded sx={{ opacity: 0 }} />
                          </IconButton>
                          <ToggleButton
                            key={index}
                            value={product.id}
                            sx={{
                              border: "none",
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              paddingBlock: 2,
                              color: theme.palette.text.primary,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={
                                  product.images.find(
                                    ({ imageType }) => imageType == "product"
                                  ).url
                                }
                                width={50}
                              />
                              <Stack
                                marginLeft={2}
                                maxWidth={320}
                                alignItems={"flex-start"}
                              >
                                <Typography
                                  textAlign={"left"}
                                  width={"fit-content"}
                                >
                                  {product.attributes.name}
                                </Typography>
                                {product.offer != undefined &&
                                  product.offer != [] && (
                                    <Typography
                                      key={index}
                                      variant="body2"
                                      sx={{ color: "red", textAlign: "left" }}
                                    >
                                      {product.offer.offerName} x
                                      {product.offer.offerApplied}
                                    </Typography>
                                  )}
                              </Stack>
                            </Box>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  minWidth: 50,
                                  color: isDiscounted && "red",
                                  textDecoration:
                                    isDiscounted && "line-through",
                                }}
                                fontWeight={"bold"}
                                minWidth={50}
                              >
                                {(
                                  (product.price.normal / 100) *
                                  product.count
                                ).toFixed(2)}
                                ₺
                              </Typography>
                              {isDiscounted && (
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    minWidth: 50,
                                  }}
                                  fontWeight={"bold"}
                                  minWidth={50}
                                >
                                  {(product.price.cashout / 100).toFixed(2)}₺
                                </Typography>
                              )}
                            </Box>
                          </ToggleButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <ProductDetail
                  open={productDetailWindow.open}
                  product={data[productDetailWindow.index]}
                  onClose={() => setProductDetailWindow(false)}
                />
              </TableBody>
            </Table>
          </ToggleButtonGroup>
        </TableContainer>
        {accordionVisible && (
          <Accordion
            // onChange={(e, expanded) => {}}
            sx={{
              margin: 0,
              width: "100%",
              position: "sticky",
              bottom: 0,
            }}
            disableGutters
            square
            elevation={5}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {t("total")}: {totals.total}₺
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("subTotal")}: {totals.subTotal}₺
              </Typography>
              {GetFromSessionStorage("usedOffers").length != 0 && (
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography color={"red"}>
                    KAMPANYALAR: -{totals.payback}₺
                  </Typography>
                  <IconButton onClick={() => setOfferDetail(true)}>
                    <Info />
                  </IconButton>
                  <UsedOffersDialog
                    open={offerDetail}
                    onClose={() => setOfferDetail(false)}
                  />
                </Stack>
              )}
              {totals.discount != 0 && (
                <Typography color={"red"}>
                  İNDİRİM: -{totals.discount}₺
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </>
    );
  }
);

export default CheckoutTable;
