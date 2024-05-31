import {
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ZReport from "../Components/ZReport";
import { useRef, useState } from "react";
import { getCollapsedReceiptsByDate } from "../Utils/receipts";
import { GetFromLocalStorage } from "../Utils/utilities";
import TextFieldVK from "../Components/TextFieldVK";
import DialogWithButtons from "../Components/DialogWithButtons";
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

const ShiftBox = ({ data, onSelect = (shift) => {} }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <Paper
      sx={{
        width: "70%",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Stack spacing={1}>
        <Typography>Employee ID: {data.employeeID}</Typography>
        {/* <Typography>Toplam Tutar: {data.payment.cash}₺</Typography> */}
        <Typography>Start Time: {data.startTime}</Typography>
        <Typography>Finish Time: {data.endTime}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            console.log(data);
            setShowReceipt(true);
          }}
          sx={{
            paddingBlock: 2,
            display: { md: "none", sm: "block", xs: "block" },
          }}
        >
          Göster
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onSelect(data)}
          sx={{ paddingBlock: 2 }}
        >
          Seç
        </Button>
        <Dialog
          maxWidth="xl"
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          scroll="body"
        >
          <Box>
            {/* <Receipt payment={data.payment} cashout={data.products} /> */}
          </Box>
        </Dialog>
      </Stack>
    </Paper>
  );
};

const ZReportBox = ({ data, onSelect = (zReport) => {} }) => {
  const [showReport, setShowReport] = useState(false);
  const scrollRef = useRef();
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <Paper
      sx={{
        width: "70%",
        backgroundColor: "background.default",
        p: 2,
      }}
    >
      <Stack spacing={1}>
        {/* <Typography>Toplam Tutar: {data.payment.cash}₺</Typography> */}
        <Typography alignSelf={"center"}>Date: {data.date}</Typography>

        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setShowReport(true);
            onSelect(data);
          }}
          sx={{ paddingBlock: 2 }}
        >
          Raporu oluştur
        </Button>
        <DialogWithButtons
          scrollRef={scrollRef}
          open={showReport}
          onClose={() => setShowReport(false)}
          buttons={{
            endAdornment: (
              <Paper>
                <IconButton onClick={handlePrint} sx={{ borderRadius: 0 }}>
                  <Print />
                </IconButton>
              </Paper>
            ),
          }}
        >
          <Box ref={scrollRef} sx={{ height: "80vh", overflowY: "scroll" }}>
            <ZReport ref={reportRef} data={data} />
          </Box>
        </DialogWithButtons>
      </Stack>
    </Paper>
  );
};

export default function Reports() {
  const shifts = GetFromLocalStorage("shifts");
  const navigate = useNavigate();

  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "background.default" }}
      spacing={2}
    >
      <Stack
        direction={"row"}
        width={"96%"}
        justifyContent={"center"}
        spacing={5}
      >
        <Box width={"100%"}>
          <Typography variant="h4" textAlign={"center"} color={"primary"}>
            Shifts
          </Typography>
          <Paper
            sx={{
              height: "80vh",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <Paper
              sx={{
                position: "sticky",
                top: 0,
                paddingBlock: 2,
                zIndex: 20,
              }}
            >
              <Stack direction={"row"} justifyContent={"space-evenly"}>
                <TextFieldVK divSX={{ width: "50%" }} />
                <Button sx={{ maxWidth: 200 }} variant="contained">
                  Giriş
                </Button>
              </Stack>
            </Paper>
            <Stack
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              flexWrap={"wrap"}
              spacing={2}
              paddingBlock={2}
            >
              {shifts.map((shift, index) => {
                return <ShiftBox key={index} data={shift} />;
              })}
            </Stack>
          </Paper>
        </Box>

        <Box width={"100%"}>
          <Typography variant="h4" textAlign={"center"} color={"primary"}>
            Z-Reports
          </Typography>
          <Paper
            sx={{
              height: "80vh",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <Paper
              sx={{
                position: "sticky",
                top: 0,
                paddingBlock: 2,
              }}
            >
              <Stack direction={"row"} justifyContent={"space-evenly"}>
                <TextFieldVK divSX={{ width: "50%" }} />
                <Button sx={{ maxWidth: 200 }} variant="contained">
                  Giriş
                </Button>
              </Stack>
            </Paper>
            <Stack
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              flexWrap={"wrap"}
              spacing={2}
              paddingBlock={2}
            >
              {getCollapsedReceiptsByDate().map((receipt, index) => {
                return <ZReportBox key={index} data={receipt} />;
              })}
            </Stack>
          </Paper>
        </Box>
      </Stack>
      <Button
        variant="contained"
        onClick={() => navigate("../home")}
        sx={{ width: 400, height: 60 }}
      >
        Geri Dön
      </Button>
    </Stack>
  );
}
