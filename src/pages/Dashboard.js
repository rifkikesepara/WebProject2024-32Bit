import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import UndoIcon from "@mui/icons-material/Undo";
import DescriptionIcon from "@mui/icons-material/Description";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useMemo, useState } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import MiniDrawer from "../Components/MiniDrawer";
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToSessionStorage,
  getDateFromString,
  getDayString,
  getMonthString,
} from "../Utils/utilities";
import useStore from "../Hooks/useStore";
import { useTranslation } from "react-i18next";
import LOG from "../Debug/Console";
import ShiftButton from "../Components/Shift";

const menuItems = [
  {
    name: "sale",
    icon: (
      <LocalGroceryStoreIcon
        sx={{
          backgroundColor: "#65a614",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../sale",
    onClick: () => {
      SaveToSessionStorage("cashout", []);
      SaveToSessionStorage("usedOffers", []);
    },
  },
  {
    name: "returnItems",
    icon: (
      <UndoIcon
        sx={{
          backgroundColor: "#ec324f",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../return",
  },
  {
    name: "reports",
    icon: (
      <DescriptionIcon
        sx={{
          backgroundColor: "#cb9114",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../reports",
  },
  // {
  //   name: "DİREKT ÜRÜN GİRİŞİ",
  //   icon: (
  //     <StoreIcon
  //       sx={{
  //         backgroundColor: "#794b94",
  //         fontSize: { md: 75, sm: 75, xs: 60 },
  //         color: "white",
  //         padding: 2,
  //         borderRadius: 5,
  //       }}
  //     />
  //   ),
  // },
  {
    name: "checkPrice",
    icon: (
      <LocalOfferIcon
        sx={{
          backgroundColor: "#37536f",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
  },
  {
    name: "collections",
    icon: (
      <PointOfSaleIcon
        sx={{
          backgroundColor: "#ec324f",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
  },
  {
    name: "otherOptions",
    icon: (
      <LayersIcon
        sx={{
          backgroundColor: "#6485d2",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
  },
  {
    name: "settings",
    icon: (
      <SettingsIcon
        sx={{
          backgroundColor: "#28b2c9",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../settings",
  },
  {
    name: "logout",
    icon: (
      <LogoutIcon
        sx={{
          backgroundColor: "red",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../",
  },
];

const getTotalAmount = (data) => {
  console.log("total amount");
  let total = 0;
  data?.map(({ amount }) => {
    total = total + amount;
  });

  return total;
};

const Clock = ({ sx }) => {
  const [date, setDate] = useState(new Date());
  // const [time, setTime] = useState(new Date().toLocaleTimeString("tr-TR"));

  const updateTime = () => {
    setDate(new Date());
  };
  const clock = date.toLocaleTimeString("tr-TR");
  setInterval(updateTime, 1000);

  return (
    <Typography sx={{ ...sx }}>
      {clock.split(":")[0]}:{clock.split(":")[1]}
    </Typography>
  );
};

const LastSalesTable = (data = []) => {
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
};

export default function Dashboard() {
  LOG("re-render Dashboard", "red");

  const { t } = useTranslation();
  const [data, setData] = useState(undefined);
  const storeInfo = useStore();

  const employee = GetFromSessionStorage("employee");
  const sales = GetFromLocalStorage("receipts").sort(
    (a, b) => getDateFromString(a.date) - getDateFromString(b.date)
  );
  const chartData = useMemo(() => {
    const temp = [];
    sales.map((receipt) => {
      if (new Date().toLocaleDateString() == receipt.date.split(" ")[0])
        temp.push({
          id: receipt.id,
          time: getDateFromString(receipt.date),
          amount: receipt.payment.total,
          discount: receipt.payment.discount,
          payback: receipt.payment.payback,
        });
    });
    return temp;
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      console.log(chartData);
      setData(chartData);
    }, 1000);
  }, []);

  const total = useMemo(() => getTotalAmount(data), [data]);

  const { breakpoints } = useTheme();
  const matchesTablet = useMediaQuery(breakpoints.up("md"));

  const date = new Date();
  let stringDate = useMemo(() => {
    return {
      day: getDayString(date.getDay()),
      month: getMonthString(date.getMonth()),
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        height: "100vh",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: { xs: "95%", md: "85%" },
          ml: { md: 7 },
          mt: { xs: 7, md: 0 },
        }}
      >
        {!data ? (
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={"100%"} height={85} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                borderRadius: 5,
                display: "flex",
                flexDirection: { md: "row", sm: "row", xs: "column" },
                justifyContent: "center",
                paddingInline: 1.5,
                paddingBlock: 2.5,
                position: "relative",
                alignItems: "center",
              }}
            >
              <Stack spacing={0.25} sx={{ position: "absolute", left: 15 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: storeInfo.online ? "green" : "red",
                      boxShadow: storeInfo.online
                        ? "0px 0px 8px 0.5px green"
                        : "0px 0px 8px 0.5px red",
                      borderRadius: 200,
                      marginRight: 10,
                    }}
                  ></div>
                  <Typography>
                    {storeInfo.online ? t("storeOnline") : t("storeOffline")}
                  </Typography>
                </Box>
                <Typography>
                  {t("version")}: {storeInfo.version}
                </Typography>
                <Typography sx={{ display: { xs: "none", md: "block" } }}>
                  {t("lastLogin")}: {employee.loginTime.split(" ")[0]}{" "}
                  {employee.loginTime.split(" ")[1].split(":")[0]}
                  {":"}
                  {employee.loginTime.split(" ")[1].split(":")[1]}
                </Typography>
              </Stack>
              <Stack alignItems={"center"}>
                <Typography
                  sx={{ fontSize: { md: 30, xs: 20 }, fontWeight: "bold" }}
                >
                  {employee.employeeName}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  <Typography>
                    {t(stringDate.day.toLocaleLowerCase())}, {date.getDate()}{" "}
                    {t(stringDate.month.toLowerCase())}
                  </Typography>
                  <Clock />
                </Stack>
              </Stack>
              <Stack
                sx={{ position: "absolute", right: 15, alignItems: "center" }}
              >
                <Typography>
                  {t("cashierID")}: {employee.employeeID}
                </Typography>
                <ShiftButton disabled={!storeInfo.online} />
              </Stack>
            </Paper>
          </Grid>
        )}
        {!data ? (
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
        ) : (
          <Grid item xs={12} md={8}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                paddingInline: 1.5,
                paddingBlock: 2.5,
                height: 300,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {t("today").toUpperCase()}
              </Typography>
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
                    valueFormatter: (v) =>
                      t("discounts") + ": " + v.toFixed(2) + "₺",
                  },
                  {
                    dataKey: "payback",
                    area: false,
                    showMark: false,
                    disableHighlight: true,
                    data: chartData.map(({ amount }) => amount),
                    color: "yellow",
                    valueFormatter: (v) =>
                      t("campaigns") + ": " + v.toFixed(2) + "₺",
                  },
                  {
                    dataKey: "amount",
                    area: true,
                    showMark: true,
                    color: "#72ccff",
                    // data: chartData.map(({ amount }) => amount),

                    valueFormatter: (v) =>
                      t("total") + ": " + v.toFixed(2) + "₺",
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
            </Paper>
          </Grid>
        )}
        {!data ? (
          <Grid item xs={12} sm={12} md={4}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              sx={{ height: { md: 300, xs: 178 } }}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                paddingInline: 1.5,
                paddingBlock: 2.5,
                minWidth: "50%",
                height: { md: 300 },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                  {t("totalEarning").toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "3em",
                  }}
                >
                  {total.toFixed(2)}₺
                </Typography>
                <Typography sx={{}}>
                  {date.getDate()}{" "}
                  {t(getMonthString(date.getMonth()).toLocaleLowerCase())}{" "}
                  {date.getFullYear()}
                </Typography>
              </Box>
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {t("seeDetails")}
              </Typography>
            </Paper>
          </Grid>
        )}
        {!data ? (
          <Grid item xs={12} sx={{ display: { md: "block", xs: "none" } }}>
            <Skeleton variant="rectangular" width={"100%"} height={274} />
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: { md: "block", xs: "none" } }}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                paddingInline: 1.5,
                paddingBlock: 2.5,
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                {t("lastSales")}
              </Typography>
              <LastSalesTable data={chartData} />
            </Paper>
          </Grid>
        )}
      </Grid>
      {data && (
        <MiniDrawer
          oriantation={matchesTablet ? "vertical" : "horizontal"}
          items={menuItems}
        />
      )}
    </Box>
  );
}
