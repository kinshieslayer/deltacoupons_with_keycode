export interface Coupon {
  id: number;
  item_name: string;
  category: string;
  multi_platform: boolean;
  platforms: string[];
  discount: string;
  expires: string;
  verified: boolean;
}

export const coupons: Coupon[] = [
  {
    id: 1,
    item_name: "Civilization VII",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "25% OFF",
    expires: "Dec 31, 2026",
    verified: true,
  },
  {
    id: 2,
    item_name: "Elden Ring",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "30% OFF",
    expires: "Jan 15, 2026",
    verified: true,
  },
  {
    id: 3,
    item_name: "Cyberpunk 2077",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "50% OFF",
    expires: "Feb 28, 2026",
    verified: true,
  },
  {
    id: 4,
    item_name: "Baldur's Gate 3",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "PlayStation 5"],
    discount: "20% OFF",
    expires: "Mar 10, 2026",
    verified: true,
  },
  {
    id: 5,
    item_name: "Starfield",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S"],
    discount: "35% OFF",
    expires: "Jan 20, 2026",
    verified: true,
  },
  {
    id: 6,
    item_name: "FIFA 25",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "40% OFF",
    expires: "Apr 1, 2026",
    verified: true,
  },
  {
    id: 7,
    item_name: "Call of Duty: MW3",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "15% OFF",
    expires: "Jan 31, 2026",
    verified: true,
  },
  {
    id: 8,
    item_name: "Hogwarts Legacy",
    category: "Game Keys",
    multi_platform: true,
    platforms: ["Steam", "Xbox Series X|S", "PlayStation 5"],
    discount: "45% OFF",
    expires: "Feb 14, 2026",
    verified: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Winter Sale 2026",
    subtitle: "Up to 70% off on AAA titles",
    cta: "Browse Deals",
    gradient: "from-blue-900/80 via-purple-900/60 to-transparent",
  },
  {
    id: 2,
    title: "New Releases",
    subtitle: "Get the hottest games at launch prices",
    cta: "See New Games",
    gradient: "from-orange-900/80 via-red-900/60 to-transparent",
  },
  {
    id: 3,
    title: "Exclusive Codes",
    subtitle: "Members-only discounts available now",
    cta: "Join Free",
    gradient: "from-green-900/80 via-teal-900/60 to-transparent",
  },
];
