export default {
  widgets: [
    {
      name: "document-chart",
      options: {
        types: [
          "bookReview",
          "sanity.imageAsset",
          "banner",
          "featuredBook",
          "promotingBook",
          "author",
        ],
      },
      layout: { width: "medium" },
    },
    {
      name: "document-list",
      options: {
        title: "Bài Viết Mới Cập Nhập",
        order: "_updatedAt desc",
        types: ["bookReview"],
        layout: { width: "full" },
      },
    },
    {
      name: "project-info",
    },
    {
      name: "project-users",
    },
  ],
};
