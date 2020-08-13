export default {
  name: "author",
  title: "Tác Giả",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Tên",
      type: "string",
    },
    {
      name: "title",
      title: "Chức Danh (nếu cần thiết)",
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
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "group",
      title: "Nằm Trong Mục",
      type: "string",
      options: {
        list: [
          { title: "Đạo Sư Tâm Linh", value: "dao-su-tam-linh" },
          {
            title: "Hương Sắc Vườn Hoa Phật Giáo VN",
            value: "huong-sac-vuon-hoa-phat-giao-vn",
          },
          { title: "Thiền Sư Nam Tông", value: "thien-su-nam-tong" },
          {
            title: "Nhà Khoa Học Việt Nam",
            value: "nha-khoa-hoc-viet-nam",
          },
          {
            title: "Nhà Văn Hóa Việt Nam",
            value: "nha-van-hoa-viet-nam",
          },
          {
            title: "Nhà Văn Việt Nam",
            value: "nha-van-viet-nam",
          },
          {
            title: "Nhà Văn Chuyên Về Nam Bộ",
            value: "nha-van-nam-bo",
          },
          {
            title: "Học Giả Việt Nam",
            value: "hoc-gia-viet-nam",
          },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "description",
      title: "Mô Tả",
      type: "text",
      options: {
        rows: 4,
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
  preview: {
    select: {
      title: "name",
      subtitle: "group",
      media: "image",
    },
  },
};
