import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LastSalesTable(data = []) {
  const { t } = useTranslation();
  const temp = [...data.data];
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
            {t("date")}
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>
            {t("time")}
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: 20 }} align="right">
            {t("sum")}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {temp
          .reverse()
          .slice(0, 4)
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ fontSize: 20 }}>
                {row.time.toLocaleDateString()}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 20 }}>
                {row.time.toLocaleTimeString()}
              </TableCell>
              <TableCell
                sx={{ fontSize: 20 }}
                align="right"
              >{`${row.amount.toFixed(2)}₺`}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
