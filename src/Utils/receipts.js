import {
  GetFromLocalStorage,
  getDateFromString,
  getValueByPercentege,
  isBetweenDates,
} from "./utilities";

//returns the receipts between indicated string dates
export const getReceiptsBetweenDates = (beginDate = "", endDate = "") => {
  const bD = getDateFromString(beginDate);
  const eD = getDateFromString(endDate);
  const receipts = GetFromLocalStorage("receipts");

  return receipts.filter((receipt) => {
    const date = getDateFromString(receipt.date);
    if (isBetweenDates(bD, eD, date)) return true;
    return false;
  });
};

//returns an receipt array collapsed by their date
export const getCollapsedReceiptsByDate = () => {
  const temp = [];
  const receipts = GetFromLocalStorage("receipts");
  receipts.forEach((receipt) => {
    const index = temp.findIndex(
      ({ date }) => date === receipt.date.split(" ")[0]
    );
    if (index === -1)
      temp.push({ date: receipt.date.split(" ")[0], receipts: [receipt] });
    else temp[index].receipts.push(receipt);
  });

  return temp;
};

//calculates and returns total tax amount of products in the receipt
export const getTotalTaxOfReceipt = (receipt) => {
  return receipt.products
    .map(({ price }) => {
      return getValueByPercentege(price.cashout / 100, price.tax);
    })
    .reduce((val1, val2) => val1 + val2)
    .toFixed(2);
};

//returns a tax object which the total taxes are seperated by their percentage
export const getTaxesFromReceipt = (receipt) => {
  let taxes = { "%1": 0, "%8": 0, "%18": 0 };
  receipt.products.forEach(({ price }) => {
    switch (price.tax) {
      case 1:
        taxes["%1"] += getValueByPercentege(price.cashout / 100, price.tax);
        break;
      case 8:
        taxes["%8"] += getValueByPercentege(price.cashout / 100, price.tax);
        break;
      case 18:
        taxes["%18"] += getValueByPercentege(price.cashout / 100, price.tax);
        break;
      default:
        break;
    }
  });

  return taxes;
};

//returns the receipt by indicated receiptID
export const getReceiptFromID = (receiptID) => {
  return GetFromLocalStorage("receipts").find(({ id }) => id == receiptID);
};
