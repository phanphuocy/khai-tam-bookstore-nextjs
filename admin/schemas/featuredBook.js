export default {
  name: "featuredBook",
  title: "Sách Tinh Tuyển",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "show",
      title: "Hiển thị sách này trên trang chủ",
      type: "boolean",
      validate: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Mô Tả",
      type: "text",
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
