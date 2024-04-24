import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";

export const Receipt = forwardRef((props, ref) => {
  const cashout = JSON.parse(localStorage.getItem("cashout"));
  const payment = JSON.parse(localStorage.getItem("payment"));
  console.log(cashout);

  const total = () => {
    let total = 0;
    cashout.map(({ price }) => (total = total + price));
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
        ...props.sx,
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
      <Typography textAlign={"center"}>TEŞEKKÜR EDERİZ</Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Box>
          <Typography>16/12/2017</Typography>
          <Typography>SAAT: 10.56</Typography>
        </Box>
        <Typography>FİŞ NO: 0001</Typography>
      </Box>

      <Box mt={3} width={"100%"}>
        {cashout.map(({ name, price, count }) => {
          return (
            <Box
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
                  {name}
                </Typography>
                <Typography> X{count}</Typography>
              </Box>
              <Typography>{price}₺</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        - -{" "}
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
          TOPLAM
        </Typography>
        <Typography fontWeight={"inherit"} fontSize={"inherit"}>
          {total()}₺
        </Typography>
      </Box>
      <Typography>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
        - -{" "}
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
          KREDİ:
        </Typography>
        <Typography fontWeight={"inherit"} fontSize={"inherit"}>
          {payment.card}₺
        </Typography>
      </Box>

      <Typography textAlign={"left"} width={"100%"} marginTop={5}>
        KASİYER: A/KASİYER #1
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
});
