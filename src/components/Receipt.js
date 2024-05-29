import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollButtons from "./ScrollButtons";

export const ReceiptWithScrollButtons = forwardRef(
  (
    {
      sx,
      payment = JSON.parse(sessionStorage.getItem("payment")),
      cashout = JSON.parse(sessionStorage.getItem("cashout")),
    },
    ref
  ) => {
    const scrollRef = useRef();
    return (
      <Stack sx={{ position: "relative" }}>
        <ScrollButtons
          sx={{ position: "absolute", top: -50, right: "38%" }}
          scrollRef={scrollRef}
        />
        <Receipt ref={scrollRef} sx={sx} payment={payment} cashout={cashout} />
      </Stack>
    );
  }
);

export const ReturnReceipt = forwardRef(({ sx, returnedItems = [] }, ref) => {
  const { t } = useTranslation();
  console.log(returnedItems);
  // const date = returnedItems.date.split(" ")[0].split(".");
  // const time = returnedItems.date.split(" ")[1].split(":");

  const total = () => {
    let total = 0;
    returnedItems.products.map(({ price }) => (total += price.cashout));
    return total / 100;
  };

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
      <Typography textAlign={"center"}>İADE FATURASI</Typography>
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
            SAAT: {returnedItems?.date.toLocaleTimeString()}
          </Typography>
        </Box>
        <Typography>FİŞ NO: {returnedItems.receipt.id}</Typography>
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
        TOPLAM: {total()}₺
      </Typography>
    </Box>
  );
});

export const Receipt = forwardRef(
  (
    {
      sx,
      payment = JSON.parse(sessionStorage.getItem("payment")),
      cashout = JSON.parse(sessionStorage.getItem("cashout")),
    },
    ref
  ) => {
    const { t } = useTranslation();

    const date = payment.date.split(" ")[0].split(".");
    const time = payment.date.split(" ")[1].split(":");

    const total = () => {
      let total = 0;
      cashout.map(({ price }) => (total = total + price.cashout));
      return total / 100;
    };

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
          <Typography>FİŞ NO: 0001</Typography>
        </Box>

        <Box mt={3} width={"100%"}>
          {cashout.map(({ attributes, price, count }, index) => {
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
            1,28₺
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
            {total()}₺
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
            {payment.card}₺
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
            PARA ÜSTÜ:
          </Typography>
          <Typography fontWeight={"inherit"} fontSize={"inherit"}>
            {payment.change}₺
          </Typography>
        </Box>
        <Typography textAlign={"left"} width={"100%"} marginTop={5}>
          {t("cashier").toUpperCase()}: A/KASİYER #1
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
