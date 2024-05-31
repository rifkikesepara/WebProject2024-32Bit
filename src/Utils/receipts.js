import { getValue } from "@testing-library/user-event/dist/utils";
import {
  GetFromLocalStorage,
  getDateFromString,
  getValueByPercentege,
  isBetweenDates,
} from "./utilities";

export const getReceiptsBetweenDates = (beginDate = "", endDate = "") => {
  const bD = getDateFromString(beginDate);
  const eD = getDateFromString(endDate);
  const receipts = GetFromLocalStorage("receipts");

  return receipts.filter((receipt) => {
    const date = getDateFromString(receipt.date);
    if (isBetweenDates(bD, eD, date)) return receipt;
  });
};

export const getCollapsedReceiptsByDate = () => {
  const temp = [];
  const receipts = GetFromLocalStorage("receipts");
  receipts.map((receipt) => {
    const index = temp.findIndex(
      ({ date }) => date == receipt.date.split(" ")[0]
    );
    if (index == -1)
      temp.push({ date: receipt.date.split(" ")[0], receipts: [receipt] });
    else temp[index].receipts.push(receipt);
  });

  return temp;
};

export const getTotalTaxOfReceipt = (receipt) => {
  console.log(receipt);
  return receipt.products
    .map(({ price }) => {
      return getValueByPercentege(price.cashout / 100, price.tax);
    })
    .reduce((val1, val2) => val1 + val2)
    .toFixed(2);
};

export const getTaxesFromReceipt = (receipt) => {
  let taxes = { "%1": 0, "%8": 0, "%18": 0 };
  receipt.products.map(({ price }) => {
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
    }
  });

  return taxes;
};
