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
  }
};

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
  }
};

export const SaveToLocalStorage = (item = "", data = JSON) => {
  localStorage.setItem(item, JSON.stringify(data));
};
export const SaveToSessionStorage = (item = "", data = JSON) => {
  sessionStorage.setItem(item, JSON.stringify(data));
};

export const GetFromLocalStorage = (item = "") => {
  return localStorage.getItem(item) == undefined
    ? []
    : JSON.parse(localStorage.getItem(item));
};
export const GetFromSessionStorage = (item = "") => {
  return sessionStorage.getItem(item) == undefined
    ? []
    : JSON.parse(sessionStorage.getItem(item));
};

export const getDateFromString = (dateStr) => {
  const dateAndTimeStr = dateStr.split(" ");
  const date = dateAndTimeStr[0].split(".");
  const time = dateAndTimeStr[1].split(":");
  return new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
};

export function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
