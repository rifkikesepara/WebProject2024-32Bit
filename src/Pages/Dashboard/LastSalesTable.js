import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

//the table that shows the latest 4 sales
export default function LastSalesTable({
  data = [],
  slice = 4,
  maxHeight = 230,
  adornment,
}) {
  const { t } = useTranslation();
  const temp = [...data];
  return (
    <TableContainer sx={{ maxHeight: maxHeight, overflowX: "hidden" }}>
      <Table size="small">
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 30,
          }}
        >
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
              {t("date")}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>
              {t("time")}
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: 20 }}
              align={"right"}
            >
              {t("sum")}
            </TableCell>
            {adornment && (
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 20 }}
                align="right"
              >
                Receipt
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {temp
            .reverse()
            .slice(0, slice)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontSize: 20 }}>
                  {row.time.toLocaleDateString()}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 20 }}>
                  {row.time.toLocaleTimeString()}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="right">
                  {`${row.amount.toFixed(2)}₺`}
                </TableCell>
                {adornment && (
                  <TableCell align="right">{adornment(row)}</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
