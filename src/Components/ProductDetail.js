import { Box, Dialog, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProductDetail({
  open = false,
  product, //product's data
  onClose = (e) => {}, //callback function that is executed whenever product detail window is closed
}) {
  const { t } = useTranslation();

  //getting badge images of the product
  const getBadgeImages = () => {
    let array = [];
    product?.images.map(({ imageType, url, id }) => {
      if (imageType == "badge") array.push({ url: url, id: id });
    });
    return array;
  };

  return (
    <Dialog
      sx={{
        backgroundColor: "rgba(1,1,1,0.1)",
      }}
      PaperProps={{ sx: { borderRadius: 5 } }}
      maxWidth="xl"
      open={open}
      onClose={onClose}
    >
      <Paper
        sx={{
          paddingBlock: 1,
          paddingInline: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // width: { xs: "80vw", md: "50vw" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              top: 0,
              p: 1,
            }}
          >
            {getBadgeImages().map(({ url, id }, index) => (
              <img
                key={index}
                width={id == "yerliUretim" ? "100vw" : "50vw"}
                src={url}
              />
            ))}
          </Box>
          <img
            src={
              product?.images.find(({ imageType }) => imageType == "product")
                .url
            }
          />
        </Box>
        <Typography>{product?.id}</Typography>
        <Typography textAlign={"center"}>{product?.attributes.name}</Typography>
        <Typography>
          {t("weight")}: {product?.attributes.grossWeight}g
        </Typography>
        <Typography>
          {t("stock")}: {product?.stock} {t("amount")}
        </Typography>
        <Typography>
          {t("returnDayAmount")}: {product?.attributes.returnDay} {t("day")}
        </Typography>
        <Typography fontWeight={"bold"}>
          {t("barcode").toUpperCase()}: {product?.attributes.barcodes[0]}
        </Typography>
      </Paper>
    </Dialog>
  );
}
