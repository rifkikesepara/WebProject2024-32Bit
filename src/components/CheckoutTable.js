import { InfoRounded } from "@mui/icons-material";
import {
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
import { forwardRef, useState } from "react";
import ProductDetail from "./ProductDetail";
import { useTranslation } from "react-i18next";
import usePreferences from "../Hooks/usePreferences";

const CheckoutTable = forwardRef(
  (
    {
      sx,
      disabled = false,
      data,
      inputValues,
      selectionValues,
      onFocus = () => {},
      onChange = () => {},
    },
    ref
  ) => {
    const [productDetailWindow, setProductDetailWindow] = useState({
      open: false,
      index: 0,
    });
    const { t } = useTranslation();
    const { theme } = usePreferences();
    return (
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
          <Table stickyHeader sx={{ width: "100%" }} aria-label="sticky table">
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
                              maxWidth={200}
                              alignItems={"flex-start"}
                            >
                              <Typography>{product.attributes.name}</Typography>
                              {product.offer != undefined && (
                                <Typography
                                  variant="body2"
                                  sx={{ color: "red" }}
                                >
                                  {product.offer} x{product.offerApplied}
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
                                textDecoration: isDiscounted && "line-through",
                              }}
                              fontWeight={"bold"}
                              minWidth={50}
                            >
                              {(product.price.normal / 100) * product.count}₺
                            </Typography>
                            {isDiscounted && (
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  minWidth: 50,
                                  color: "green",
                                }}
                                fontWeight={"bold"}
                                minWidth={50}
                              >
                                {product.price.cashout / 100}₺
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
    );
  }
);

export default CheckoutTable;
