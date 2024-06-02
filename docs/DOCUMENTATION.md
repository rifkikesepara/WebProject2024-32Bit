 # **_Components_**

## ButtonGroup

This component provides groups of buttons to select

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container` |
| elevation     | number                  |0|`Shadow depth value. It accepts values between 0 and 24 inclusive.` |
| force         | boolean         |false|`Indicates if it will be forced that at least one button will be selected.` |
| intialSelected   | string         |-|`It indicates the value of button that will be selected when the component initialized`|
| buttons   | [array](#button-group-button-data-format)|[]| `The data array of the buttons`|
| buttonSX  | object|-|`It defines the styling of the buttons`|
| spacing   | number|0|`It defines spacing between buttons`|
| border|string|"none"| `It defines the borders of the buttons`|
| borderRadius | number|0| `It defines the border radius of the buttons`|
| onSelect|function|<p style="width:110px;margin:auto">(value,event)=>{}</p>| `The callback function that is executed whenever a button is selected`|

## ChartLine

This component provides a line chart with given datas.

**PROPS**
|name|type|Default|Description|
|---|:--:|:-----:|------- |
|chartData| [array](#chartdata-data-format)|-|`The data array for the line chart values.` |


## CheckoutTable

This component provides a table with products, allows you to change the amount of them and delete them, calculates total values of the product.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container` |
| disabled| boolean|false| `It defines if the table is accessible or not`|
|data|[array](#productdata-data-format)|-| `The array of products data`|
|selectionValues|array|-| `The array of strings that shows which products have been selected.`|
|accordionVisible|boolean|true| `The boolean that indicates if the default accordion will be shown.`|
|onFocus|function|<p style="width:170px;margin:auto"> (event, product) => {}</p>| `The callback function that is executed for the changing the amount of the selected product.`|
|onChange|function|<p style="width:170px;margin:auto">(event, newFormat) => {}</p>|`The callback function that provides the selected products`|
|onTotal|function|<p style="width:170px;margin:auto"> (total) => {}</p>| `The callback function that provides the object of calculated values of the products, is executed whenever the table's data changed`|


## Clock

This component provides a text which shows the clock.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container` |

## DialogWithButtons

This component provides dialog window with scrolling buttons.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container` |
|scrollRef|ref|- |`The ref of the div that will be scrolled by the scrolling buttons.`|
|open|boolean|true |`The boolean that indicates if the dialog must open or not.`|
|startAdornment|element |<></>| `Adding new elements to dialog's start`|
|endAdornment|element |<></>| `Adding new elements to dialog's end`|
|endAdornment|element |<></>| `Adding new elements to dialog's end`|
|buttons|object |<p style="width:170px;margin:auto">{ startAdornment: <></>, endAdornment: <></> }</p>| `Adding new button to start and end of the scrolling button`|
|onClose|function |<p style="width:170px;margin:auto">(e) => {}</p>| `The callback function that is executed whenever dialog is closed`|

## ProductDetail

The component that shows the detailed informaiton of the product.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
|open|boolean|false |`The boolean that indicates if the dialog must open or not.`|
|product|object |-| `The product's data.`|
|onClose|function |<p style="width:170px;margin:auto">(e) => {}</p>| `The callback function that is executed whenever dialog is closed.`|

## Products

The component lists the registered products, provides to select them, add them into the favourites and show their detailed information.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
|onSelectProduct|function |<p style="width:170px;margin:auto">(product) => {}</p>| `The callback function that is executed whenever a product is selected.`|
|onCount|function |<p style="width:170px;margin:auto">(amount) => {}</p>| `The callback function that is executed whenever category of the products changes to show the amount of the product.`|

## Receipt

The component that shows the receipt of the sale.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container.` |
| receiptData            | [object](#receipt-data-format)|-| `The data for the receipt to show.` |

## ReturnReceipt

The component that shows the receipt of the return.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container.` |
| receiptData            | [object](#returnReceiptDataExample)|-| `The data for the receipt to show.` |

## ScrollButtons

The component provides scroll button to scroll the given element's ref.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `It defines the styling of the container.` |
| scrollRef            | ref|-| `The reference of element that will be scrolled.` |
| direction            | string|"row"| `It defines the direction of the buttons.` |
| startAdorment            | element|<></>| `Adding new elements to start of the scrolling buttons.` |
| endAdorment            | element|<></>| `Adding new elements to end of the scrolling buttons.` |
| elevation     | number                  |1|`Shadow depth value. It accepts values between 0 and 24 inclusive.` |

## ShiftButton

The component provides a button to start and end a shift.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| disabled            | boolean                  |false| `It defines if the button is accessible or not.` |

## TextFieldVK

The component that is a text field which includes a virtual keyboard.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| disabled            | boolean                  |false| `It defines if the text field is accessible or not.` |
| value            | any                  |-| `The value of the input element.` |
| name            | string                  |-| `Name attribute of the input element.` |
| type            | string                  |"text"| `Type of the input element.` |
| inputSX            | object                  |-| `Styling object of the TextField.` |
| divSX            | object                  |-| `Styling object of the container div.` |
| placeholder            | string                  |-| `The short hint displayed in the input.` |
| autoComplete            | string                  |-| `This prop helps users to fill forms faster, especially on mobile devices.` |
| layout            | string                  |"default"| `Layout of the virtual keyboard.` |
| elevation     | number                  |1|`Shadow depth value. It accepts values between 0 and 24 inclusive.` |
| dialog      | boolean                  |false|`Indicates if the virtual keyboard is gonna be shown as dialog or not.` |
| startAdornment      | element                  |-|`Start adornments of the TextField.` |
|onChange |function |<p style="width:170px;margin:auto">(event, value) => {}</p>| `The callback function that is executed whenever the input of TextField changes.`|
|onClear |function |<p style="width:170px;margin:auto">() => {}</p>| `The callback function that is executed whenever TextFiled input has been cleared.`|

## VirtualKeyboard

The component that is provides a virtual keyboard.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| sx            | object                  |-| `Styling object of the container div.` |
| buttonSX            | object                  |-| `Styling object of the keyboard buttons.` |
| layout            | string                  |-| `Defining the layout (default,numeric,cashier).` |
| initialInput             | string                  |-| `Virtual keyboard's initial input value.` |
|onChangeInput  |function |<p style="width:170px;margin:auto">(input) => {}</p>| `The callback function that shows the current input of the keyboard.`|
|onBlur |function |<p style="width:170px;margin:auto">() => {}</p>| `The callback function that executes whenever user clicks outside of the keyboard's div.`|
| onInit |function |<p style="width:170px;margin:auto">() => {}</p>| `The callback function that is executed when the keyboard is being initialized.`|
| onDone  |function |<p style="width:170px;margin:auto">() => {}</p>| `The callback function that is executed when the tick button on the virtual keyboard is clicked.`|
| onPress  |function |<p style="width:170px;margin:auto">(key) => {}</p>| `The callback function that shows which button on the virtual keyboard has been clicked.`|

## ZReport

The component that provides a Z-Report.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| data            | object                  |-| `Data object for that includes values for the z-report to show.` |

## MiniDrawer

The component that provides a menu that can be expanded.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| expand            |boolean                  |false| `Boolean to expand the drawer.` |
| oriantation             |string                  |"vertical"| `Indicates the oriantation of the drawer ("vertical","horizontal").` |
| items             |[array](#minidrawer-data-format)                  |[]| `Menu items data to be shown as buttons.` |
| onOpen|function|<p style="width:170px;margin:auto">(opened) => {}</p>| `The callback function that shows if the drawer has been expanded or not.` |

## ReturnItemTable

The component that provides the reutnable items considering the given receipt data.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| receipt            |object                  |-| `Receipt data to show the product to return.` |
| onSelected|function|<p style="width:170px;margin:auto">(selectedItems) => {}</p>| ` The callback function that provides the selected items on the table.` |

## CardPayment

The component that provides a demonstration of credit card payment.

**PROPS**

|name|type|Default|Description|
|---|:--:|:-----:|------- |
| open            |boolean                  |false| `The boolean that indicates the dialog window will be shown or not.` |
| onClose|function|<p style="width:170px;margin:auto">() => {}</p>| ` The callback function that is executed whenever the dialog window is closed.` |
| onDone|function|<p style="width:170px;margin:auto">() => {}</p>| ` The callback function that is executed whenever the payment demonstration is finished.` |

---

# Custom Hooks

## useData

This hook is used for fetching data from an api. You can give the api parameter as url or a string array that containes bunch of api urls. It will fetch all the data once. With using this hook you can manipulate the data that you fetched from the api, with passing a function in it.

```typescript
useData(api: string | [], response: (data: []) => void , fnc: () => void, dependencies: [])
```

---

## useAlert

This hook gives you the ability to access the alert component's context so that you can manipulate variables of alert such as message type **(success, error)** , alert message and alert duration. Returns the [AlertContext](#alertcontext)

```typescript
const{setAlert} = useAlert();

setAlert({message: string, type: string, duration: number});
```

### AlertContext
```javascript
const AlertContext = createContext({
  alert: "",
  setAlert: ({ text = "Test", type = "success", duration = 2000 }) => {}, //sets an alert with parameters
});
```

---

## usePreferences

This hook is used for geteting the user preferences on the application. Such as getting the theme, toggling the theme,getting the environment that the user is using etc. Returns [ThemeContext](#themecontext).

```typescript
const {theme, toggleTheme, isDesktop} = usePreferences();
```

### ThemeContext
```javascript
const ThemeContext = createContext({
  theme: LightTheme, //intial theme
  isDesktop: true, //indicates if the environment is desktop or not
  isThemeDark: false, //indicates if the theme is dark or not
  toggleTheme: () => {}, //toggles the theme between dark and light
});
```
---

## useProduct
This hook is used for getting the product from anywhere in tha application using it. You can change the products, get all the products data, get products data which has been categorized etc. Returns [ProductContext](#productcontext)

```javascript
const {getAllProducts, getCategorizedProducts} = useProduct();

const electronics = getCategorizedProducts("C18");
```

### ProductContext
```javascript
const ProductContext = createContext({
  products: [],
  setProducts: ([]) => {}, //changes the array of products
  getAllProducts: () => [{}], //returns the array of all the products
  getCategorizedProducts: (category = "C01") => [{}], //returns the array of categorized products 
  getSubCategories: (category) => ["", ""], //returns the array of sub-categorized products
});
```

---
## useStore
This hook is used for getting the data about store's information. Such as store online status, application version etc. Constantly fetching data from public/storeInfo.json

```javascript
const storeInfo = useStore();

console.log(storeInfo.online);
```
---
## useTimer
This hook is used for setting a timer with a specific name. You can set multiple timers. They will keep counting until they are stopped. Returns [TimerContext](#timercontext)

```javascript
const {addTimer, getTimer} = useTimer();

addTimer("newTimer");
console.log(getTimerValue("newTimer").seconds);
```

### TimerContext
```javascript
const TimerContext = createContext({
  timers: [], //the array that contains all the timers
  addTimer: (name = "") => {}, //adds a new timer
  getTimerValue: (name) => ({ hours: 0, minutes: 0, seconds: 0 }), //gets the timer's value
  stopTheTimer: (name) => {}, //stops the timer
});
```






# Data Types

### Button Group Button Data Format
```javascript
[...buttons,{ name: "favourites", value: "favourites" }]
```

### ChartData Data Format
```javascript
[...chartData,{
        id: receipt.id,
        time: getDateFromString(receipt.date),
        amount: receipt.payment.total,
        discount: receipt.payment.discount,
        payback: receipt.payment.payback,
}]
```

### ProductData Data Format
```javascript
[...products,{
        id: "20000761",
        attributes: {
          returnDay: 3,
          collections: ["", "seciliurunler"],
          HEMEN_maxWeight: 7500,
          HEMEN_minWeight: 500,
          brand: null,
          categoryRank: 102002,
          netWeight: 1000,
          depolamaKosulu: "Meyve-Sebze",
          name: "Domates Kg",
          salesUnitOfMeasure: "KG",
          seoUrl: "https://www.a101.com.tr/kapida/meyve-sebze/domates-kg_p-20000761",
          baseUnitOfMeasure: "KG",
          nitelikAdi: "Regüler",
          SLOT_minWeight: 500,
          barcodes: ["2060000001436", "2890642", "2920761"],
          grossWeight: 1000,
          stepper: 100,
          SLOT_maxWeight: 10000,
          hediye: true
        },
        images: [
          {
            id: "yerliUretim",
            isExternal: false,
            imageType: "badge",
            tags: [],
            url: "https://api.a101kapida.com/dbmk89vnr/CALL/Image/get/yerliUretim_256x256.png"
          },
          {
            id: "0YOQeAIoZ0",
            isExternal: false,
            imageType: "product",
            tags: [],
            url: "https://api.a101kapida.com/dbmk89vnr/CALL/Image/get/0YOQeAIoZ0_256x256.png"
          }
        ],
        price: {
          normal: 3875,
          normalStr: "₺38,75",
          discounted: 2995,
          discountedStr: "₺29,95",
          discountRate: 23,
          discountRateStr: "%23 İNDİRİM",
          tax: 8,
          cashout: 2995
        },
        stock: 26000,
        count: 1
}]
```




### Receipt Data Format
```javascript
{
    id: 0,
    date: "01.06.2024 16:49:15",
    products:[...], 
    payment: {
        cash: 200,
        card: 100,
        change: 42.1,
        total: 257.9,
        subTotal: 338.4,
        payback: 60,
        discount: 20.5
    }
},
```

### ReturnReceipt Data Format
```javascript
{
    id: 0,
    receiptID: 0,
    returnedItems: [...],
    date: "01.06.2024 20:37:42"
},
```

### MiniDrawer Data Format
```javascript
[...items,{
    name: "sale",
    icon: (
      <LocalGroceryStoreIcon
        sx={{
          backgroundColor: "#65a614",
          fontSize: { md: 75, sm: 75, xs: 60 },
          color: "white",
          padding: 2,
          borderRadius: 5,
        }}
      />
    ),
    path: "../sale",
    onClick: () => {
      SaveToSessionStorage("cashout", []);
      SaveToSessionStorage("usedOffers", []);
    },
  }
]
```
