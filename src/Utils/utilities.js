//returns the name of the day by it's index
export const getDayString = (index) => {
  switch (index) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
    default:
      break;
  }
};

//returns the name of the month by it's index
export const getMonthString = (index) => {
  switch (index) {
    case 0:
      return "January";
    case 1:
      return "Feburary";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      break;
  }
};

//returns Date object by indicated date string(12.10.2024 12:12)
export const getDateFromString = (dateStr = "12.10.2024 12:12") => {
  const dateAndTimeStr = dateStr.split(" ");
  const date = dateAndTimeStr[0].split(".");
  const time = dateAndTimeStr[1].split(":");
  return new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
};

//calculates the day difference between the dates a and b
export function dateDiffInDays(a = Date, b = Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

//checks if the date is between startDate and endDate
export const isBetweenDates = (
  startDate = Date,
  endDate = Date,
  date = Date
) => {
  return (
    date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()
  );
};

//returns the value of the number by the percentage
export const getValueByPercentege = (value, percentege) => {
  return (value / 100) * percentege;
};

//returns the new cashout data by changing the amount of indicated product
export function ChangeProductAmount(amount, product, cashout) {
  const temp = [...cashout];
  const index = temp.findIndex(({ id }) => id === product.id);
  temp[index].count = amount;
  temp[index].price.cashout = temp[index].price.discounted * amount;
  return temp;
}

//store data to local storage-------------
export const SaveToLocalStorage = (item = "", data = JSON) => {
  localStorage.setItem(item, JSON.stringify(data));
};
export const GetFromLocalStorage = (item = "") => {
  if (localStorage.getItem(item) == undefined) {
    localStorage.setItem(item, JSON.stringify([]));
    return [];
  } else return JSON.parse(localStorage.getItem(item));
};
//----------------------------------------

//store data to session storage--------------
export const SaveToSessionStorage = (item = "", data = JSON) => {
  sessionStorage.setItem(item, JSON.stringify(data));
};
export const GetFromSessionStorage = (item = "") => {
  if (sessionStorage.getItem(item) == undefined) {
    sessionStorage.setItem(item, JSON.stringify([]));
    return [];
  } else return JSON.parse(sessionStorage.getItem(item));
};
//----------------------------------------------
