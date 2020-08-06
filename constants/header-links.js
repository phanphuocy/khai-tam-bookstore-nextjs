import authorLinks from "./authors-links";

const links = [
  {
    group: "Sách Theo Tác Giả",
    groupVal: "tac-gia",
    items: authorLinks,
  },
  {
    label: "Về Khai Tâm",
    value: "ve-khai-tam",
  },
  {
    group: "Vì Sao Chọn Khai Tâm",
    groupVal: "vi-sao-chon-khai-tam",
    items: [
      {
        label: "Sen Búp Xin Tặng Bạn",
        value: "sen-bup-xin-tang-ban",
      },
      {
        label: "Bao Đọc Sách Hay",
        value: "bao-doc-sach-hay",
      },
    ],
  },
  {
    group: "Hỗ Trợ Mua Hàng",
    groupVal: "ho-tro-mua-hang",
    items: [
      {
        label: "Hướng Dẫn Mua Hàng",
        value: "huong-dan-mua-hang",
      },
      {
        label: "Phương Thức Thanh Toán",
        value: "phuong-thuc-thanh-toan",
      },
      {
        label: "Phương Thức Giao Hàng",
        value: "phuong-thuc-giao-hang",
      },
      {
        label: "Hướng Dẫn Đổi Trả Hàng",
        value: "huong-dan-doi-tra-hang",
      },
    ],
  },
  {
    label: "Chia Sẻ Sách Hay",
    value: "chia-se-sach-hay",
  },
];

export default links;
