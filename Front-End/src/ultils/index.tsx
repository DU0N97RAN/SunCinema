import moment from "moment";

export const formatCurrency = (money?: number) => {
  let newMoney;
  if (!money || money < 0) {
    newMoney = 0;
  } else {
    newMoney = money;
  }
  return newMoney?.toLocaleString("it-IT") + " đ";
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
export const formatDateNew = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
export const formatDateString = (dateString: Date) => {
  const date = new Date(dateString || "");
  return `${date.getDate()} Tháng ${date.getMonth() + 1
    }, ${date.getFullYear()}`;
};

export const convertDate = (date: any) => {
  const dateConvert = new Date(date);
  return dateConvert.getTime();
};
export const convertDateToNumber = (date: any) => {
  return convertDate(formatDateNew(date));
};
export const formatTime = (dateString: Date) => {
  const date = moment(new Date(dateString || "")).format("HH:mm");
  return date;
};

export const discountPercent = (money?: any, discount?: any) => {
  let moneyPrice = (money * discount) / 100;
  return moneyPrice
};

export const convertMovieTime = (seconds: any) => {
  var h,
    m,
    s,
    result = "";
  // HOURs
  h = Math.floor(seconds / 3600);
  seconds -= h * 3600;
  if (h) {
    result = h < 10 ? "0" + h + ":" : h + ":";
  }
  // MINUTEs
  m = Math.floor(seconds / 60);
  seconds -= m * 60;
  result += m < 10 ? "0" + m + ":" : m + ":";
  // SECONDs
  s = seconds % 60;
  result += s < 10 ? "0" + s : s;
  return result;
};

