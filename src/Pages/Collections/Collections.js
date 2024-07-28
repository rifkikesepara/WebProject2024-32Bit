import {
  Button,
  Dialog,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  GetFromSessionStorage,
  getDateFromString,
} from "../../Utils/utilities";
import { useNavigate } from "react-router-dom";
import {
  getCollapsedReceiptsByDate,
  getReceiptFromID,
} from "../../Utils/receipts";
import { useMemo, useRef, useState } from "react";
import ChartLine from "../../Components/ChartLine";
import LastSalesTable from "../Dashboard/LastSalesTable";
import { Receipt } from "../../Components/Receipt";
import usePreferences from "../../Hooks/usePreferences";
import DialogWithButtons from "../../Components/DialogWithButtons";
import { useTranslation } from "react-i18next";

export default function Collections() {
  const navigate = useNavigate();
  const { isDesktop } = usePreferences();
  const { t } = useTranslation();
  const receiptRef = useRef();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState();
  const user = GetFromSessionStorage("employee");

  const receipts = getCollapsedReceiptsByDate();

  const chartData = useMemo(() => {
    const temp = [];
    receipts.map((receipt) => {
      if (selectedDate == receipt.date)
        receipt.receipts.map((receipt) => {
          temp.push({
            id: receipt.id,
            time: getDateFromString(receipt.date),
            amount: receipt.payment.total,
            discount: receipt.payment.discount,
            payback: receipt.payment.payback,
          });
        });
    });
    return temp;
  }, [receipts]);

  const total = useMemo(() => {
    let total = 0;
    chartData.map((sale) => (total += sale.amount));
    return total;
  }, [chartData]);

  console.log(chartData);
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={3}
      sx={{ backgroundColor: "background.default" }}
    >
      <Paper sx={{ width: "90%", p: 1, borderRadius: 5, minHeight: 80 }}>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
          position={"relative"}
        >
          <Stack position={"absolute"} left={0}>
            <Typography>
              {t("totalEarning")}: {total.toFixed(2)}₺
            </Typography>
          </Stack>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h4">{user.employeeName}</Typography>
          </Stack>
          <Stack position={"absolute"} right={0}>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {receipts.map((receipt) => {
                return <MenuItem value={receipt.date}>{receipt.date}</MenuItem>;
              })}
            </Select>
          </Stack>
        </Stack>
      </Paper>
      <Stack direction={isDesktop ? "row" : "column"} width={"90%"} spacing={4}>
        <Paper
          sx={{
            width: "100%",
            height: isDesktop ? "100%" : 300,
            p: 1,
            borderRadius: 5,
          }}
        >
          <ChartLine chartData={chartData} />
        </Paper>
        <Paper sx={{ p: 1, borderRadius: 5, minHeight: isDesktop && 500 }}>
          {/* TODO: Add scroll buttons */}
          <LastSalesTable
            data={chartData}
            slice={chartData.length}
            maxHeight={isDesktop ? "unset" : 240}
            adornment={(data) => (
              <Button
                variant="contained"
                onClick={() => {
                  setShowReceipt(true);
                  setSelectedReceipt(getReceiptFromID(data.id));
                }}
              >
                {t("show")}
              </Button>
            )}
          />
          <DialogWithButtons
            open={showReceipt}
            scrollRef={receiptRef}
            onClose={() => setShowReceipt(false)}
          >
            <Receipt
              sx={{
                overflowY: "scroll",
                height: 600,
                justifyContent: "flex-start",
              }}
              ref={receiptRef}
              receiptData={selectedReceipt}
            />
          </DialogWithButtons>
        </Paper>
      </Stack>
      <Button
        variant="contained"
        onClick={() => navigate("../home")}
        sx={{ paddingBlock: isDesktop ? 4 : 1, borderRadius: 5, width: 400 }}
      >
        {t("goBack")}
      </Button>
    </Stack>
  );
}
