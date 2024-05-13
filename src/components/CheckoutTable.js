import { InfoRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
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

export const CheckoutTable = forwardRef(
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
                <TableCell sx={{ width: 50 }}>ADET</TableCell>
                <TableCell align="center" width={"100%"}>
                  ÜRÜN
                </TableCell>
                <TableCell align="right" width={50}>
                  FİYAT
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                ({ id, count, images, attributes, price, stock }, index) => {
                  return (
                    <TableRow key={id}>
                      <TableCell sx={{ padding: 0, textAlign: "center" }}>
                        <TextField
                          disabled={disabled}
                          autoComplete="off"
                          name={attributes.name}
                          value={count}
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
                            onFocus(event, { id });
                            event.target.select();
                          }}
                        />
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          padding: 0,
                          position: "relative",
                        }}
                      >
                        <IconButton
                          disableFocusRipple
                          disableRipple
                          onClick={() =>
                            setProductDetailWindow({ open: true, index: index })
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
                          value={id}
                          sx={{
                            border: "none",
                            display: "flex",
                            justifyContent: "space-between",
                            color: "black",
                            width: "100%",
                            paddingBlock: 2,
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
                                images.find(
                                  ({ imageType }) => imageType == "product"
                                ).url
                              }
                              width={50}
                            />
                            <Typography marginLeft={2} maxWidth={200}>
                              {attributes.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                minWidth: 50,
                                color:
                                  price.discounted != price.normal && "red",
                                textDecoration:
                                  price.discounted != price.normal &&
                                  "line-through",
                              }}
                              fontWeight={"bold"}
                              minWidth={50}
                            >
                              {(price.normal / 100) * count}₺
                            </Typography>
                            {price.discounted != price.normal && (
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  minWidth: 50,
                                  color: "green",
                                }}
                                fontWeight={"bold"}
                                minWidth={50}
                              >
                                {price.cashout / 100}₺
                              </Typography>
                            )}
                          </Box>
                        </ToggleButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
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
