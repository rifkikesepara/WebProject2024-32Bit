import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import useData from "../Hooks/useData";
import API from "../productsAPI.json";
import { useEffect, useState } from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ButtonGroup from "./ButtonGroup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FilterList, SearchOutlined } from "@mui/icons-material";

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

const getTotalProducts = (data) => {
  let total = 0;
  data?.map((data) => {
    total += data?.products?.length;
  });

  return total;
};

export default function Products({
  sx,
  onSelectProduct = () => {},
  onProducts = () => {},
  onCount = () => {},
}) {
  const [productsData, setProductsData] = useState([]);

  const [selectedSubCategory, setSelectedSubCategory] = useState("Ekmek");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [subCat, setSubCat] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getIndexOfSubCategory = (cat) => {
    return subCat.indexOf(subCat.find(({ name }, index) => name == cat));
  };

  const CellContent = (productsData, index) => {
    return (
      <Button
        disableRipple
        key={productsData[index].id}
        sx={{
          width: 170,
          height: 150,
          borderRadius: 5,
          overflow: "visible",
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "transform 0.2s ease", //animation
          backgroundColor: "white",
          boxShadow: "0px 0px 20px -1px rgba(0, 0, 0, 0.3)",
          //scaling animation when it's hovered
          "&:hover": {
            transition: "transform 0.2s ease",
            cursor: "pointer",
            transform: "scale(1.05)",
          },
        }}
        onClick={(e) => {
          //adjusting product data to pass into the chekout section
          let data = {
            id: productsData[index].id,
            attributes: productsData[index].attributes,
            images: productsData[index].images,
            price: productsData[index].price,
          };

          //pushing a snackbar to show the user which product has been added
          enqueueSnackbar(data.attributes.name + " eklendi.", {
            variant: "product",
            img: data.images,
          });

          onSelectProduct(data); //passing product data to parent component
        }}
      >
        <img
          src={
            productsData[index].images.find(
              ({ imageType }) => imageType == "product"
            ).url
          }
          width={"75%"}
          style={{
            position: "absolute",
            bottom: "50%",
            borderRadius: 100,
            boxShadow: "0px 0px 10px -1px rgba(0, 0, 0, 0.3)",
          }}
        />
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
          }}
        >
          {productsData[index].price.normal / 100}₺
        </Typography>
        <Typography
          sx={{
            width: "100%",
            color: "black",
            fontSize: "95%",
          }}
          maxHeight={35}
          overflow={"hidden"}
        >
          {productsData[index].attributes.name}
        </Typography>
      </Button>
    );
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    //adjusting index as ascending number
    let index =
      rowIndex != 0 ? columnIndex + rowIndex * 3 : columnIndex + rowIndex;

    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {productsData[index] != undefined && CellContent(productsData, index)}
      </div>
    );
  };

  useData(
    API[selectedCategory],
    (data) => {
      let array = [];
      setProductsData([]);
      // data.children.map(({ products }) => {
      //   array.push(...products);
      // });
      setTimeout(() => {
        let array = [];
        // setProductsData(array);
        data.children.map(({ name }) =>
          array.push({ name: name, value: name })
        );
        setSubCat(array);

        setProductsData(
          data.children[getIndexOfSubCategory(selectedSubCategory)]?.products
        );
        // onProducts(array);
        // console.log(subCat);
        onCount(
          data.children[getIndexOfSubCategory(selectedSubCategory)]?.products
            .length
        );
      }, 1000);
    },
    () => {
      let array = [];
      if (selectedCategory == "all") {
        setSubCat([]);
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
    [selectedCategory, selectedSubCategory]
  );

  return (
    <Box sx={{ ...sx }}>
      <ButtonGroup
        elevation={0}
        sx={{
          zIndex: 3,
          paddingTop: 5,
          paddingBottom: 1,
          "&::-webkit-scrollbar": { height: 0 },
        }}
        intialSelected="all"
        buttons={categories}
        onSelect={(v) => {
          setProductsData([]); //emptying the products data
          setSubCat([]);
          setSelectedCategory(v); //indicating which category selected
          console.log(selectedCategory);
        }}
        borderRadius={10}
        spacing={10}
        border="1px solid black"
      />
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minHeight: 50,
          paddingBottom: 1,
          zIndex: 1,
        }}
        elevation={3}
      >
        <ButtonGroup
          sx={{
            overflowY: "hidden",
            transition: "transform 0.2s ease",
            transform:
              subCat?.length == 0 || selectedCategory == "all"
                ? "translate(-100%, 0px)"
                : "translate(0px, 0px)",
            "&::-webkit-scrollbar": { height: 0 },
            width: "100%",
          }}
          buttonSX={{ minWidth: 200, height: 40 }}
          borderRadius={10}
          spacing={10}
          border="1px solid black"
          intialSelected={subCat[0]?.name}
          buttons={subCat}
          onSelect={(v) => {
            setSelectedSubCategory(v);
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingInline: 1,
            height: "100%",
          }}
        >
          <IconButton
            sx={{ fontSize: 30, display: { md: "block", xs: "none" } }}
          >
            <SearchOutlined fontSize="inherit" />
          </IconButton>
          <IconButton sx={{ fontSize: 30 }}>
            <FilterList fontSize="inherit" />
          </IconButton>
        </Box>
      </Paper>
      {productsData?.length == 0 ? (
        <Box height={700} display={"flex"} alignItems={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#ecedf1",
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeGrid
                style={{ overflowX: "hidden" }}
                columnCount={3}
                columnWidth={width / 3}
                height={height}
                rowCount={productsData?.length / 3 + 1}
                rowHeight={220}
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
