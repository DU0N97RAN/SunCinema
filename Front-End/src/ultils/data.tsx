export const screenData = [
  { value: 0, name: "Imax" },
  { value: 1, name: "ScreenX" },
  { value: 2, name: "Curved Screen" },
  { value: 3, name: "Normal" },
];

export const userRole = [
  { value: 0, name: "Khách hàng" },
  { value: 1, name: "Admin" },
];

export const userStatus = [
  { value: 0, name: "Chưa xác thực" },
  { value: 1, name: "Đang hoạt động" },
  { value: 2, name: "Dừng hoạt động" },
];

export const defaultStatus = [
  { value: 0, name: "Hoạt động" },
  { value: 1, name: "Dừng hoạt động" },
];

export const CatePostMenu = [
  { value: 0, name: "Active" },
  { value: 1, name: "Inactive" },
];

export const banks = [
  {
    value: "VNPAYQR",
    name: "Cổng thanh toán VNPAYQR",
    image:
      "data:image/png;base64,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",
  },
  {
    value: "NCB",
    name: "VNPAY- Ngân hàng NCB",
    image:
      "data:image/jpeg;base64,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",
  },
];

export const MovieLimitAge = [
  { name: "G", desc: "Phim dành cho mọi lứa tuổi" },
  { name: "PG", desc: "Phim có một số chi tiết không phù hợp với trẻ nhỏ" },
  {
    name: "PG-13",
    desc: "Phim có một số chi tiết không phù hợp với trẻ dưới 13 tuổi.",
  },
  {
    name: "R",
    desc: "Dưới 17 tuổi không được xem phim nếu không có sự đồng ý của người lớn",
  },
  {
    name: "NC-17",
    desc: "Phim hoàn toàn không dành cho khán giả dưới 17 tuổi",
  },
];

export const MovieCountry = [
  { name: "Việt Nam" },
  { name: "Âu - Mỹ" },
  { name: "Trung Quốc" },
  { name: "Hàn Quốc" },
  { name: "Đài Loan" },
  { name: "Nhật Bản" },
  { name: "Thái Lan" },
  { name: "Ấn Độ" },
  { name: "Quốc giá khác" },
];

export const MoviLanguages = [
  { name: "Vietsub" },
  { name: "Lồng tiếng" },
  { name: "Thuyết minh" },
];

export let dateFake = [
  { profit: 0, date: "01" },
  { profit: 0, date: "02" },
  { profit: 0, date: "03" },
  { profit: 0, date: "04" },
  { profit: 0, date: "05" },
  { profit: 0, date: "06" },
  { profit: 0, date: "07" },
  { profit: 0, date: "08" },
  { profit: 0, date: "09" },
  { profit: 0, date: "10" },
  { profit: 0, date: "11" },
  { profit: 0, date: "12" },
];

export const orderMutipleOption = [
  { value: "userId", name: "Theo id khách hàng" },
  { value: "userName", name: "Theo tên khách hàng" },
  { value: "orderCode", name: "Theo mã đơn" },
];