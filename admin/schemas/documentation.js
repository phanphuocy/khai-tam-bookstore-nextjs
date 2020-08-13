export default {
  name: "documentation",
  title: "Tài Liệu",
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
      name: "body",
      title: "Nội Dung",
      type: "blockContent",
    },
  ],
};
