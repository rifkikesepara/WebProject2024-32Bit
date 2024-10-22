import { Divider, Stack, Typography } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { getTaxesFromReceipt } from "../Utils/receipts";

//the section component for the ZReport
const Section = ({ title = "", data = [] }) => {
  return (
    <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
      <Typography>{title}</Typography>
      <Stack>
        {data.map(({ header, value }, index) => (
          <Stack
            minWidth={300}
            key={index}
            direction={"row"}
            justifyContent={"space-between"}
            spacing={5}
          >
            <Typography width={200} textAlign={"right"}>
              {header}{" "}
            </Typography>
            <Typography>{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export const ReportPaper = forwardRef(({ data, type = "zreport" }, ref) => {
  //calculates the required values for the zReport whenever a data of receipt is changed
  const calculated = useMemo(() => {
    let income = 0,
      outcome = 0,
      total = 0,
      totalCard = 0,
      discount = 0,
      taxes = { "%8": 0, "%1": 0, "%18": 0 };
    data.receipts.map((receipt) => {
      income += parseFloat(receipt.payment.cash);
      outcome += parseFloat(receipt.payment.change);
      total +=
        parseFloat(receipt.payment.card) +
        (parseFloat(receipt.payment.cash) - parseFloat(receipt.payment.change));
      discount += receipt.payment.discount + receipt.payment.payback;
      totalCard += parseFloat(receipt.payment.card);
      taxes["%1"] += getTaxesFromReceipt(receipt)["%1"];
      taxes["%8"] += getTaxesFromReceipt(receipt)["%8"];
      taxes["%18"] += getTaxesFromReceipt(receipt)["%18"];
    });

    return {
      income: income,
      outcome: outcome,
      totalCard: totalCard,
      total: total,
      taxes: taxes,
      discount: discount,
    };
  }, [data]);

  return (
    <Stack ref={ref} alignItems={"center"} sx={{ width: 450, p: 1 }}>
      <Typography fontSize={30}>
        {type == "zreport" ? "Z-Raporu" : "X-Raporu"}
      </Typography>
      {type == "zreport" ? (
        <Typography fontWeight={"bold"}>
          Tarih: {data.date.split(" ")[0]}
        </Typography>
      ) : (
        <Typography fontWeight={"bold"}>
          KasiyerNO: {data.employeeID}
        </Typography>
      )}
      {type == "xreport" && (
        <Stack direction={"column"} width={"70%"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Mesai Başlangıç:</Typography>
            {data.startTime}
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography>Mesai Bitiş:</Typography>
            {data.endTime}
          </Stack>
        </Stack>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-evenly"}
        width={"100%"}
        marginTop={3}
      >
        <Typography fontWeight={"bold"}>
          Düzenlenme Tarihi: {new Date().toLocaleDateString()}
        </Typography>
        <Typography fontWeight={"bold"}>
          Saat: {new Date().toLocaleTimeString()}
        </Typography>
      </Stack>

      <Divider sx={{ width: "100%", borderColor: "text.primary", mt: 1 }} />
      <Typography fontWeight={900} alignSelf={"flex-start"} paddingBlock={1}>
        Vergi Dökümü
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "text.primary", mb: 1 }} />

      <Stack width={"100%"} spacing={2}>
        <Section
          title="%8 KDV"
          data={[
            {
              header: "TOPLAM:",
              value: ((calculated.taxes["%8"] * 100) / 8).toFixed(2) + "₺",
            },
            { header: "KDV:", value: calculated.taxes["%8"].toFixed(2) + "₺" },
          ]}
        />
        <Section
          title="%18 KDV"
          data={[
            {
              header: "TOPLAM:",
              value: ((calculated.taxes["%18"] * 100) / 8).toFixed(2) + "₺",
            },
            { header: "KDV:", value: calculated.taxes["%18"].toFixed(2) + "₺" },
          ]}
        />
        <Section
          title="%1 KDV"
          data={[
            {
              header: "TOPLAM:",
              value: ((calculated.taxes["%1"] * 100) / 8).toFixed(2) + "₺",
            },
            { header: "KDV:", value: calculated.taxes["%1"].toFixed(2) + "₺" },
          ]}
        />
      </Stack>

      <Divider sx={{ width: "100%", borderColor: "text.primary", mt: 1 }} />
      <Typography fontWeight={900} alignSelf={"flex-start"} paddingBlock={1}>
        Kasa Dökümü
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "text.primary", mb: 1 }} />

      <Section
        data={[
          { header: "GİRİŞ:", value: calculated.income.toFixed(2) + "₺" },
          { header: "ÇIKIŞ:", value: calculated.outcome.toFixed(2) + "₺" },
          {
            header: "BAKİYE:",
            value: (calculated.income - calculated.outcome).toFixed(2) + "₺",
          },
        ]}
      />

      <Divider sx={{ width: "100%", borderColor: "text.primary", mt: 1 }} />
      <Typography fontWeight={900} alignSelf={"flex-start"} paddingBlock={1}>
        Banka Dökümü
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "text.primary", mb: 1 }} />

      <Section
        data={[
          { header: "GİRİŞ:", value: "" },
          { header: "ÇIKIŞ:", value: "" },
          { header: "BAKİYE:", value: "" },
        ]}
      />

      <Divider sx={{ width: "100%", borderColor: "text.primary", mt: 1 }} />
      <Typography fontWeight={900} alignSelf={"flex-start"} paddingBlock={1}>
        Evrak Dökümü
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "text.primary", mb: 1 }} />
      <Typography
        fontWeight={"bold"}
        fontStyle={"italic"}
        alignSelf={"flex-start"}
        paddingBottom={1}
      >
        Fiş
      </Typography>
      <Divider
        sx={{
          width: "100%",
          borderColor: "text.primary",
          borderStyle: "dashed",
          mb: 1,
        }}
      />

      <Section
        data={[
          { header: "EVRAK SAYISI:", value: data.receipts.length },
          { header: "TOPLAM TUTAR:", value: calculated.total.toFixed(2) + "₺" },
          {
            header: "TOPLAM İNDİRİM:",
            value: calculated.discount.toFixed(2) + "₺",
          },
        ]}
      />

      <Divider
        sx={{ width: "100%", borderColor: "text.primary", marginBlock: 1 }}
      />
      <Typography fontWeight={900} alignSelf={"flex-start"} paddingBottom={1}>
        Ödemeler Özet
      </Typography>
      <Divider sx={{ width: "100%", borderColor: "text.primary", mb: 1 }} />

      <Section
        title="Nakit"
        data={[
          { header: "TOPLAM:", value: calculated.income.toFixed(2) + "₺" },
        ]}
      />
      <Section
        title="Kredi Kartı"
        data={[
          { header: "TOPLAM:", value: calculated.totalCard.toFixed(2) + "₺" },
        ]}
      />
      <Divider
        sx={{ width: "100%", borderColor: "text.primary", mt: 2, mb: 1 }}
      />

      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        fontWeight={900}
        fontSize={18}
      >
        <Typography fontSize={"inherit"} fontWeight={"inherit"}>
          TOPLAM CİRO
        </Typography>
        <Typography fontSize={"inherit"} fontWeight={"inherit"}>
          {calculated.total.toFixed(2) + "₺"}
        </Typography>
      </Stack>
    </Stack>
  );
});

export default ReportPaper;
