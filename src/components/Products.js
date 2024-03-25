import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import useData from "../Hooks/useData";
import API from "../productsAPI.json";
import { useState } from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ButtonGroup from "./ButtonGroup";
import axios from "axios";
import { useSnackbar } from "notistack";

const categories = [
  { name: "Tüm Ürünler", value: "all" },
  {
    name: "Fırın Ürünleri",
    value: "bakery",
  },
  {
    name: "Kahvaltılık",
    value: "breakfast",
  },
  {
    name: "Meyve ve Sebzeler",
    value: "fruit-vegetables",
  },
  {
    name: "Elektronik",
    value: "electronics",
  },
  {
    name: "Et ve Balık",
    value: "meat-fish",
  },
  {
    name: "Atıştırmalıklar",
    value: "junkFood",
  },
  {
    name: "Dondurmalar",
    value: "icecream",
  },
  {
    name: "Kişisel Bakım",
    value: "bodyCareStuff",
  },
  {
    name: "Tatlılar",
    value: "desert",
  },
  {
    name: "Dondurlumuş Yiyecekler",
    value: "fastFood",
  },
  {
    name: "İçecekler",
    value: "drinks",
  },
  {
    name: "Temel Gıdalar",
    value: "basicGrocery",
  },
  {
    name: "Temizlik",
    value: "cleaningStuff",
  },
];

export default function Products({
  sx,
  onSelectProduct = () => {},
  onProducts = () => {},
  onCount = () => {},
}) {
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { enqueueSnackbar } = useSnackbar();

  const Cell = ({ columnIndex, rowIndex, style }) => {
    let index =
      rowIndex != 0 ? columnIndex + rowIndex * 3 : columnIndex + rowIndex;

    // console.log(productsData[index]);
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {productsData[index] != undefined && (
          <Button
            key={productsData[index].id}
            sx={{
              width: 150,
              height: 150,
              border: "1px solid black",
              mt: 2,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
            }}
            onClick={(e) => {
              let data = {
                id: productsData[index].id,
                attributes: productsData[index].attributes,
                images: productsData[index].images,
                price: productsData[index].price,
              };
              enqueueSnackbar(data.attributes.name + " eklendi.", {
                variant: "product",
                img: data.images,
              });
              onSelectProduct(data);
            }}
          >
            <img
              src={
                productsData[index].images.find(
                  ({ imageType }) => imageType == "product"
                ).url
              }
              width={"100%"}
            />
            <Typography
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "black",
                fontWeight: "bold",
              }}
            >
              {productsData[index].price.normal / 100}₺
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                color: "black",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              {productsData[index].attributes.name}
            </Typography>
          </Button>
        )}
      </div>
    );
  };

  useData(
    API[selectedCategory],
    (data) => {
      let array = [];
      setProductsData([]);
      data.children.map(({ products }) => {
        array.push(...products);
      });
      setTimeout(() => {
        setProductsData(array);
        onProducts(array);
        onCount(array.length);
      }, 1000);
    },
    () => {
      let array = [];
      if (selectedCategory == "all") {
        categories.map(({ value }) => {
          if (value != "all") {
            axios.get(API[value]).then((response) => {
              response.data.children.map(({ products }) => {
                array.push(...products);
              });
              setTimeout(() => {
                setProductsData(array);
                onProducts(array);
                onCount(array.length);
              }, 1000);
            });
          }
        });
      }
    },
    [selectedCategory]
  );

  return (
    <Box sx={{ ...sx }}>
      <ButtonGroup
        intialSelected="all"
        buttons={categories}
        onSelect={(v) => {
          setProductsData([]);
          setSelectedCategory(v);
        }}
        borderRadius={10}
        spacing={10}
        border="1px solid black"
      />
      {productsData.length == 0 ? (
        <Box height={700} display={"flex"} alignItems={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeGrid
                style={{ overflowX: "hidden" }}
                columnCount={3}
                columnWidth={width / 3}
                height={height}
                rowCount={productsData.length / 3}
                rowHeight={200}
                width={width}
              >
                {Cell}
              </FixedSizeGrid>
            )}
          </AutoSizer>
        </Box>
      )}
    </Box>
  );
}
