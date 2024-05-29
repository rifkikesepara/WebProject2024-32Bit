import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ButtonGroup from "./ButtonGroup";
import {
  ArrowDownward,
  ArrowUpward,
  FilterList,
  InfoRounded,
  Search,
  Star,
  StarOutline,
} from "@mui/icons-material";
import ProductDetail from "./ProductDetail";
import TextFieldVK from "./TextFieldVK";
import useProduct from "../Hooks/useProduct";
import LOG from "../Debug/Console";
import usePreferences from "../Hooks/usePreferences";
import { GetFromLocalStorage, SaveToLocalStorage } from "../Utils/utilities";
import ScrollButtons from "./ScrollButtons";

const categories = [
  { name: "Favoriler", value: "favourites" },
  { name: "Tüm Ürünler", value: "all" },
  {
    name: "Fırın Ürünleri",
    value: "C02",
  },
  {
    name: "Kahvaltılık",
    value: "C05",
  },
  {
    name: "Meyve ve Sebzeler",
    value: "C01",
  },
  {
    name: "Elektronik",
    value: "C18",
  },
  {
    name: "Et ve Balık",
    value: "C04",
  },
  {
    name: "Atıştırmalıklar",
    value: "C06",
  },
  {
    name: "Dondurmalar",
    value: "C09",
  },
  {
    name: "Kişisel Bakım",
    value: "C12",
  },
  {
    name: "Tatlılar",
    value: "C03",
  },
  {
    name: "Dondurlumuş Yiyecekler",
    value: "C10",
  },
  {
    name: "İçecekler",
    value: "C08",
  },
  {
    name: "Temel Gıdalar",
    value: "C07",
  },
  {
    name: "Temizlik",
    value: "C11",
  },
];

