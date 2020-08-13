export default {
  name: "singlePage",
  title: "Trang Đơn",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tên Trang",
      type: "string",
    },
    {
      name: "slug",
      title: "Tựa Rút Gọn (dành cho SEO)",
      type: "slug",
      validation: (Rule) =>
        Rule.required().error(
          "Sử dụng nút Generate đê tự động tạo tựa rút gọn."
        ),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "categories",
      title: "Nằm Trong Mục",
      type: "string",
      options: {
        list: [
          { title: "Vì Sao Chọn Khai Tâm", value: "vi-sao-chon-khai-tam" },
          { title: "Hỗ Trợ Mua Hàng", value: "ho-tro-mua-hang" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "order",
      title: "Vị Trí Trước Sau (Số Lớn Ở Sau)",
      type: "number",
      validate: (Rule) => Rule.required().min(0),
    },

    {
      name: "body",
      title: "Nội Dung",
      type: "blockContent",
    },
  ],
};
