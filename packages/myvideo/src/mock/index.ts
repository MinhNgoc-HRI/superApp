export type OnbroadType = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export const ONBROAD_DATA: OnbroadType[] = [
  {
    id: 1,
    image: 'splash_1.png',
    title: 'Xem hàng triệu video đặc sắc hấp dẫn',
    description: 'Đa dạng chủ đề Nhạc, Phim, TVShow, Tin Tức, Sao',
  },
  {
    id: 2,
    image: 'splash_2.png',
    title: 'Phát sóng trực tiếp các sự kiện giải trí hot',
    description: 'Hội tụ top streamers, KOLs và giải đấu Esport đỉnh cao',
  },
  {
    id: 3,
    image: 'splash_3.png',
    title: 'Đăng tải và chia sẻ video mọi lúc mọi nơi',
    description: 'Dễ dàng lưu trữ và chia sẻ video với bạn bè',
  },
];
