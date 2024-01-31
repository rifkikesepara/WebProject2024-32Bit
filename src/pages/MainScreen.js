import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  SwipeableDrawer,
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
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";

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
    name: "WWW",
    icon: (
      <LinkIcon
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
];

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", 3000),
];

// Generate Order Data
function createRowData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createRowData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createRowData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createRowData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createRowData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createRowData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

const DrawerItems = () => {
  return (
    <>
      {menuItems.map((data) => {
        return (
          <>
            <Button>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: { md: 50, sm: 50, xs: 30 },
                  borderRadius: 5,
                  marginBlock: 2,
                  cursor: "pointer",
                }}
              >
                {data.icon}
                <Typography
                  sx={{
                    fontSize: { md: 30, sm: 30, xs: 20 },
                    fontWeight: "bold",
                    marginLeft: 2,
                    color: "black",
                  }}
                >
                  {data.name}
                </Typography>
              </Box>
            </Button>
            <Divider />
          </>
        );
      })}
    </>
  );
};

const getDayString = (index) => {
  switch (index) {
    case 1:
      return "Pazartesi";
    case 2:
      return "Salı";
    case 3:
      return "Çarşamba";
    case 4:
      return "Perşembe";
    case 5:
      return "Cuma";
    case 6:
      return "Cumartesi";
    case 7:
      return "Pazar";
  }
};

const getMonthString = (index) => {
  switch (index) {
    case 0:
      return "Ocak";
  }
};

export default function MainScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [showDrawer, setShowDrawer] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString("tr-TR"));

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString("tr-TR"));
  };

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
      <IconButton
        sx={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}
        onClick={() => setShowDrawer(true)}
      >
        <MenuIcon sx={{ fontSize: { md: 70, xs: 50 }, color: "black" }} />
      </IconButton>
      <Grid container spacing={2} sx={{ width: { xs: "95%", md: "85%" } }}>
        <Grid item xs={12}>
          <Paper
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              display: "flex",
              flexDirection: { md: "row", sm: "row", xs: "column" },
              justifyContent: "center",
              paddingInline: 1.5,
              paddingBlock: 2.5,
              position: "relative",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: { md: 30, xs: 20 }, fontWeight: "bold" }}
            >
              {getDayString(date.getDay())}, {date.getDate()}{" "}
              {getMonthString(date.getMonth())}
            </Typography>
            <Typography
              sx={{
                position: { md: "absolute", sm: "absolute" },
                right: 15,
                fontSize: 30,
              }}
            >
              {time}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={matches ? 8 : 12}>
          <Paper
            elevation={2}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
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
              dataset={data}
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
                  label: matches && "Satışlar ($)",
                  max: 5000,
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
        <Grid item xs={matches ? 4 : 12}>
          <Paper
            elevation={2}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
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
                  fontSize: { xs: 30, sm: 40, md: 80 },
                }}
              >
                $3000
              </Typography>
              <Typography sx={{ color: "#666666" }}>31 Ocak 2024</Typography>
            </Box>
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>
              Detaylı Görüntüle
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sx={{ display: { md: "block", xs: "none" } }}>
          <Paper
            elevation={2}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
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
                    Payment Method
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 20 }}
                    align="right"
                  >
                    Sale Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(0, 4).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ fontSize: 20 }}>{row.date}</TableCell>
                    <TableCell sx={{ fontSize: 20 }}>{row.name}</TableCell>
                    <TableCell sx={{ fontSize: 20 }}>
                      {row.paymentMethod}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 20 }}
                      align="right"
                    >{`$${row.amount}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <SwipeableDrawer
        open={showDrawer}
        anchor="left"
        onClose={() => setShowDrawer(false)}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DrawerItems />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
