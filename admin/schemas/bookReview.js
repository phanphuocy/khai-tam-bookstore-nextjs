export default {
  name: "bookReview",
  title: "Chia Sẻ Sách Hay",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tựa Đề",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(80)
          .warning("Tựa đề không nên ngắn hơn 10 và dài hơn 80 kí tự"),
    },
    {
      name: "subtitle",
      title: "Ghi Chú Dưới Tựa",
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
      name: "coverImage",
      title: "Ảnh Bìa",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: "text",
          name: "alt",
          title: "Ghi Chú Cho Ảnh Bìa",
          description: `Viết ghi chú nhằm hỗ trợ cho khách hàng sử dụng website có trải nghiệm tốt hơn. Đặc biệt khi họ có đường truyền không ổn định, có vấn đề về thị giác, hoặc sử dụng công cụ hỗ trợ đọc chữ trên web.`,
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      name: "body",
      title: "Nội Dung",
      type: "blockContent",
    },
    {
      name: "credit",
      title: "Dẫn Nguồn",
      type: "string",
    },
    {
      name: "categories",
      title: "Chủ Đề",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
    },
  ],
};
