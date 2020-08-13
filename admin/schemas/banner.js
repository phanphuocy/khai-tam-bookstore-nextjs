export default {
  name: "banner",
  title: "Ảnh Banner",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Title",
      type: "string",
    },
    {
      name: "show",
      title: "Dùng banner này",
      type: "boolean",
      validate: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "label",
        maxLength: 96,
      },
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
          type: "text",
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
