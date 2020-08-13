export default {
  name: "promotingBook",
  title: "Sách",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tên Sách",
      type: "string",
    },
    {
      name: "author",
      title: "Tác Giả",
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
      name: "show",
      title: "Hiển thị sách này trên trang chủ",
      type: "boolean",
      validate: (Rule) => Rule.required(),
    },
    {
      name: "group",
      title: "Nằm Trong Mục",
      type: "string",
      options: {
        list: [
          { title: "Sách Tinh Tuyển", value: "sach-tinh-tuyen" },
          { title: "Sách Mới Tuyển Chọn", value: "sach-moi-tuyen-chon" },
          {
            title: "Sách Được Mua Nhiều Nhất",
            value: "sach-duoc-mua-nhieu-nhat",
          },
        ],
        layout: "dropdown",
      },
      validate: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Upload Ảnh",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: "string",
          name: "alt",
          title: "Ghi Chú Cho Ảnh",
          description: `Viết ghi chú nhằm hỗ trợ cho khách hàng sử dụng website có trải nghiệm tốt hơn. Đặc biệt khi họ có đường truyền không ổn định, có vấn đề về thị giác, hoặc sử dụng công cụ hỗ trợ đọc chữ trên web.`,
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
  ],
};
