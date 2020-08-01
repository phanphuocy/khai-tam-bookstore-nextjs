const statuses = [
  { value: "all", label: "Tất Cả" },
  { value: "pending", label: "Đang Chờ", expect: "opened" },
  { value: "opened", label: "Đã Mở", expect: "processed" },
  { value: "processed", label: "Đã Xử Lí", expect: "shipping" },
  {
    value: "shipping",
    label: "Đang Vận Chuyển",
  },
  { value: "delivered", label: "Đã Giao" },
  { value: "fulfilled", label: "Đã Hoàn Tất" },
  { value: "returning", label: "Trả Lại" },
];

export default statuses;

export const statusName = {
  all: "Tất Cả",
  pending: "Đang Chờ",
  opened: "Đã Mở",
  processed: "Đã Xử Lí",
  shipping: "Đang Vận Chuyển",
  delivered: "Đã Giao",
  fullfiled: "Đã Hoàn Tất",
  returning: "Trả Lại",
};
