import {
  Button,
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

export default function CheckoutTable({
  data,
  inputValues,
  selectionValues,
  onFocus = () => {},
  onChange = () => {},
}) {
  return (
    <TableContainer>
      <ToggleButtonGroup
        value={selectionValues}
        onChange={(e, newFormat) => {
          onChange(newFormat);
        }}
        orientation="vertical"
        sx={{ width: "100%", paddingBottom: 10 }}
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
            {data.map(({ id, count, images, name, price }, index) => {
              return (
                <TableRow key={id}>
                  <TableCell sx={{ padding: 0, textAlign: "center" }}>
                    <TextField
                      defaultValue={count}
                      autoComplete="off"
                      name={name}
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
                        onFocus(event, { id, name });
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
                      onClick={(e) => {}}
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
                          {name}
                        </Typography>
                      </Box>
                      <Typography fontWeight={"bold"} minWidth={50}>
                        {price / 100}₺
                      </Typography>
                    </ToggleButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ToggleButtonGroup>
    </TableContainer>
  );
}