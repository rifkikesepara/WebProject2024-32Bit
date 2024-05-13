import {
  Box,
  Grid,
  Paper,
  Skeleton,
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
import { useMemo, useState } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import useData from "../Hooks/useData";
import MiniDrawer from "../Components/MiniDrawer";
import { getDayString, getMonthString } from "../Utils/utilities";
import useStore from "../Hooks/useStore";
import usePreferences from "../Hooks/usePreferences";

const menuItems = [
  {
    name: "SATIŞ",
    icon: (
      <LocalGroceryStoreIcon
        sx={{
          backgroundColor: "#ec324f",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../sale",
    onClick: () => {
      sessionStorage.setItem("cashout", JSON.stringify([]));
    },
  },
  {
    name: "İADE İŞLEMİ",
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
  },
  {
    name: "RAPORLAR",
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
  },
  {
    name: "DİREKT ÜRÜN GİRİŞİ",
    icon: (
      <StoreIcon
        sx={{
          backgroundColor: "#794b94",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
  },
  {
    name: "FİYAT GÖR",
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
    name: "TAHSİLATLAR",
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
    name: "DİĞER İŞLEMLER",
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
    name: "AYARLAR",
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
  },
  {
    name: "ÇIKIŞ YAP",
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

const adjustDataForChart = (data) => {
  console.log("adjusting data");
  const array = [];
  let totalAmount = 0;
  for (let i = 0; i < 24; i++) {
    let total = 0;
    data.map(({ time, amount }) => {
      var newTime = time.split(":");
      if (newTime[0] == i) {
        total = total + amount;
      }
    });

    totalAmount = total + totalAmount;
    array.push({ id: i, time: i, amount: total });
  }

  return array;
};

const getTotalAmount = (data) => {
  console.log("total amount");
  let total = 0;
  data.map(({ amount }) => {
    total = total + amount;
  });

  return total;
};

const sortTheLastPayments = (data) => {
  console.log("sortTheLastPaymeny");
  let array = [];
  array = data.sort((a, b) => {
    if (a.time.split(":")[0] < b.time.split(":")[0]) return -1;
  });

  return array;
};

export default function Dashboard() {
  const [data, setData] = useState([]);
  const storeInfo = useStore();

  useData("https://65b0e7e2d16d31d11bdd8b87.mockapi.io/api/Expenses", (data) =>
    setData(data)
  );

  const chartData = useMemo(() => adjustDataForChart(data), [data]);
  const tableData = useMemo(() => sortTheLastPayments(data), [data]);
  const totalPublic = useMemo(() => getTotalAmount(data), [data]);

  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up("sm"));
  const { isThemeDark, toggleTheme } = usePreferences();

  const [showDrawer, setShowDrawer] = useState({ right: false, left: false });
  const [date, setDate] = useState(new Date());
  // const [time, setTime] = useState(new Date().toLocaleTimeString("tr-TR"));

  const updateTime = () => {
    setDate(new Date());
  };

  let stringDate = useMemo(() => {
    return {
      day: getDayString(date.getDay()),
      month: getMonthString(date.getMonth()),
    };
  }, []);

  setInterval(updateTime, 1000);

  return (
    <Box
      sx={{
        backgroundColor: "#e7ecf1",
        display: "flex",
        height: "100vh",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
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
        {!data.length ? (
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={"100%"} height={85} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                backgroundColor: "white",
                borderRadius: 5,
                display: "flex",
                flexDirection: { md: "row", sm: "row", xs: "column" },
                justifyContent: "space-between",
                paddingInline: 1.5,
                paddingBlock: 2.5,
                position: "relative",
                alignItems: "center",
              }}
            >
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
                <Typography>Mağaza Çevrimiçi</Typography>
              </Box>
              <Typography
                sx={{ fontSize: { md: 30, xs: 20 }, fontWeight: "bold" }}
              >
                {stringDate.day}, {date.getDate()} {stringDate.month}
              </Typography>
              <Typography
                sx={{
                  right: 15,
                  fontSize: 30,
                }}
              >
                {date.toLocaleTimeString("tr-TR")}
              </Typography>
            </Paper>
          </Grid>
        )}
        {!data.length ? (
          <Grid item xs={matches ? 8 : 12}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
        ) : (
          <Grid item xs={matches ? 8 : 12}>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: "white",
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
                  color: "#1976d2",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                BUGÜN
              </Typography>
              <LineChart
                dataset={chartData}
                margin={{
                  top: 16,
                  right: 20,
                  left: matches ? 70 : 50,
                  bottom: 30,
                }}
                xAxis={[
                  {
                    scaleType: "point",
                    dataKey: "time",
                    tickNumber: 2,
                  },
                ]}
                yAxis={[
                  {
                    label: matches && "Satışlar (₺)",
                    // max: 15000,
                    tickNumber: 5,
                    labelStyle: { fontWeight: "bold", fontSize: 20 },
                  },
                ]}
                series={[
                  {
                    dataKey: "amount",
                    showMark: false,
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
        {!data.length ? (
          <Grid item xs={matches ? 4 : 12}>
            <Skeleton variant="rectangular" width={"100%"} height={300} />
          </Grid>
        ) : (
          <Grid item xs={matches ? 4 : 12}>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: "white",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                paddingInline: 1.5,
                paddingBlock: 2.5,
                minWidth: "50%",
                height: { md: 300, sm: 300 },
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
                <Typography
                  sx={{ color: "#1976d2", fontWeight: "bold", fontSize: 20 }}
                >
                  TOPLAM KAZANÇ
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: { xs: 30, sm: 40, md: 65 },
                  }}
                >
                  {totalPublic}₺
                </Typography>
                <Typography sx={{ color: "#666666" }}>
                  {date.getDate()} {getMonthString(date.getMonth())}{" "}
                  {date.getFullYear()}
                </Typography>
              </Box>
              <Typography
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Detaylı Görüntüle
              </Typography>
            </Paper>
          </Grid>
        )}
        {!data.length ? (
          <Grid item xs={12} sx={{ display: { md: "block", xs: "none" } }}>
            <Skeleton variant="rectangular" width={"100%"} height={274} />
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: { md: "block", xs: "none" } }}>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: "white",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                paddingInline: 1.5,
                paddingBlock: 2.5,
              }}
            >
              <Typography
                sx={{ color: "#1976d2", fontWeight: "bold", fontSize: 20 }}
              >
                SON SATIŞLAR
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                      Tarih
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                      İsim
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                      Ödeme Yöntemi
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: 20 }}
                      align="right"
                    >
                      Tutar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.slice(0, 4).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ fontSize: 20 }}>
                        {date.getDate()} {stringDate.month} {date.getFullYear()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 20 }}>
                        {row.first_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: 20 }}>
                        {row.cardType}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 20 }}
                        align="right"
                      >{`${row.amount}₺`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        )}
      </Grid>
      {data.length != 0 && (
        <MiniDrawer
          oriantation={matches ? "vertical" : "horizontal"}
          open={showDrawer.left}
          onOpen={(o) => setShowDrawer({ ...showDrawer, left: o })}
          items={menuItems}
        />
      )}
    </Box>
  );
}
