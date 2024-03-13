import {
  Box,
  Button,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import useData from "../Hooks/useData";
import API from "../productsAPI.json";
import { useState } from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const categories = [
  {
    name: "Fırın Ürünleri",
    keyword: "bakery",
  },
  {
    name: "Kahvaltılık",
    keyword: "breakfast",
  },
  {
    name: "Meyve ve Sebzeler",
    keyword: "fruit-vegetables",
  },
  {
    name: "Elektronik",
    keyword: "electronics",
  },
  {
    name: "Et ve Balık",
    keyword: "meat-fish",
  },
  {
    name: "Atıştırmalıklar",
    keyword: "junkFood",
  },
  {
    name: "Dondurmalar",
    keyword: "icecream",
  },
  {
    name: "Kişisel Bakım",
    keyword: "bodyCareStuff",
  },
  {
    name: "Tatlılar",
    keyword: "desert",
  },
  {
    name: "Dondurlumuş Yiyecekler",
    keyword: "fastFood",
  },
  {
    name: "İçecekler",
    keyword: "drinks",
  },
  {
    name: "Temel Gıdalar",
    keyword: "basicGrocery",
  },
  {
    name: "Temizlik",
    keyword: "cleaningStuff",
  },
];

export default function Products({ sx, onSelectProduct = () => {} }) {
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const Cell = ({ columnIndex, rowIndex, style }) => {
    let index =
      rowIndex != 0 ? columnIndex + rowIndex * 3 : columnIndex + rowIndex;

    // console.log(productsData[index]);
    return (
      <div style={{ ...style, display: "flex", justifyContent: "center" }}>
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
      console.log(data.children[0].products.length);
      setProductsData(data.children[0].products);
    },
    () => {},
    selectedCategory
  );
  return (
    <Box sx={{ ...sx }}>
      <ToggleButtonGroup
        sx={{ overflowX: "scroll" }}
        onChange={(e, v) => {
          setProductsData([]);
          setSelectedCategory(v);
          if (v == null) setSelectedCategory("all");
        }}
        exclusive
        value={selectedCategory}
      >
        {categories.map(({ name, keyword }, index) => {
          return (
            <ToggleButton
              key={index}
              sx={{
                padding: 0,
                minWidth: 150,
              }}
              value={keyword}
            >
              {name}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      {productsData.length == 0 ? (
        <Skeleton width={"100%"} height={750} variant="rounded" />
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
                style={{ paddingBottom: 50 }}
                columnCount={3}
                columnWidth={200}
                height={height}
                rowCount={productsData.length / 3}
                rowHeight={200}
                width={width}
              >
                {/* {productsData.map(({ id, attributes, images, price }, index) => {
            return (
              <Button
                key={index}
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
                    id: id,
                    attributes: attributes,
                    images: images,
                    price: price,
                  };
                  onSelectProduct(data);
                }}
              >
                <img
                  src={
                    images.find(({ imageType }) => imageType == "product").url
                  }
                  width={"100%"}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    color: "black",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {attributes.name}
                </Typography>
              </Button>
            );
          })} */}
                {Cell}
              </FixedSizeGrid>
            )}
          </AutoSizer>
        </Box>
      )}
    </Box>
  );
}
