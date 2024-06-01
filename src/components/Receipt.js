import { Box, Stack, Typography } from "@mui/material";
import { forwardRef, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollButtons from "./ScrollButtons";
import {
  GetFromSessionStorage,
  getValueByPercentege,
} from "../Utils/utilities";
import { getTotalTaxOfReceipt } from "../Utils/receipts";

export const ReceiptWithScrollButtons = forwardRef(
  ({ sx, receiptData = GetFromSessionStorage("currentReceipt") }, ref) => {
    const scrollRef = useRef();
    return (
      <Stack sx={{ position: "relative" }}>
        <ScrollButtons
          sx={{ position: "absolute", top: -50, right: "38%" }}
          scrollRef={scrollRef}
        />
        <Receipt ref={scrollRef} sx={sx} receiptData={receiptData} />
      </Stack>
    );
  }
);

export const ReturnReceipt = forwardRef(({ sx, returnedItems = [] }, ref) => {
  const { t } = useTranslation();
  console.log(returnedItems);
  // const date = returnedItems.date.split(" ")[0].split(".");
  // const time = returnedItems.date.split(" ")[1].split(":");

  const total = useMemo(() => {
    let total = 0;
    returnedItems.products.map(({ price }) => (total += price.cashout));
    return total / 100;
  }, [returnedItems]);

  return (
    <Box
      ref={ref}
      sx={{
        width: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: 3,
        paddingInline: 4,
        ...sx,
      }}
    >
      <Typography>32-Bit Market</Typography>
      <Typography>RIFKI KESEPARA</Typography>
      <Typography textAlign={"center"} textTransform={"uppercase"}>
        Bağdat Cad. Kumbaracılar Sk. No:18
      </Typography>
      <Typography textAlign={"center"} textTransform={"uppercase"}>
        Feneryolu / İstanbul
      </Typography>
      <Typography textAlign={"center"}>
        {t("returnReceipt").toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Box>
          <Typography>{returnedItems?.date.toLocaleDateString()}</Typography>
          <Typography>
            {t("time").toUpperCase()}:{" "}
            {returnedItems?.date.toLocaleTimeString()}
          </Typography>
        </Box>
        <Typography>
          {t("receiptID")}: {returnedItems.receipt.id}
        </Typography>
      </Box>
      <Box mt={3} width={"100%"}>
        {returnedItems.products.map(({ attributes, price, count }, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Typography maxWidth={250} textOverflow={"ellipsis"}>
                  {attributes.name}
                </Typography>
                <Typography> X{count}</Typography>
              </Box>
              <Typography>{price.cashout / 100}₺</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - -{" "}
      </Typography>
      <Typography fontWeight={"inherit"} fontSize={"inherit"}>
        {t("total").toUpperCase()}: {total}₺
      </Typography>
    </Box>
  );
});

export const Receipt = forwardRef(
  ({ sx, receiptData = GetFromSessionStorage("currentReceipt") }, ref) => {
    const { t } = useTranslation();

    const date = receiptData.date.split(" ")[0].split(".");
    const time = receiptData.date.split(" ")[1].split(":");

    console.log(getTotalTaxOfReceipt(receiptData));
    const total = useMemo(() => {
      let total = 0,
        taxesTotal = 0;
      receiptData.products.map(({ price }) => {
        taxesTotal += getValueByPercentege(price.cashout / 100, price.tax);
        total += price.cashout;
      });
      return { total: total / 100, taxesTotal: taxesTotal.toFixed(2) };
    });

    return (
      <Box
        ref={ref}
        sx={{
          width: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBlock: 3,
          paddingInline: 4,
          ...sx,
        }}
      >
        <Typography>32-Bit Market</Typography>
        <Typography>RIFKI KESEPARA</Typography>
        <Typography textAlign={"center"} textTransform={"uppercase"}>
          Bağdat Cad. Kumbaracılar Sk. No:18
        </Typography>
        <Typography textAlign={"center"} textTransform={"uppercase"}>
          Feneryolu / İstanbul
        </Typography>
        <Typography textAlign={"center"}>
          {t("thankYou").toUpperCase()}
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Box>
            <Typography>{date[0] + "/" + date[1] + "/" + date[2]}</Typography>
            <Typography>SAAT: {time[0] + "." + time[1]}</Typography>
          </Box>
          <Typography>
            {t("receiptID").toUpperCase()}:{" "}
            {receiptData.id.toLocaleString("tr-TR", {
              minimumIntegerDigits: 4,
              useGrouping: false,
            })}
          </Typography>
        </Box>

        <Box mt={3} width={"100%"}>
          {receiptData.products.map(({ attributes, price, count }, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Typography maxWidth={250} textOverflow={"ellipsis"}>
                    {attributes.name}
                  </Typography>
                  <Typography> X{count}</Typography>
                </Box>
                <Typography>{price.cashout / 100}₺</Typography>
              </Box>
            );
          })}
        </Box>
        <Typography>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - -{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            fontWeight: "bold",
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
            fontSize: 20,
          }}
        >
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            KDV
          </Typography>
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {total.taxesTotal}₺
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            fontWeight: "bold",
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
            fontSize: 20,
          }}
        >
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {t("total").toUpperCase()}
          </Typography>
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {total.total}₺
          </Typography>
        </Box>
        <Typography>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - -{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
            fontSize: 20,
          }}
        >
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {t("credit").toUpperCase()}:
          </Typography>
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {receiptData.payment.card}₺
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
            fontSize: 20,
          }}
        >
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {t("change").toUpperCase()}:
          </Typography>
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {receiptData.payment.change}₺
          </Typography>
        </Box>
        <Typography textAlign={"left"} width={"100%"} marginTop={5}>
          {t("cashier").toUpperCase()}:{" "}
          {GetFromSessionStorage("employee").employeeID}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography>EKÜ NO: 0001</Typography>
          <Typography>Z NO: 0019</Typography>
        </Box>
      </Box>
    );
  }
);
