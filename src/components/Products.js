import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import useData from "../Hooks/useData";
import API from "../productsAPI.json";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ButtonGroup from "./ButtonGroup";
import axios from "axios";
import {
  ArrowDownward,
  ArrowUpward,
  FilterList,
  SearchOutlined,
  InfoRounded,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import ProductDetail from "./ProductDetail";

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
  open,
  onClose = () => {},
  onSelectProduct = () => {},
  onProducts = () => {},
  onCount = () => {},
}) {
  const Transition = useMemo(
    () =>
      forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      }),
    []
  );

  const scrollRef = useRef();

  const tempdata = useRef([]);
  const [productsData, setProductsData] = useState([]);

  const [productDetailWindow, setProductDetailWindow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [subCat, setSubCat] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setSubCat([]);
    setSelectedCategory("all");
  }, [open]);

  const getIndexOfSubCategory = (cat) => {
    return subCat.indexOf(subCat.find(({ name }, index) => name == cat));
  };

  const selectProduct = (product, addToCart = true) => {
    //adjusting product data to pass into the chekout section
    let data = {
      id: product.id,
      attributes: product.attributes,
      images: product.images,
      price: product.price,
      stock: product.stock,
    };

    if (addToCart) {
      onSelectProduct(data); //passing product data to parent component
    }
    setSelectedProduct(data);
  };

  const handleFilter = (e) => {
    filterProducts(e.target.value);
  };

  const filterProducts = (filter) => {
    let array = [];
    tempdata.current.map((data) => {
      if (data.attributes.name.toLowerCase().includes(filter.toLowerCase()))
        array.push(data);
    });
    setProductsData(array);
  };

  const CellContent = (productsData, index) => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <Button
          disableRipple
          key={productsData[index].id}
          sx={{
            width: 170,
            height: 200,
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
            selectProduct(productsData[index]);
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
          <Box sx={{ display: "flex" }}>
            {productsData[index].price.normal !=
              productsData[index].price.discounted && (
              <Typography
                sx={{
                  color:
                    productsData[index].price.normal ==
                    productsData[index].price.discounted
                      ? "black"
                      : "green",
                  fontWeight: "bold",
                  mr: 1,
                }}
              >
                {productsData[index].price.discounted / 100}₺
              </Typography>
            )}
            <Typography
              sx={{
                color:
                  productsData[index].price.normal ==
                  productsData[index].price.discounted
                    ? "black"
                    : "red",
                fontWeight: "bold",
                textDecoration:
                  productsData[index].price.normal !=
                    productsData[index].price.discounted && "line-through",
              }}
            >
              {productsData[index].price.normal / 100}₺
            </Typography>
          </Box>
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
        <IconButton
          onClick={() => {
            selectProduct(productsData[index], false);
            setProductDetailWindow(true);
          }}
          sx={{ position: "absolute", bottom: 40 }}
        >
          <InfoRounded />
        </IconButton>
      </Box>
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
      setProductsData([]);
      setTimeout(() => {
        let array = [];
        data.children.map(({ name }) =>
          array.push({ name: name, value: name })
        );
        setSubCat(array);

        setProductsData(
          data.children[getIndexOfSubCategory(selectedSubCategory)]?.products
        );
        tempdata.current =
          data.children[getIndexOfSubCategory(selectedSubCategory)]?.products;
        onCount(
          data.children[getIndexOfSubCategory(selectedSubCategory)]?.products
            .length
        );
        setProductAmount(
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
                tempdata.current = array;
                onProducts(array);
                onCount(array.length);
                setProductAmount(array.length);
              }, 1000);
            });
          }
        });
      }
    },
    [selectedCategory, selectedSubCategory, open]
  );
  return (
    <Dialog
      TransitionComponent={Transition}
      maxWidth="xl"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          margin: 0,
          marginInline: { md: 6, xs: 0 },
          maxWidth: { xs: "98%", md: 1500 },
          borderBottomLeftRadius: { xs: 0, md: 30 },
          borderBottomRightRadius: { xs: 0, md: 30 },
          maxHeight: "90vh",
          marginTop: { xs: "auto", md: 0 },
        },
      }}
    >
      <Box
        sx={{
          ...sx,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            marginLeft: "auto",
            position: "absolute",
            right: 10,
            zIndex: 11,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <ButtonGroup
          elevation={0}
          intialSelected="all"
          sx={{
            zIndex: 3,
            paddingTop: 5,
            paddingBottom: 1,
            "&::-webkit-scrollbar": { height: 0 },
          }}
          buttons={categories}
          onSelect={(v) => {
            setProductsData([]); //emptying the products data
            setSubCat([]);
            setSelectedCategory(v); //indicating which category selected
            // console.log(selectedCategory);
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
            // intialSelected={subCat[0]?.name}
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
            <TextField
              disabled={
                productsData?.length <= 0 || productsData == undefined
                  ? true
                  : false
              }
              sx={{
                transition: "width 0.2s ease",
                width: !search ? 0 : 200,
                opacity: search ? 1 : 0,
              }}
              placeholder="Ürün Ara"
              onChange={handleFilter}
            />
            <IconButton
              sx={{
                fontSize: 30,
                display: { md: "block", sm: "block", xs: "none" },
              }}
              onClick={() => setSearch(!search)}
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
            <Box
              sx={{
                position: "absolute",
                right: 0,
                display: "flex",
                flexDirection: "column",
                zIndex: 10,
              }}
            >
              <IconButton
                sx={{ fontSize: 40 }}
                onClick={() => {
                  scrollRef.current._outerRef.scroll({
                    behavior: "smooth",
                    top: scrollRef.current.state.scrollTop - 500,
                  });
                }}
              >
                <ArrowUpward fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={{ fontSize: 40 }}
                onClick={() => {
                  scrollRef.current._outerRef.scroll({
                    behavior: "smooth",
                    top: scrollRef.current.state.scrollTop + 500,
                  });
                }}
              >
                <ArrowDownward fontSize="inherit" />
              </IconButton>
            </Box>
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeGrid
                  ref={scrollRef}
                  style={{ overflowX: "hidden" }}
                  columnCount={3}
                  columnWidth={width / 3}
                  height={height}
                  rowCount={productsData?.length / 3 + 1}
                  rowHeight={260}
                  width={width}
                >
                  {Cell}
                </FixedSizeGrid>
              )}
            </AutoSizer>
          </Box>
        )}
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          boxShadow: "10px 20px 50px 70px white",
          zIndex: 100,
        }}
      >
        Ürün Sayısı: {productAmount}
      </Typography>
      <ProductDetail
        product={selectedProduct}
        open={productDetailWindow}
        onClose={(e) => setProductDetailWindow(false)}
      />
    </Dialog>
  );
}
