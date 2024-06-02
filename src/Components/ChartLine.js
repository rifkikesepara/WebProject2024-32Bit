import { LineChart, axisClasses } from "@mui/x-charts";
import { useTranslation } from "react-i18next";

export default function ChartLine({ chartData }) {
  const { t } = useTranslation();
  return (
    <LineChart
      dataset={chartData}
      margin={{
        top: 16,
        right: 20,
        left: 70,
        bottom: 30,
      }}
      xAxis={[
        {
          scaleType: "utc",
          dataKey: "time",
          valueFormatter: (v) => {
            const time = v.toLocaleTimeString().split(":");
            return time[0] + ":" + time[1];
          },
          data: [...chartData.map(({ time }) => time)],
        },
      ]}
      yAxis={[
        {
          label: t("sales") + " (₺)",
          // max: 15000,
          tickNumber: 5,
          labelStyle: { fontWeight: "bold", fontSize: 20 },
          dataKey: "amount",
          // data: chartData.map(({ amount }) => amount),
          valueFormatter: (v) => v + "₺",
          disableLine: true,
        },
      ]}
      series={[
        {
          dataKey: "id",
          area: false,
          showMark: false,
          disableHighlight: true,
          data: chartData.map(({ amount }) => amount),
          color: "red",
          valueFormatter: (v) => "ID: " + v,
        },
        {
          dataKey: "discount",
          area: false,
          showMark: false,
          disableHighlight: true,
          data: chartData.map(({ amount }) => amount),
          color: "yellow",
          valueFormatter: (v) => t("discounts") + ": " + v?.toFixed(2) + "₺",
        },
        {
          dataKey: "payback",
          area: false,
          showMark: false,
          disableHighlight: true,
          data: chartData.map(({ amount }) => amount),
          color: "yellow",
          valueFormatter: (v) => t("campaigns") + ": " + v?.toFixed(2) + "₺",
        },
        {
          dataKey: "amount",
          area: true,
          showMark: true,
          color: "#72ccff",
          // data: chartData.map(({ amount }) => amount),

          valueFormatter: (v) => t("total") + ": " + v?.toFixed(2) + "₺",
        },
      ]}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-25px)",
        },
        "& .MuiLineElement-root": {
          strokeWidth: 3,
        },
      }}
    />
  );
}
