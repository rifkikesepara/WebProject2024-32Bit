import { Box, Dialog, Paper, Typography } from "@mui/material";

export default function ProductDetail({
  product,
  open = false,
  onClose = (e) => {},
}) {
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
          p: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "80vw", md: "50vw" },
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
        <Typography textAlign={"center"}>{product?.attributes.name}</Typography>
        <Typography>Ağırlık: {product?.attributes.grossWeight}g</Typography>
        <Typography>Stok: {product?.stock} Adet</Typography>
        <Typography>
          İade Gün Sayısı: {product?.attributes.returnDay} Gün
        </Typography>
        <Typography fontWeight={"bold"}>
          BARKOD: {product?.attributes.barcodes[0]}
        </Typography>
      </Paper>
    </Dialog>
  );
}
