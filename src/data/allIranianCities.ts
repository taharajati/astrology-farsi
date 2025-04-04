import { City } from '../components/CitySelector';

export const allIranianCities: City[] = [
  // استان تهران
  { id: 101, name: 'تهران', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.6892, longitude: 51.3890 },
  { id: 102, name: 'شهریار', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.6597, longitude: 51.0083 },
  { id: 103, name: 'اسلامشهر', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.5446, longitude: 51.2302 },
  { id: 104, name: 'ری', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.5937, longitude: 51.4398 },
  { id: 105, name: 'پردیس', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7415, longitude: 51.8084 },
  { id: 106, name: 'پیشوا', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.3078, longitude: 51.7267 },
  { id: 107, name: 'دماوند', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7178, longitude: 52.0694 },
  { id: 108, name: 'فیروزکوه', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7567, longitude: 52.7706 },
  { id: 109, name: 'پاکدشت', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.4822, longitude: 51.6828 },
  { id: 110, name: 'ورامین', province: 'تهران', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.3252, longitude: 51.6472 },

  // استان البرز
  { id: 601, name: 'کرج', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.8400, longitude: 50.9391 },
  { id: 602, name: 'فردیس', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7247, longitude: 50.9883 },
  { id: 603, name: 'محمدشهر', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7639, longitude: 50.9172 },
  { id: 604, name: 'ماهدشت', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.8089, longitude: 50.9056 },
  { id: 605, name: 'اشتهارد', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.7219, longitude: 50.3611 },
  { id: 606, name: 'نظرآباد', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.9522, longitude: 50.6075 },
  { id: 607, name: 'هشتگرد', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.9589, longitude: 50.6803 },
  { id: 608, name: 'چهارباغ', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.8319, longitude: 50.8811 },
  { id: 609, name: 'ماهدشت', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.8089, longitude: 50.9056 },
  { id: 610, name: 'ماهدشت', province: 'البرز', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.8089, longitude: 50.9056 },

  // استان اصفهان
  { id: 201, name: 'اصفهان', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.6546, longitude: 51.6680 },
  { id: 202, name: 'کاشان', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 33.9850, longitude: 51.4099 },
  { id: 203, name: 'نجف‌آباد', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.6324, longitude: 51.3676 },
  { id: 204, name: 'خمینی‌شهر', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.7000, longitude: 51.5211 },
  { id: 205, name: 'شهرضا', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.0089, longitude: 51.8668 },
  { id: 206, name: 'مبارکه', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.3464, longitude: 51.5044 },
  { id: 207, name: 'فولادشهر', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.4897, longitude: 51.3106 },
  { id: 208, name: 'گلپایگان', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 33.4537, longitude: 50.2884 },
  { id: 209, name: 'شهرکرد', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.3256, longitude: 50.8644 },
  { id: 210, name: 'بروجن', province: 'اصفهان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.3061, longitude: 50.8419 },

  // استان خراسان رضوی
  { id: 301, name: 'مشهد', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 36.2972, longitude: 59.6067 },
  { id: 302, name: 'نیشابور', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 36.2141, longitude: 58.7961 },
  { id: 303, name: 'سبزوار', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 36.2156, longitude: 57.6797 },
  { id: 304, name: 'تربت حیدریه', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.2739, longitude: 59.2194 },
  { id: 305, name: 'قوچان', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.1061, longitude: 58.5094 },
  { id: 306, name: 'گناباد', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 34.3529, longitude: 58.6836 },
  { id: 307, name: 'کاشمر', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.2383, longitude: 58.4655 },
  { id: 308, name: 'تربت جام', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 35.2439, longitude: 60.6225 },
  { id: 309, name: 'چناران', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 36.6458, longitude: 59.1219 },
  { id: 310, name: 'سرخس', province: 'خراسان رضوی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 36.5450, longitude: 61.1577 },

  // استان آذربایجان شرقی
  { id: 401, name: 'تبریز', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 38.0800, longitude: 46.2919 },
  { id: 402, name: 'مراغه', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.3929, longitude: 46.2393 },
  { id: 403, name: 'مرند', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 38.4021, longitude: 45.7749 },
  { id: 404, name: 'میانه', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.4211, longitude: 47.7150 },
  { id: 405, name: 'بناب', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 38.3403, longitude: 46.0561 },
  { id: 406, name: 'شبستر', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 38.1807, longitude: 45.7027 },
  { id: 407, name: 'هشترود', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.4778, longitude: 47.0508 },
  { id: 408, name: 'بناب', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 38.3403, longitude: 46.0561 },
  { id: 409, name: 'سراب', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.9408, longitude: 47.5367 },
  { id: 410, name: 'هشترود', province: 'آذربایجان شرقی', country: 'ایران', timezone: 'Asia/Tehran', latitude: 37.4778, longitude: 47.0508 },

  // استان فارس
  { id: 501, name: 'شیراز', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.5917, longitude: 52.5836 },
  { id: 502, name: 'مرودشت', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.0833, longitude: 52.8167 },
  { id: 503, name: 'جهرم', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.5000, longitude: 53.5606 },
  { id: 504, name: 'کازرون', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.6197, longitude: 51.6544 },
  { id: 505, name: 'لار', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.6833, longitude: 54.3333 },
  { id: 506, name: 'داراب', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.7519, longitude: 54.5444 },
  { id: 507, name: 'فیروزآباد', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.8439, longitude: 52.5708 },
  { id: 508, name: 'آباده', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 31.1608, longitude: 52.6506 },
  { id: 509, name: 'نی‌ریز', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.1989, longitude: 54.3278 },
  { id: 510, name: 'ممسنی', province: 'فارس', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.0589, longitude: 51.1597 },

  // استان خوزستان
  { id: 701, name: 'اهواز', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 31.3183, longitude: 48.6706 },
  { id: 702, name: 'دزفول', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.3833, longitude: 48.4000 },
  { id: 703, name: 'آبادان', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.3392, longitude: 48.3042 },
  { id: 704, name: 'خرمشهر', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.4333, longitude: 48.1833 },
  { id: 705, name: 'ماهشهر', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.5589, longitude: 49.1981 },
  { id: 706, name: 'بهبهان', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.5958, longitude: 50.2417 },
  { id: 707, name: 'شوشتر', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.0456, longitude: 48.8567 },
  { id: 708, name: 'ایذه', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 31.8333, longitude: 49.8667 },
  { id: 709, name: 'شوش', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.1942, longitude: 48.2436 },
  { id: 710, name: 'اندیمشک', province: 'خوزستان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 32.4667, longitude: 48.3500 },

  // استان بوشهر
  { id: 801, name: 'بوشهر', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.9234, longitude: 50.8203 },
  { id: 802, name: 'برازجان', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.2667, longitude: 51.2167 },
  { id: 803, name: 'خارک', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.2333, longitude: 50.3167 },
  { id: 804, name: 'کنگان', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.8333, longitude: 52.0667 },
  { id: 805, name: 'جم', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.8278, longitude: 52.3269 },
  { id: 806, name: 'خورموج', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.6500, longitude: 51.3833 },
  { id: 807, name: 'اهرم', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.8833, longitude: 51.2667 },
  { id: 808, name: 'دیر', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.8400, longitude: 51.9378 },
  { id: 809, name: 'دیلم', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 30.1167, longitude: 50.1667 },
  { id: 810, name: 'گناوه', province: 'بوشهر', country: 'ایران', timezone: 'Asia/Tehran', latitude: 29.5792, longitude: 50.5169 },

  // استان هرمزگان
  { id: 901, name: 'بندرعباس', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.1832, longitude: 56.2666 },
  { id: 902, name: 'قشم', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 26.9500, longitude: 56.2667 },
  { id: 903, name: 'کیش', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 26.5578, longitude: 53.9806 },
  { id: 904, name: 'بندرلنگه', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 26.5589, longitude: 54.8806 },
  { id: 905, name: 'بندرکنگ', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 26.5589, longitude: 54.8806 },
  { id: 906, name: 'میناب', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.1317, longitude: 57.0872 },
  { id: 907, name: 'بستک', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.1994, longitude: 54.3667 },
  { id: 908, name: 'حاجی‌آباد', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 28.3097, longitude: 55.9017 },
  { id: 909, name: 'رودان', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.4419, longitude: 57.1919 },
  { id: 910, name: 'پارسیان', province: 'هرمزگان', country: 'ایران', timezone: 'Asia/Tehran', latitude: 27.2089, longitude: 53.0367 },

  // شهرهای خارجی پرکاربرد
  { id: 1001, name: 'دبی', country: 'امارات متحده عربی', timezone: 'Asia/Dubai', latitude: 25.2048, longitude: 55.2708 },
  { id: 1002, name: 'استانبول', country: 'ترکیه', timezone: 'Europe/Istanbul', latitude: 41.0082, longitude: 28.9784 },
  { id: 1003, name: 'لندن', country: 'انگلستان', timezone: 'Europe/London', latitude: 51.5074, longitude: -0.1278 },
  { id: 1004, name: 'تورنتو', country: 'کانادا', timezone: 'America/Toronto', latitude: 43.6532, longitude: -79.3832 },
  { id: 1005, name: 'لس‌آنجلس', country: 'ایالات متحده', timezone: 'America/Los_Angeles', latitude: 34.0522, longitude: -118.2437 }
]; 