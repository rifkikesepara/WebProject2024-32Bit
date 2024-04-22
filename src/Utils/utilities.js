export const getDayString = (index) => {
  switch (index) {
    case 1:
      return "Pazartesi";
    case 2:
      return "Salı";
    case 3:
      return "Çarşamba";
    case 4:
      return "Perşembe";
    case 5:
      return "Cuma";
    case 6:
      return "Cumartesi";
    case 0:
      return "Pazar";
  }
};

export const getMonthString = (index) => {
  switch (index) {
    case 0:
      return "Ocak";
    case 1:
      return "Şubat";
    case 2:
      return "Mart";
    case 3:
      return "Nisan";
    case 4:
      return "Mayıs";
    case 5:
      return "Haziran";
    case 6:
      return "Temmuz";
    case 7:
      return "Ağustos";
    case 8:
      return "Eylül";
    case 9:
      return "Ekim";
    case 10:
      return "Kasım";
    case 11:
      return "Aralık";
  }
};
