const bookCategories = [
  {
    parent: "Tâm Linh - Tôn Giáo",
    parentSlug: "tam-linh-ton-giao",
    children: [
      {
        name: "Tâm Linh",
        slug: "tam-linh",
      },
      {
        name: "Thiền",
        slug: "thien",
      },
    ],
  },
  {
    parent: "Khoa học - Triết học",
    parentSlug: "khoa-hoc-triet-hoc",
    children: [
      {
        name: "Khoa Học Tự Nhiên",
        slug: "khoa-hoc-tu-nhien",
      },
      {
        name: "Khoa Học Xã Hội",
        slug: "khoa-hoc-xa-hoi",
      },
      {
        name: "Khoa Học Vũ Trụ",
        slug: "khoa-hoc-vu-tru",
      },
      {
        name: "Triết Học Phương Tây",
        slug: "triet-hoc-phuong-tay",
      },
      {
        name: "Minh Triết Phương Đông",
        slug: "minh-triet-phuong-dong",
      },
      {
        name: "Địa Lý - Phong Thủy",
        slug: "dia-ly-phong-thuy",
      },
    ],
  },
  {
    parent: "Kinh Tế - Chính Trị",
    parentSlug: "kinh-te-ky-nang",
    children: [
      {
        name: "Quản Trị - Lãnh Đạo",
        slug: "quan-tri-lanh-dao",
      },
      {
        name: "Tài Chính - Kế Toán",
        slug: "tai-chinh-ke-toan-1",
      },
      {
        name: "Tiếp Thị - Bán Hàng",
        slug: "tiep-thi-ban-hang-1",
      },
      {
        name: "Kỹ Năng Làm Việc",
        slug: "ky-nang-lam-viec-1",
      },
      {
        name: "Thành Tựu Kinh Doanh",
        slug: "thanh-tuu-kinh-doanh-1",
      },
      {
        name: "Nghiên Cứu - Phân Tích",
        slug: "nghien-cuu-phan-tich-1",
      },
    ],
  },
  {
    parent: "Lịch Sử",
    parentSlug: "lich-su",
    children: [
      {
        name: "Lịch Sử Việt Nam",
        slug: "lich-su-viet-nam",
      },
      {
        name: "Lịch Sử Thế Giới",
        slug: "lich-su-the-gioi",
      },
    ],
  },
  {
    parent: "Văn Hóa - Nghệ Thuật",
    parentSlug: "van-hoa-nghe-thuat",
    children: [
      {
        name: "Âm Nhạc",
        slug: "am-nhac-1",
      },
      {
        name: "Hội Họa",
        slug: "hoi-hoa-1",
      },
      {
        name: "Thi Ca",
        slug: "thi-ca-2",
      },
      {
        name: "Mỹ Thuật - Kiến Trúc",
        slug: "my-thuat-kien-truc-1",
      },
      {
        name: "Du Lịch",
        slug: "du-lich",
      },
    ],
  },
  {
    parent: "Văn Học Việt Nam",
    parentSlug: "van-hoc-viet-nam",
    children: [
      {
        name: "Tiểu Thuyết Và Truyện Dài Việt Nam",
        slug: "tieu-thuyet-va-truyen-dai",
      },
      {
        name: "Truyện Ngắn Việt Nam",
        slug: "truyen-ngan-2",
      },
      {
        name: "Tạp Văn Và Tản Văn Việt Nam",
        slug: "tap-van-va-tan-van",
      },
      {
        name: "Khảo Cứu - Bút Ký",
        slug: "khao-cuu-va-but-ky",
      },
    ],
  },
  {
    parent: "Văn Học Thế Giới",
    parentSlug: "van-hoc-the-gioi",
    children: [
      {
        name: "Tiểu Thuyết Và Truyện Dài Thế Giới",
        slug: "tieu-thuyet-va-truyen-dai-1",
      },
      {
        name: "Truyện Ngắn Thế Giới",
        slug: "truyen-ngan-1",
      },
      {
        name: "Khảo Cứu - Bút Ký Thế Giới",
        slug: "khao-cuu-va-but-ky-1",
      },
    ],
  },
  {
    parent: "Tâm Lý - Nghệ Thuật Sống",
    parentSlug: "tam-ly-nghe-thuat-song",
    children: [
      {
        name: "Tâm Lý",
        slug: "tam-ly",
      },
      {
        name: "Định Hướng Sống",
        slug: "dinh-huong-song",
      },
      {
        name: "Kỹ Năng Sống",
        slug: "ky-nang-song",
      },
      {
        name: "Câu Chuyện Sống",
        slug: "nghe-thuat-song/cau-chuyen-song",
      },
      {
        name: "Gương Vĩ Đại",
        slug: "guong-vi-dai",
      },
    ],
  },
  {
    parent: "Y Học - Thực Dưỡng",
    parentSlug: "y-hoc-thuc-dung",
    children: [
      {
        name: "Dưỡng Sinh - Yoga",
        slug: "dung-sinh-yoga",
      },
      {
        name: "Ẩm Thực",
        slug: "am-thuc",
      },
    ],
  },
  {
    parent: "Giaó Dục - Gia Đình",
    parentSlug: "sach-gia-dinh",
    children: [
      {
        name: "Giáo Dục",
        slug: "giao-duc",
      },
      {
        name: "Thiếu Nhi",
        slug: "thieu-nhi",
      },
      {
        name: "Thiếu Niên",
        slug: "thieu-nien",
      },
      {
        name: "Làm Cha Mẹ",
        slug: "lam-cha-me",
      },
    ],
  },
  {
    parent: "Kỹ Năng Thường Thức",
    parentSlug: "ky-nang-thuong-thuc",
    children: [
      {
        name: "Nghiệp Vụ",
        slug: "nghiep-vu",
      },
      {
        name: "Từ Điễn",
        slug: "tu-dien",
      },
      {
        name: "Ngoại Ngữ",
        slug: "ngoai-ngu",
      },
    ],
  },
];

export default bookCategories;
