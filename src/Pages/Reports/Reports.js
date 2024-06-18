import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ZReport from "../../Components/ZReport";
import { useRef, useState } from "react";
import { getCollapsedReceiptsByDate } from "../../Utils/receipts";
import { GetFromLocalStorage } from "../../Utils/utilities";
import TextFieldVK from "../../Components/TextFieldVK";
import DialogWithButtons from "../../Components/DialogWithButtons";
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollButtons from "../../Components/ScrollButtons";

//Shift item that shows data about the shift and a button to open detailed information about the shift
const ShiftBox = ({ data, onSelect = (shift) => {} }) => {
  const { t } = useTranslation();
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
        <Typography>
          {t("cashierID")}: {data.employeeID}
        </Typography>
        {/* <Typography>Toplam Tutar: {data.payment.cash}₺</Typography> */}
        <Typography>
          {t("startTime")}: {data.startTime}
        </Typography>
        <Typography>
          {t("endTime")}: {data.endTime}
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onSelect(data)}
          sx={{ paddingBlock: 2 }}
        >
          {t("choose")}
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

//Z-Reports Item that shows the date and a button to open the report
const ZReportBox = ({ data, onSelect = (zReport) => {} }) => {
  const { t } = useTranslation();
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
        <Typography alignSelf={"center"}>
          {t("date")}: {data.date}
        </Typography>

        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setShowReport(true);
            onSelect(data);
            console.log(data);
          }}
          sx={{ paddingBlock: 2 }}
        >
          {t("createReport")}
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
  const { t } = useTranslation();
  const shifts = GetFromLocalStorage("shifts");
  const navigate = useNavigate();

  const shiftsScrollRef = useRef();
  const zReportsScrollRef = useRef();

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
        <Box width={"100%"} position={"relative"}>
          <Typography variant="h4" textAlign={"center"} color={"primary"}>
            {t("shifts").toUpperCase()}
          </Typography>
          <ScrollButtons
            scrollRef={shiftsScrollRef}
            sx={{ bottom: 0, zIndex: 20 }}
            elevation={3}
          />
          <Paper
            ref={shiftsScrollRef}
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
                  {t("enter")}
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
              {shifts.reverse().map((shift, index) => {
                return <ShiftBox key={index} data={shift} />;
              })}
            </Stack>
          </Paper>
        </Box>

        <Box width={"100%"} position={"relative"}>
          <Typography variant="h4" textAlign={"center"} color={"primary"}>
            {t("zReports").toUpperCase()}
          </Typography>
          <ScrollButtons
            scrollRef={zReportsScrollRef}
            sx={{ bottom: 0, zIndex: 20 }}
            elevation={3}
          />
          <Paper
            ref={zReportsScrollRef}
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
                  {t("enter")}
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
              {getCollapsedReceiptsByDate()
                .reverse()
                .map((receipt, index) => {
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
        {t("goBack")}
      </Button>
    </Stack>
  );
}