export default function Products({
  onSelectProduct = (product) => {},
  onCount = (amount) => {},
}) {
  const { theme } = usePreferences();

  const { products, getAllProducts, getCategorizedProducts, getSubCategories } =
    useProduct();

  const scrollRef = useRef();
  const innerRef = useRef();
  var tempdata = useRef(GetFromLocalStorage("favourites"));
  var filteredProducts = useRef(GetFromLocalStorage("favourites"));
  let sortType = -1;
  const productAmount = useRef(GetFromLocalStorage("favourites").length);

  const [productsData, setProductsData] = useState(
    GetFromLocalStorage("favourites")
  );
  const [productDetailWindow, setProductDetailWindow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [category, setCategory] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState(true);
  const [favourites, setFavourites] = useState(
    GetFromLocalStorage("favourites")
  );

  const clear = () => {
    setSubCategories([]);
    setProductsData([]);
    tempdata.current = [];
    filteredProducts.current = [];
  };
  const set = (array) => {
    setProductsData(array);
    filteredProducts.current = array;
    onCount(array.length);
    productAmount.current = array.length;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const favourites = GetFromLocalStorage("favourites");
  //     set(favourites);
  //     tempdata.current = favourites;
  //     setFavourites(favourites);
  //   }, 1000);
  // }, [products]);

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

  const filterProducts = (filter) => {
    LOG("filterProducts", "green");
    let array = [];
    tempdata.current.map((data) => {
      if (data.attributes.name.toLowerCase().includes(filter.toLowerCase()))
        array.push(data);
    });
    set(array);
    sortProducts(sortType);
  };
  const sortProducts = (type) => {
    LOG("sortProducts", "green");
    var array = [...filteredProducts.current];
    switch (type) {
      case 0: {
        array.sort((a, b) =>
          a.price.discounted > b.price.discounted ? 1 : -1
        );
        break;
      }
      case 1: {
        array.sort((a, b) =>
          a.price.discounted < b.price.discounted ? 1 : -1
        );
        break;
      }
      case 2: {
        array.sort((a, b) =>
          a.attributes.name.localeCompare(b.attributes.name)
        );
        break;
      }
      case 3: {
        array = array.filter((fav) => isFavourite(fav));
      }
    }
    setProductsData(array);
  };

  const setFavourite = (product) => {
    var array = [...favourites];
    if (!isFavourite(product)) {
      array.push(product);
      setFavourites(array);
    } else {
      array.splice(array.indexOf(product), 1);
      setFavourites(array);
    }
    SaveToLocalStorage("favourites", array);
  };

  const isFavourite = (product) => {
    if (
      GetFromLocalStorage("favourites").find(({ id }) => id == product.id) ==
      undefined
    )
      return false;
    else return true;
  };

  const FilterBox = useCallback(
    ({ open }) => {
      return (
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-around",
            right: 0,
            top: 0,
            transition: "opacity 0.2s ease,height 0.2s ease",
            opacity: !open ? 1 : 0,
            height: open ? 0 : 60,
            padding: 1,
            zIndex: 1,
            borderRadius: 0,
            p: 0,
            paddingBottom: open ? 0 : 1,
          }}
        >
          <TextFieldVK
            placeholder="Ürün Ara"
            inputSX={{ boxSizing: "inherit", height: "100%" }}
            onChange={(e, value) => filterProducts(value)}
            startAdornment={<Search />}
          />
          <Select
            value={sortType}
            sx={{ width: 200 }}
            onChange={(e) => {
              sortType = e.target.value;
              sortProducts(e.target.value);
            }}
          >
            <MenuItem value={-1}>None</MenuItem>
            <MenuItem value={0}>Fiyat Artan</MenuItem>
            <MenuItem value={1}>Fiyat Azalan</MenuItem>
            <MenuItem value={2}>A-Z</MenuItem>
            <MenuItem value={3}>Favoriler</MenuItem>
          </Select>
        </Box>
      );
    },
    [subCategories]
  );

  const CellContent = (productsData, index) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Button
          disableRipple
          key={productsData[index].id}
          color="primary"
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
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0px 0px 20px -1px rgba(0, 0, 0, 0.3)",
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
                    productsData[index].price.normal !=
                      productsData[index].price.discounted && "green",
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
                  productsData[index].price.normal !=
                    productsData[index].price.discounted && "red",
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
              fontSize: "95%",
            }}
            maxHeight={35}
            overflow={"hidden"}
          >
            {productsData[index].attributes.name}
          </Typography>
        </Button>
        <Paper
          sx={{ position: "absolute", top: 60, right: -10, borderRadius: 100 }}
        >
          <IconButton
            onClick={() => {
              setFavourite(productsData[index]);
              setProductsData(productsData);
            }}
          >
            {isFavourite(productsData[index]) ? <Star /> : <StarOutline />}
          </IconButton>
        </Paper>
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

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Paper sx={{ zIndex: 100, position: "relative" }} elevation={3}>
          <ButtonGroup
            elevation={0}
            force={true}
            intialSelected="favourites"
            sx={{
              zIndex: 10,
              paddingTop: 7,
              paddingBottom: 1,
              "&::-webkit-scrollbar": { height: 0 },
            }}
            buttons={categories}
            onSelect={(v) => {
              clear();
              var datas;
              setCategory(v);
              setTimeout(() => {
                if (v == "all") {
                  datas = getAllProducts();
                } else if (v == "favourites") {
                  datas = GetFromLocalStorage("favourites");
                  setFavourites(datas);
                } else {
                  datas = getCategorizedProducts(v);
                  setSubCategories(getSubCategories(v));
                }
                set(datas);
                tempdata.current = datas;
              }, 1000);
            }}
            borderRadius={10}
            spacing={10}
            border="1px solid black"
          />
          <Stack direction={"row"}>
            <ButtonGroup
              sx={{
                overflowY: "hidden",
                transition: "transform 0.2s ease",
                transform:
                  subCategories?.length == 0
                    ? "translate(-100%, 0px)"
                    : "translate(0px, 0px)",
                "&::-webkit-scrollbar": { height: 0 },
                width: "100%",
              }}
              buttonSX={{ minWidth: 200, height: 40 }}
              borderRadius={10}
              spacing={10}
              border="1px solid black"
              buttons={subCategories}
              onSelect={(v, e) => {
                var datas;
                if (v) datas = getCategorizedProducts(v);
                else datas = getCategorizedProducts(category);
                tempdata.current = datas;
                set(datas);
              }}
              elevation={0}
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
                sx={{ fontSize: 30 }}
                onClick={() => setSearch(!search)}
              >
                <FilterList fontSize="inherit" />
              </IconButton>
            </Box>
          </Stack>
          <FilterBox open={search} />
        </Paper>
        {productsData?.length == 0 ? (
          <Box
            height={"80%"}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
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
            <ScrollButtons
              scrollRef={scrollRef}
              sx={{ zIndex: 1000, top: 0, right: "43%" }}
              elevation={0}
            />
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeGrid
                  outerRef={scrollRef}
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
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            boxShadow: "10px 20px 50px 70px " + theme.palette.background.paper,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          Ürün Sayısı: {productAmount.current}
        </Typography>
      </Box>
      <ProductDetail
        product={selectedProduct}
        open={productDetailWindow}
        onClose={(e) => setProductDetailWindow(false)}
      />
    </>
  );
}
