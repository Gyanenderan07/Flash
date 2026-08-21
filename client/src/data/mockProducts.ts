/**
 * Flash commerce data — preserve the Supercharged Editorial Commerce system:
 * high-key product stages, obsidian copy, and Flash Volt only for signals.
 */
export type ProductCategory = "Electronics" | "Fashion" | "Footwear" | "Watches" | "Home & Living" | "Beauty" | "Sports" | "Accessories";
export type ProductVariant = { color: string; name: string; sku: string; image: string; gallery: string[] };

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  price: number;
  mrp: number;
  stock: number;
  express: boolean;
  isNew?: boolean;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  colors: string[];
  variants?: ProductVariant[];
  sizes?: string[];
  sku: string;
};

export const categoryOrder: ProductCategory[] = [
  "Electronics", "Fashion", "Footwear", "Watches", "Home & Living", "Beauty", "Sports", "Accessories",
];

const productSeed: Product[] = [
  {
    "id": "electronics-1",
    "name": "NovaBeat X1 ANC Headphones",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Nexora",
    "price": 2999,
    "mrp": 7499,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated NovaBeat X1 ANC Headphones engineered by Nexora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "40mm spatial drivers",
      "42-hour battery",
      "Hybrid ANC"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-101"
  },
  {
    "id": "electronics-2",
    "name": "FlashCam Pro 4K Mirrorless",
    "category": "Electronics",
    "subcategory": "Cameras",
    "brand": "Lumicore",
    "price": 24999,
    "mrp": 49999,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated FlashCam Pro 4K Mirrorless engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "24MP APS-C sensor",
      "4K video capture",
      "Fast AF"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-102"
  },
  {
    "id": "electronics-3",
    "name": "Pocket Pulse Speaker 16W",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Zapster",
    "price": 1799,
    "mrp": 3499,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pocket Pulse Speaker 16W engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "16W tuned audio",
      "12-hour playtime",
      "IPX7 waterproof"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-103"
  },
  {
    "id": "electronics-4",
    "name": "AirLoop Mini TWS Earbuds",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Flash",
    "price": 1699,
    "mrp": 3499,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated AirLoop Mini TWS Earbuds engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "30-hour charge case",
      "Low-latency mode",
      "Dual mic"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-104"
  },
  {
    "id": "electronics-5",
    "name": "Orbit Pocket 1080p Projector",
    "category": "Electronics",
    "subcategory": "Projectors",
    "brand": "Nexora",
    "price": 8999,
    "mrp": 14999,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Orbit Pocket 1080p Projector engineered by Nexora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "1080p native support",
      "120-inch throw",
      "Stereo speaker"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-105"
  },
  {
    "id": "electronics-6",
    "name": "Grid Mech 75 RGB Keyboard",
    "category": "Electronics",
    "subcategory": "Computing",
    "brand": "Lumicore",
    "price": 4299,
    "mrp": 6999,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Grid Mech 75 RGB Keyboard engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Hot-swap switches",
      "Tri-mode wireless",
      "PBT keycaps"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-106"
  },
  {
    "id": "electronics-7",
    "name": "Flux Charge 3-in-1 Stand",
    "category": "Electronics",
    "subcategory": "Accessories",
    "brand": "Zapster",
    "price": 1999,
    "mrp": 3299,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Flux Charge 3-in-1 Stand engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "15W Qi wireless",
      "Fold-flat design",
      "USB-C cord"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-107"
  },
  {
    "id": "electronics-8",
    "name": "SonicPro 65W GaN Charger",
    "category": "Electronics",
    "subcategory": "Accessories",
    "brand": "Flash",
    "price": 1499,
    "mrp": 2999,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated SonicPro 65W GaN Charger engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "65W dual USB-C",
      "GaN tech",
      "Ultra compact"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-108"
  },
  {
    "id": "electronics-9",
    "name": "StudioDesk Precision Trackpad",
    "category": "Electronics",
    "subcategory": "Computing",
    "brand": "Nexora",
    "price": 3499,
    "mrp": 5999,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated StudioDesk Precision Trackpad engineered by Nexora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Haptic glass touch",
      "Bluetooth 5.2",
      "Rechargeable"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-109"
  },
  {
    "id": "electronics-10",
    "name": "VocalCraft Condenser Streamer Mic",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Lumicore",
    "price": 3999,
    "mrp": 7999,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated VocalCraft Condenser Streamer Mic engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Cardioid capsule",
      "Zero-latency monitor",
      "RGB halo"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-110"
  },
  {
    "id": "electronics-11",
    "name": "UltraHub 10-in-1 USB-C Dock",
    "category": "Electronics",
    "subcategory": "Computing",
    "brand": "Zapster",
    "price": 2999,
    "mrp": 5499,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated UltraHub 10-in-1 USB-C Dock engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "4K HDMI 60Hz",
      "100W PD passthrough",
      "SD reader"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-111"
  },
  {
    "id": "electronics-12",
    "name": "PulseBuds Pro Active ANC",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Flash",
    "price": 3299,
    "mrp": 6999,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated PulseBuds Pro Active ANC engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Adaptive noise canceling",
      "Spatial audio",
      "Wireless case"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-112"
  },
  {
    "id": "electronics-13",
    "name": "MechBoard 65% Wireless RGB",
    "category": "Electronics",
    "subcategory": "Computing",
    "brand": "Nexora",
    "price": 4999,
    "mrp": 8999,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated MechBoard 65% Wireless RGB engineered by Nexora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Gateron Yellow switches",
      "Aluminum frame",
      "Hot-swap"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-113"
  },
  {
    "id": "electronics-14",
    "name": "Lumina 15.6 Inch 4K Portable Display",
    "category": "Electronics",
    "subcategory": "Monitors",
    "brand": "Lumicore",
    "price": 12999,
    "mrp": 21999,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Lumina 15.6 Inch 4K Portable Display engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "4K IPS panel",
      "USB-C single cable",
      "HDR support"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-114"
  },
  {
    "id": "electronics-15",
    "name": "Magnetic PowerBank 10000mAh",
    "category": "Electronics",
    "subcategory": "Accessories",
    "brand": "Zapster",
    "price": 1899,
    "mrp": 3499,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Magnetic PowerBank 10000mAh engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "MagSafe compatible",
      "15W fast wireless",
      "20W PD output"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-115"
  },
  {
    "id": "electronics-16",
    "name": "AuraBass Portable Boombox 40W",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Flash",
    "price": 4499,
    "mrp": 8999,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated AuraBass Portable Boombox 40W engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "40W peak punch",
      "Dynamic light ring",
      "IPX6 splashproof"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-116"
  },
  {
    "id": "electronics-17",
    "name": "HD Streaming Webcam 1080p 60fps",
    "category": "Electronics",
    "subcategory": "Computing",
    "brand": "Nexora",
    "price": 2799,
    "mrp": 4999,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated HD Streaming Webcam 1080p 60fps engineered by Nexora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Autofocus 1080p",
      "Dual noise-canceling mic",
      "Privacy shutter"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-117"
  },
  {
    "id": "electronics-18",
    "name": "Precision Digital Stylus Pen",
    "category": "Electronics",
    "subcategory": "Accessories",
    "brand": "Lumicore",
    "price": 1299,
    "mrp": 2499,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Precision Digital Stylus Pen engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Palm rejection",
      "Tilt sensitivity",
      "Magnetic snap"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-118"
  },
  {
    "id": "electronics-19",
    "name": "AirBeam Wireless Display Adapter",
    "category": "Electronics",
    "subcategory": "Accessories",
    "brand": "Zapster",
    "price": 1599,
    "mrp": 2999,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated AirBeam Wireless Display Adapter engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "4K screen mirror",
      "5GHz Wi-Fi dual band",
      "Zero lag"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ELE-119"
  },
  {
    "id": "electronics-20",
    "name": "SoundDock Desktop Speaker Bar",
    "category": "Electronics",
    "subcategory": "Audio",
    "brand": "Flash",
    "price": 2299,
    "mrp": 4499,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated SoundDock Desktop Speaker Bar engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Dual passive radiators",
      "Bluetooth & AUX",
      "Slim profile"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ELE-120"
  },
  {
    "id": "fashion-1",
    "name": "Drift Studio Heavyweight Hoodie",
    "category": "Fashion",
    "subcategory": "Streetwear",
    "brand": "Urbanic",
    "price": 1899,
    "mrp": 3299,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Drift Studio Heavyweight Hoodie engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "420 GSM cotton",
      "Dropped shoulder fit",
      "Brushed fleece"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-101"
  },
  {
    "id": "fashion-2",
    "name": "Mode Utility Weather Jacket",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Vantage",
    "price": 2899,
    "mrp": 4999,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Mode Utility Weather Jacket engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Water-resistant shell",
      "Multi utility pockets",
      "Adjustable hem"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-102"
  },
  {
    "id": "fashion-3",
    "name": "Signal Relaxed Cotton Tee",
    "category": "Fashion",
    "subcategory": "Essentials",
    "brand": "Flash",
    "price": 799,
    "mrp": 1499,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Signal Relaxed Cotton Tee engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "240 GSM organic cotton",
      "Relaxed shoulder",
      "Ribbed collar"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-103"
  },
  {
    "id": "fashion-4",
    "name": "Linewide Tactical Cargo Trouser",
    "category": "Fashion",
    "subcategory": "Bottoms",
    "brand": "Urbanic",
    "price": 2199,
    "mrp": 3799,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Linewide Tactical Cargo Trouser engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Heavy cotton twill",
      "Six utility pockets",
      "Adjustable cuffs"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-104"
  },
  {
    "id": "fashion-5",
    "name": "Pace Street Low-Profile Cap",
    "category": "Fashion",
    "subcategory": "Headwear",
    "brand": "Vantage",
    "price": 699,
    "mrp": 1199,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pace Street Low-Profile Cap engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Curved visor",
      "Breathable eyelets",
      "Adjustable strap"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-105"
  },
  {
    "id": "fashion-6",
    "name": "Tactical Oversized Sweatshirt",
    "category": "Fashion",
    "subcategory": "Streetwear",
    "brand": "Flash",
    "price": 1799,
    "mrp": 3199,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tactical Oversized Sweatshirt engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "French terry fleece",
      "Ribbed cuffs",
      "Embroidered mark"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-106"
  },
  {
    "id": "fashion-7",
    "name": "Urban Core Tech Utility Vest",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Urbanic",
    "price": 2499,
    "mrp": 4299,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Urban Core Tech Utility Vest engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Ripstop fabric",
      "8 tactical zip pockets",
      "Breathable mesh"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-107"
  },
  {
    "id": "fashion-8",
    "name": "Minimalist Oversized Boxy Tee",
    "category": "Fashion",
    "subcategory": "Essentials",
    "brand": "Vantage",
    "price": 899,
    "mrp": 1699,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimalist Oversized Boxy Tee engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "280 GSM heavy cotton",
      "Boxy drop fit",
      "Pre-shrunk finish"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-108"
  },
  {
    "id": "fashion-9",
    "name": "City Anorak Packable Windbreaker",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Flash",
    "price": 2699,
    "mrp": 4599,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated City Anorak Packable Windbreaker engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Windproof nylon",
      "Folds into chest pocket",
      "Reflective trim"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-109"
  },
  {
    "id": "fashion-10",
    "name": "Tapered Tech Jogger Trouser",
    "category": "Fashion",
    "subcategory": "Bottoms",
    "brand": "Urbanic",
    "price": 1999,
    "mrp": 3499,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tapered Tech Jogger Trouser engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "4-way stretch knit",
      "Zip side pockets",
      "Ribbed ankle cuffs"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-110"
  },
  {
    "id": "fashion-11",
    "name": "Heavyweight Fleece Crewneck",
    "category": "Fashion",
    "subcategory": "Streetwear",
    "brand": "Vantage",
    "price": 1699,
    "mrp": 2999,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Heavyweight Fleece Crewneck engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Brushed back cotton",
      "Relaxed boxy cut",
      "Reinforced neck"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-111"
  },
  {
    "id": "fashion-12",
    "name": "Modern Utility Chore Overshirt",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Flash",
    "price": 2299,
    "mrp": 3999,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Modern Utility Chore Overshirt engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Cotton canvas shell",
      "Button flap pockets",
      "Straight hem"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-112"
  },
  {
    "id": "fashion-13",
    "name": "Streetwear Graphic Drop-Tee",
    "category": "Fashion",
    "subcategory": "Streetwear",
    "brand": "Urbanic",
    "price": 999,
    "mrp": 1799,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Streetwear Graphic Drop-Tee engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Editorial puff print",
      "Drop shoulder",
      "Super soft wash"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-113"
  },
  {
    "id": "fashion-14",
    "name": "Modular Tech Cargo Shorts",
    "category": "Fashion",
    "subcategory": "Bottoms",
    "brand": "Vantage",
    "price": 1499,
    "mrp": 2699,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Modular Tech Cargo Shorts engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Quick-dry fabric",
      "Expandable cargo pockets",
      "Integrated belt"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-114"
  },
  {
    "id": "fashion-15",
    "name": "Thermal Base Layer Top",
    "category": "Fashion",
    "subcategory": "Essentials",
    "brand": "Flash",
    "price": 1199,
    "mrp": 2199,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Thermal Base Layer Top engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Waffle knit cotton",
      "Heat-retaining structure",
      "Slim fit"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-115"
  },
  {
    "id": "fashion-16",
    "name": "Minimalist Quilted Puffer Vest",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Urbanic",
    "price": 2799,
    "mrp": 4899,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimalist Quilted Puffer Vest engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Lightweight insulation",
      "Stand collar",
      "Dual zip closure"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-116"
  },
  {
    "id": "fashion-17",
    "name": "Raw Denim Slim Trousers",
    "category": "Fashion",
    "subcategory": "Bottoms",
    "brand": "Vantage",
    "price": 2399,
    "mrp": 4199,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Raw Denim Slim Trousers engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "13.5oz Japanese denim",
      "Selvedge detailing",
      "Slim tapered cut"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-117"
  },
  {
    "id": "fashion-18",
    "name": "Essential Ribbed Knit Beanie",
    "category": "Fashion",
    "subcategory": "Headwear",
    "brand": "Flash",
    "price": 599,
    "mrp": 999,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Essential Ribbed Knit Beanie engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "100% merino wool blend",
      "Turn-up cuff",
      "Snug itch-free fit"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-118"
  },
  {
    "id": "fashion-19",
    "name": "Linen Casual Button-Down Shirt",
    "category": "Fashion",
    "subcategory": "Essentials",
    "brand": "Urbanic",
    "price": 1599,
    "mrp": 2799,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Linen Casual Button-Down Shirt engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "100% pure linen",
      "Breathable weave",
      "Chest pocket"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FAS-119"
  },
  {
    "id": "fashion-20",
    "name": "Tracksuit Zip-Up Jacket",
    "category": "Fashion",
    "subcategory": "Outerwear",
    "brand": "Vantage",
    "price": 2199,
    "mrp": 3899,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tracksuit Zip-Up Jacket engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Smooth tricot fabric",
      "Stand collar",
      "Contrast sleeve stripe"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FAS-120"
  },
  {
    "id": "footwear-1",
    "name": "FlashRun Max Daily Runner",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Vantage",
    "price": 2599,
    "mrp": 3999,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated FlashRun Max Daily Runner engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Adaptive foam return",
      "Breathable knit",
      "Grippy rubber"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-101"
  },
  {
    "id": "footwear-2",
    "name": "Vector Runner LT Street Edition",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Boltic",
    "price": 2999,
    "mrp": 5499,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Vector Runner LT Street Edition engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Energy foam midsole",
      "Engineered mesh",
      "Heel pull tab"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-102"
  },
  {
    "id": "footwear-3",
    "name": "Arc Court Low Minimalist Sneaker",
    "category": "Footwear",
    "subcategory": "Sneakers",
    "brand": "Flash",
    "price": 2399,
    "mrp": 4299,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Arc Court Low Minimalist Sneaker engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Synthetic leather upper",
      "Padded collar",
      "Cupsole grip"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-103"
  },
  {
    "id": "footwear-4",
    "name": "Trail Shift Hike Outdoor Shoe",
    "category": "Footwear",
    "subcategory": "Outdoor",
    "brand": "Vantage",
    "price": 3499,
    "mrp": 5999,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Trail Shift Hike Outdoor Shoe engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Rugged lug sole",
      "Reinforced toe cap",
      "Water-resistant"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-104"
  },
  {
    "id": "footwear-5",
    "name": "Tempo Recovery Soft Slides",
    "category": "Footwear",
    "subcategory": "Slides",
    "brand": "Boltic",
    "price": 999,
    "mrp": 1799,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tempo Recovery Soft Slides engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Contoured EVA foam",
      "Textured footbed",
      "Quick-dry finish"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-105"
  },
  {
    "id": "footwear-6",
    "name": "HyperStride Carbon Racer",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Flash",
    "price": 4999,
    "mrp": 8999,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated HyperStride Carbon Racer engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Carbon fiber plate",
      "Ultra-light foam",
      "Marathon grade"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-106"
  },
  {
    "id": "footwear-7",
    "name": "StreetKnit Seamless Trainer",
    "category": "Footwear",
    "subcategory": "Sneakers",
    "brand": "Vantage",
    "price": 2799,
    "mrp": 4799,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated StreetKnit Seamless Trainer engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Sock-like fit upper",
      "Responsive cushioning",
      "TPU heel cage"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-107"
  },
  {
    "id": "footwear-8",
    "name": "Aerolite Cushioned Marathon Shoe",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Boltic",
    "price": 3299,
    "mrp": 5799,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Aerolite Cushioned Marathon Shoe engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "38mm stack foam",
      "Breathable mesh",
      "Reflective strips"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-108"
  },
  {
    "id": "footwear-9",
    "name": "Urban Court Mid-Top Leather",
    "category": "Footwear",
    "subcategory": "Sneakers",
    "brand": "Flash",
    "price": 3199,
    "mrp": 5299,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Urban Court Mid-Top Leather engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Full grain leather",
      "Ankle support padded collar",
      "Retro sole"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-109"
  },
  {
    "id": "footwear-10",
    "name": "Terrain X Waterproof Hike Boot",
    "category": "Footwear",
    "subcategory": "Outdoor",
    "brand": "Vantage",
    "price": 4299,
    "mrp": 7499,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Terrain X Waterproof Hike Boot engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Waterproof membrane",
      "Vibram rubber sole",
      "Speed lacing"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-110"
  },
  {
    "id": "footwear-11",
    "name": "Cloudfoam Minimalist Slide",
    "category": "Footwear",
    "subcategory": "Slides",
    "brand": "Boltic",
    "price": 899,
    "mrp": 1499,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Cloudfoam Minimalist Slide engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Ultra soft cushion",
      "Waterproof build",
      "Anti-slip bottom"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-111"
  },
  {
    "id": "footwear-12",
    "name": "Velocity Knit Speed Trainer",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Flash",
    "price": 2899,
    "mrp": 4999,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Velocity Knit Speed Trainer engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Seamless knit upper",
      "Flex grooves sole",
      "Lightweight design"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-112"
  },
  {
    "id": "footwear-13",
    "name": "Retro Runner 90s Heritage Shoe",
    "category": "Footwear",
    "subcategory": "Sneakers",
    "brand": "Vantage",
    "price": 2699,
    "mrp": 4599,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Retro Runner 90s Heritage Shoe engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Suede & mesh overlays",
      "Chunky EVA midsole",
      "Vintage look"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-113"
  },
  {
    "id": "footwear-14",
    "name": "All-Weather Slip-On Moccasin",
    "category": "Footwear",
    "subcategory": "Casual",
    "brand": "Boltic",
    "price": 1899,
    "mrp": 3299,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated All-Weather Slip-On Moccasin engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Water-resistant suede",
      "Fleece lining",
      "Rubber outsole"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-114"
  },
  {
    "id": "footwear-15",
    "name": "Apex Speed Road Carbon Shoe",
    "category": "Footwear",
    "subcategory": "Running",
    "brand": "Flash",
    "price": 5499,
    "mrp": 9999,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Apex Speed Road Carbon Shoe engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Full length carbon plate",
      "Microfiber upper",
      "Speed tuned"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-115"
  },
  {
    "id": "footwear-16",
    "name": "FlexMotion Gym Cross-Trainer",
    "category": "Footwear",
    "subcategory": "Training",
    "brand": "Vantage",
    "price": 2499,
    "mrp": 4199,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated FlexMotion Gym Cross-Trainer engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Flat stable heel",
      "Side wall grip",
      "Breathable mesh"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-116"
  },
  {
    "id": "footwear-17",
    "name": "Minimal Canvas Low-Top Sneaker",
    "category": "Footwear",
    "subcategory": "Casual",
    "brand": "Boltic",
    "price": 1599,
    "mrp": 2799,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimal Canvas Low-Top Sneaker engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Durable cotton canvas",
      "Vulcanized rubber sole",
      "Brass eyelets"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-117"
  },
  {
    "id": "footwear-18",
    "name": "Cushion Max Recovery Mules",
    "category": "Footwear",
    "subcategory": "Slides",
    "brand": "Flash",
    "price": 1299,
    "mrp": 2199,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Cushion Max Recovery Mules engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Dual-density cushioning",
      "Arch support",
      "Machine washable"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-118"
  },
  {
    "id": "footwear-19",
    "name": "ProTrail Rugged Outdoor Shoe",
    "category": "Footwear",
    "subcategory": "Outdoor",
    "brand": "Vantage",
    "price": 3699,
    "mrp": 6299,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated ProTrail Rugged Outdoor Shoe engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "All-terrain traction",
      "Mudguard overlay",
      "Shock absorption"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-FOO-119"
  },
  {
    "id": "footwear-20",
    "name": "Urban Slip-On City Trainer",
    "category": "Footwear",
    "subcategory": "Casual",
    "brand": "Boltic",
    "price": 1799,
    "mrp": 2999,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Urban Slip-On City Trainer engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Elastic gore panels",
      "Memory foam insole",
      "Flexible sole"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-FOO-120"
  },
  {
    "id": "watches-1",
    "name": "FlashFit Watch 22 AMOLED",
    "category": "Watches",
    "subcategory": "Smart Watches",
    "brand": "Flash",
    "price": 1999,
    "mrp": 4999,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated FlashFit Watch 22 AMOLED engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "AMOLED always-on display",
      "7-day battery",
      "50m water resistance"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-101"
  },
  {
    "id": "watches-2",
    "name": "Orbit One Steel Chronograph",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Vantage",
    "price": 4499,
    "mrp": 8999,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Orbit One Steel Chronograph engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Sapphire coated mineral glass",
      "Japanese quartz",
      "Stainless steel"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-102"
  },
  {
    "id": "watches-3",
    "name": "ChronoFlex S GPS Smartwatch",
    "category": "Watches",
    "subcategory": "Smart Watches",
    "brand": "Luxora",
    "price": 3299,
    "mrp": 6499,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated ChronoFlex S GPS Smartwatch engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Bright AMOLED face",
      "GPS activity modes",
      "5-day battery"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-103"
  },
  {
    "id": "watches-4",
    "name": "Halo Classic Leather Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Boltic",
    "price": 2799,
    "mrp": 4999,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Halo Classic Leather Watch engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "40mm stainless case",
      "Genuine leather strap",
      "Quartz movement"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-104"
  },
  {
    "id": "watches-5",
    "name": "Pulse Training Band Slim",
    "category": "Watches",
    "subcategory": "Fitness Bands",
    "brand": "Flash",
    "price": 1399,
    "mrp": 2499,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pulse Training Band Slim engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Step & sleep tracking",
      "7-day battery",
      "Water resistant"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-105"
  },
  {
    "id": "watches-6",
    "name": "Titanium Stealth Diver Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Vantage",
    "price": 6999,
    "mrp": 12999,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Titanium Stealth Diver Watch engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Titanium alloy case",
      "300m water resistance",
      "Luminous hands"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-106"
  },
  {
    "id": "watches-7",
    "name": "Ceramic Dial Automatic Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Luxora",
    "price": 8499,
    "mrp": 14999,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Ceramic Dial Automatic Watch engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "21-jewel automatic movement",
      "Exhibition caseback",
      "Ceramic bezel"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-107"
  },
  {
    "id": "watches-8",
    "name": "UltraFit GPS Multisport Watch",
    "category": "Watches",
    "subcategory": "Smart Watches",
    "brand": "Boltic",
    "price": 5499,
    "mrp": 9999,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated UltraFit GPS Multisport Watch engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Multi-band GPS",
      "SpO2 & HRV sensor",
      "14-day battery"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-108"
  },
  {
    "id": "watches-9",
    "name": "Minimalist Mesh Slim Timepiece",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Flash",
    "price": 2299,
    "mrp": 3999,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimalist Mesh Slim Timepiece engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Super slim 6mm case",
      "Milanese stainless mesh",
      "Quick release"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-109"
  },
  {
    "id": "watches-10",
    "name": "Chrono Racer Carbon Edition",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Vantage",
    "price": 4999,
    "mrp": 8499,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Chrono Racer Carbon Edition engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Real carbon fiber dial",
      "Tachymeter bezel",
      "Silicone strap"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-110"
  },
  {
    "id": "watches-11",
    "name": "Vintage Field Mechanical Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Luxora",
    "price": 3899,
    "mrp": 6999,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Vintage Field Mechanical Watch engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Hand-wound movement",
      "Nato strap included",
      "Domed crystal"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-111"
  },
  {
    "id": "watches-12",
    "name": "Pulse AMOLED Smartband 2",
    "category": "Watches",
    "subcategory": "Fitness Bands",
    "brand": "Boltic",
    "price": 1799,
    "mrp": 3199,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509941943132-1f3572524f03?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pulse AMOLED Smartband 2 engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "1.47 inch AMOLED touch",
      "100+ workout modes",
      "Blood oxygen"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-112"
  },
  {
    "id": "watches-13",
    "name": "Executive Steel Chronometer",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Flash",
    "price": 5999,
    "mrp": 10999,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509941943132-1f3572524f03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Executive Steel Chronometer engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Swiss quartz movement",
      "Butterfly clasp",
      "Scratch-proof crystal"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-113"
  },
  {
    "id": "watches-14",
    "name": "TactX Rugged Outdoor Watch",
    "category": "Watches",
    "subcategory": "Smart Watches",
    "brand": "Vantage",
    "price": 3999,
    "mrp": 7499,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1509941943132-1f3572524f03?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1509941943132-1f3572524f03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated TactX Rugged Outdoor Watch engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "MIL-STD-810G tough",
      "Built-in flashlight",
      "Barometric sensor"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-114"
  },
  {
    "id": "watches-15",
    "name": "Rose Gold Minimalist Timepiece",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Luxora",
    "price": 2599,
    "mrp": 4499,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Rose Gold Minimalist Timepiece engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Rose gold PVD coating",
      "Genuine Italian leather",
      "30m water resist"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-115"
  },
  {
    "id": "watches-16",
    "name": "Solar Power Hybrid Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Boltic",
    "price": 3499,
    "mrp": 5999,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Solar Power Hybrid Watch engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Solar charging cell",
      "6-month power reserve",
      "Date window"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-116"
  },
  {
    "id": "watches-17",
    "name": "Dual-Time GMT Pilot Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Flash",
    "price": 4299,
    "mrp": 7999,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Dual-Time GMT Pilot Watch engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Dual timezone sub-dial",
      "Rotating bezel",
      "High-visibility dial"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-117"
  },
  {
    "id": "watches-18",
    "name": "Square Minimalist Steel Watch",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Vantage",
    "price": 2199,
    "mrp": 3799,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Square Minimalist Steel Watch engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Geometric square case",
      "Integrated bracelet",
      "Clean index dial"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-118"
  },
  {
    "id": "watches-19",
    "name": "ProDiver Chrono 200M",
    "category": "Watches",
    "subcategory": "Analog Watches",
    "brand": "Luxora",
    "price": 4799,
    "mrp": 8299,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated ProDiver Chrono 200M engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "200m screw-down crown",
      "Rotating diver scale",
      "Lume indexes"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-WAT-119"
  },
  {
    "id": "watches-20",
    "name": "ActiveFit Lite Tracker",
    "category": "Watches",
    "subcategory": "Fitness Bands",
    "brand": "Boltic",
    "price": 1199,
    "mrp": 1999,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated ActiveFit Lite Tracker engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Compact heart rate monitor",
      "Sleep score",
      "10-day battery"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-WAT-120"
  },
  {
    "id": "home-living-1",
    "name": "Halo Touch Dimmable Desk Light",
    "category": "Home & Living",
    "subcategory": "Lighting",
    "brand": "Luxora",
    "price": 1699,
    "mrp": 2999,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Halo Touch Dimmable Desk Light engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Touch dimming",
      "Warm-to-cool tones",
      "USB-C powered"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-101"
  },
  {
    "id": "home-living-2",
    "name": "Frame Glow LED Wall Mirror",
    "category": "Home & Living",
    "subcategory": "Decor",
    "brand": "Zapster",
    "price": 3299,
    "mrp": 5999,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523697991302-3726b9a47ec7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Frame Glow LED Wall Mirror engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Dimmable LED halo",
      "Anti-fog finish",
      "Touch sensor"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-102"
  },
  {
    "id": "home-living-3",
    "name": "Fold Lounge Chair Powder Coated",
    "category": "Home & Living",
    "subcategory": "Furniture",
    "brand": "Flash",
    "price": 6999,
    "mrp": 10999,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523697991302-3726b9a47ec7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Fold Lounge Chair Powder Coated engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Powder-coated frame",
      "Textured upholstery",
      "Floor safe"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-103"
  },
  {
    "id": "home-living-4",
    "name": "Cloud Grid Soft Cotton Throw",
    "category": "Home & Living",
    "subcategory": "Textiles",
    "brand": "Botanic",
    "price": 1499,
    "mrp": 2699,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1523697991302-3726b9a47ec7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523697991302-3726b9a47ec7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Cloud Grid Soft Cotton Throw engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "100% soft cotton blend",
      "150cm length",
      "Machine washable"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-104"
  },
  {
    "id": "home-living-5",
    "name": "Pulse Brew Variable Temp Kettle",
    "category": "Home & Living",
    "subcategory": "Kitchen",
    "brand": "Lumicore",
    "price": 2499,
    "mrp": 4299,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517256673644-36ad11246d21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pulse Brew Variable Temp Kettle engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Gooseneck spout",
      "Variable temperature",
      "Hold temp mode"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-105"
  },
  {
    "id": "home-living-6",
    "name": "Drift Aroma Ultrasonic Diffuser",
    "category": "Home & Living",
    "subcategory": "Wellness",
    "brand": "Luxora",
    "price": 1899,
    "mrp": 3299,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Drift Aroma Ultrasonic Diffuser engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Ultrasonic mist",
      "Ambient light modes",
      "Auto shut-off"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-106"
  },
  {
    "id": "home-living-7",
    "name": "AuraDesk Smart Lamp Qi Base",
    "category": "Home & Living",
    "subcategory": "Lighting",
    "brand": "Zapster",
    "price": 3499,
    "mrp": 5999,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated AuraDesk Smart Lamp Qi Base engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Touch dimming LED",
      "Qi wireless charging base",
      "Eye comfort"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-107"
  },
  {
    "id": "home-living-8",
    "name": "Nordic Ceramic Stone Diffuser",
    "category": "Home & Living",
    "subcategory": "Wellness",
    "brand": "Flash",
    "price": 1899,
    "mrp": 3299,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Nordic Ceramic Stone Diffuser engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Matte ceramic shell",
      "Warm glow LED",
      "Silent ultrasonic"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-108"
  },
  {
    "id": "home-living-9",
    "name": "Minimal Ergonomic Seat Cushion",
    "category": "Home & Living",
    "subcategory": "Furniture",
    "brand": "Botanic",
    "price": 2199,
    "mrp": 3999,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimal Ergonomic Seat Cushion engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Memory foam core",
      "Honeycomb mesh",
      "Washable cover"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-109"
  },
  {
    "id": "home-living-10",
    "name": "Modular Wooden Desk Organizer",
    "category": "Home & Living",
    "subcategory": "Decor",
    "brand": "Lumicore",
    "price": 1299,
    "mrp": 2299,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Modular Wooden Desk Organizer engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Solid walnut wood",
      "Modular phone dock",
      "Pen grooves"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-110"
  },
  {
    "id": "home-living-11",
    "name": "Geometric Concrete Planter Set",
    "category": "Home & Living",
    "subcategory": "Decor",
    "brand": "Luxora",
    "price": 999,
    "mrp": 1799,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Geometric Concrete Planter Set engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Hand-poured concrete",
      "Drainage tray included",
      "Set of 3"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-111"
  },
  {
    "id": "home-living-12",
    "name": "Ambient Sunset Light Projector",
    "category": "Home & Living",
    "subcategory": "Lighting",
    "brand": "Zapster",
    "price": 1199,
    "mrp": 2199,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Ambient Sunset Light Projector engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "16 color modes",
      "Remote control",
      "360 rotation aluminum"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-112"
  },
  {
    "id": "home-living-13",
    "name": "Velvet Soft Lumbar Pillow",
    "category": "Home & Living",
    "subcategory": "Textiles",
    "brand": "Flash",
    "price": 899,
    "mrp": 1599,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Velvet Soft Lumbar Pillow engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Plush velvet cover",
      "Ergonomic support",
      "Hidden zipper"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-113"
  },
  {
    "id": "home-living-14",
    "name": "Pour-Over Glass Coffee Maker",
    "category": "Home & Living",
    "subcategory": "Kitchen",
    "brand": "Botanic",
    "price": 1599,
    "mrp": 2799,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pour-Over Glass Coffee Maker engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Borosilicate glass",
      "Stainless mesh filter",
      "600ml capacity"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-114"
  },
  {
    "id": "home-living-15",
    "name": "Minimalist Wall Clock Silent",
    "category": "Home & Living",
    "subcategory": "Decor",
    "brand": "Lumicore",
    "price": 1399,
    "mrp": 2499,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimalist Wall Clock Silent engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Sweep silent movement",
      "12 inch aluminum frame",
      "Glass lens"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-115"
  },
  {
    "id": "home-living-16",
    "name": "Linen Textured Curtains Set",
    "category": "Home & Living",
    "subcategory": "Textiles",
    "brand": "Luxora",
    "price": 2299,
    "mrp": 3999,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Linen Textured Curtains Set engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Light filtering linen",
      "Set of 2 panels",
      "Thermal insulated"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-116"
  },
  {
    "id": "home-living-17",
    "name": "Stainless Steel Thermal Carafe",
    "category": "Home & Living",
    "subcategory": "Kitchen",
    "brand": "Zapster",
    "price": 1799,
    "mrp": 2999,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Stainless Steel Thermal Carafe engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Double wall vacuum",
      "12-hour hot keep",
      "One-touch pour"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-117"
  },
  {
    "id": "home-living-18",
    "name": "Bamboo Wireless Charging Dock",
    "category": "Home & Living",
    "subcategory": "Lighting",
    "brand": "Flash",
    "price": 1699,
    "mrp": 2899,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Bamboo Wireless Charging Dock engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Natural bamboo finish",
      "Built-in organizer",
      "Fast Qi pad"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-118"
  },
  {
    "id": "home-living-19",
    "name": "Smart RGB Light Strip 5M",
    "category": "Home & Living",
    "subcategory": "Lighting",
    "brand": "Botanic",
    "price": 1399,
    "mrp": 2499,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Smart RGB Light Strip 5M engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "App & voice control",
      "Music sync mode",
      "Cut-to-size 5M"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-HOM-119"
  },
  {
    "id": "home-living-20",
    "name": "Modern Ceramic Table Vases",
    "category": "Home & Living",
    "subcategory": "Decor",
    "brand": "Lumicore",
    "price": 1099,
    "mrp": 1899,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Modern Ceramic Table Vases engineered by Lumicore. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Matte ceramic glaze",
      "Set of 2 shapes",
      "Watertight interior"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-HOM-120"
  },
  {
    "id": "beauty-1",
    "name": "Flash Noir Eau de Parfum 50ml",
    "category": "Beauty",
    "subcategory": "Fragrance",
    "brand": "Flash",
    "price": 1499,
    "mrp": 2999,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Flash Noir Eau de Parfum 50ml engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Citrus and cedar notes",
      "50ml long-wear",
      "Gift-ready bottle"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-101"
  },
  {
    "id": "beauty-2",
    "name": "Citrus Rush Fresh Body Mist",
    "category": "Beauty",
    "subcategory": "Fragrance",
    "brand": "Luxora",
    "price": 699,
    "mrp": 1199,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Citrus Rush Fresh Body Mist engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "100ml refreshing mist",
      "Citrus green notes",
      "Travel cap"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-102"
  },
  {
    "id": "beauty-3",
    "name": "Velvet Skin Reset 3-Step Kit",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Urbanic",
    "price": 1799,
    "mrp": 3099,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Velvet Skin Reset 3-Step Kit engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Cleanser + serum + cream",
      "Barrier friendly",
      "AM/PM routine"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-103"
  },
  {
    "id": "beauty-4",
    "name": "Inkline Soft Matte Liquid Lip",
    "category": "Beauty",
    "subcategory": "Makeup",
    "brand": "Botanic",
    "price": 599,
    "mrp": 999,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Inkline Soft Matte Liquid Lip engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Weightless texture",
      "Precision applicator",
      "Stay-put color"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-104"
  },
  {
    "id": "beauty-5",
    "name": "Hydro Boost Hyaluronic Serum",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Flash",
    "price": 1299,
    "mrp": 2299,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Hydro Boost Hyaluronic Serum engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "2% pure hyaluronic acid",
      "Deep hydration",
      "Plumping formula"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-105"
  },
  {
    "id": "beauty-6",
    "name": "Matte Clay Hair Styling Pomade",
    "category": "Beauty",
    "subcategory": "Grooming",
    "brand": "Luxora",
    "price": 799,
    "mrp": 1399,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Matte Clay Hair Styling Pomade engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Strong hold matte finish",
      "Water soluble",
      "Natural scent"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-106"
  },
  {
    "id": "beauty-7",
    "name": "Botanical Face Mist Refresh",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Urbanic",
    "price": 699,
    "mrp": 1199,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597261-8332586b962a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Botanical Face Mist Refresh engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Aloe & rose water",
      "Instant hydration",
      "Makeup setter"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-107"
  },
  {
    "id": "beauty-8",
    "name": "Ultimate Beard & Grooming Set",
    "category": "Beauty",
    "subcategory": "Grooming",
    "brand": "Botanic",
    "price": 1499,
    "mrp": 2699,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597261-8332586b962a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Ultimate Beard & Grooming Set engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Beard oil + balm + comb",
      "Organic jojoba",
      "Cedarwood scent"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-108"
  },
  {
    "id": "beauty-9",
    "name": "Radiant Vitamin C Glow Serum",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Flash",
    "price": 1399,
    "mrp": 2499,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1608248597261-8332586b962a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608248597261-8332586b962a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512290900673-700200411798?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Radiant Vitamin C Glow Serum engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "15% L-ascorbic acid",
      "Fades dark spots",
      "Antioxidant shield"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-109"
  },
  {
    "id": "beauty-10",
    "name": "Charcoal Detox Face Scrub",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Luxora",
    "price": 649,
    "mrp": 1099,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512290900673-700200411798?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Charcoal Detox Face Scrub engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Activated charcoal",
      "Micro-exfoliating",
      "Deep pore clean"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-110"
  },
  {
    "id": "beauty-11",
    "name": "Rose Water Hydrating Cleanser",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Urbanic",
    "price": 749,
    "mrp": 1299,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1512290900673-700200411798?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512290900673-700200411798?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Rose Water Hydrating Cleanser engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Sulfate-free gel",
      "Gentle foaming",
      "Calming rose extract"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-111"
  },
  {
    "id": "beauty-12",
    "name": "Satin Finish Nude Lipstick",
    "category": "Beauty",
    "subcategory": "Makeup",
    "brand": "Botanic",
    "price": 699,
    "mrp": 1199,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Satin Finish Nude Lipstick engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Creamy satin texture",
      "Vitamin E enriched",
      "Long-wearing nude"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-112"
  },
  {
    "id": "beauty-13",
    "name": "Daily Defense Mineral SPF50",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Flash",
    "price": 899,
    "mrp": 1599,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Daily Defense Mineral SPF50 engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Broad spectrum SPF50",
      "Zero white cast",
      "Water resistant"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-113"
  },
  {
    "id": "beauty-14",
    "name": "Repairing Night Serum Concentrate",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Luxora",
    "price": 1899,
    "mrp": 3299,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Repairing Night Serum Concentrate engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Retinol & peptide complex",
      "Overnight recovery",
      "Dermatologist tested"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-114"
  },
  {
    "id": "beauty-15",
    "name": "Exfoliating AHA Body Wash",
    "category": "Beauty",
    "subcategory": "Grooming",
    "brand": "Urbanic",
    "price": 799,
    "mrp": 1399,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Exfoliating AHA Body Wash engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Lactic & salicylic acid",
      "Smooth skin texture",
      "Fresh citrus scent"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-115"
  },
  {
    "id": "beauty-16",
    "name": "Volumizing Lash & Brow Serum",
    "category": "Beauty",
    "subcategory": "Makeup",
    "brand": "Botanic",
    "price": 999,
    "mrp": 1799,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Volumizing Lash & Brow Serum engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Peptide boost complex",
      "Fuller lashes in 4 weeks",
      "Safe for eyes"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-116"
  },
  {
    "id": "beauty-17",
    "name": "Nourishing Shea Butter Hand Cream",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Flash",
    "price": 499,
    "mrp": 899,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Nourishing Shea Butter Hand Cream engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Rich non-greasy cream",
      "24h moisture lock",
      "Travel tube"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-117"
  },
  {
    "id": "beauty-18",
    "name": "Scalp Detox Clarifying Treatment",
    "category": "Beauty",
    "subcategory": "Grooming",
    "brand": "Luxora",
    "price": 1199,
    "mrp": 1999,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590156546946-ce55a22a0a90?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Scalp Detox Clarifying Treatment engineered by Luxora. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Tea tree & salicylic acid",
      "Soothes itch & flake",
      "Weekly treatment"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-118"
  },
  {
    "id": "beauty-19",
    "name": "Niacinamide 10% Blemish Serum",
    "category": "Beauty",
    "subcategory": "Skincare",
    "brand": "Urbanic",
    "price": 999,
    "mrp": 1699,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590156546946-ce55a22a0a90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Niacinamide 10% Blemish Serum engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "10% Niacinamide + 1% Zinc",
      "Refines pores",
      "Controls oil"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-BEA-119"
  },
  {
    "id": "beauty-20",
    "name": "Hydrating Lip Mask Overnight",
    "category": "Beauty",
    "subcategory": "Lip Care",
    "brand": "Botanic",
    "price": 549,
    "mrp": 949,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1590156546946-ce55a22a0a90?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590156546946-ce55a22a0a90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Hydrating Lip Mask Overnight engineered by Botanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Berry extract blend",
      "Deep lip hydration",
      "Spatula included"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-BEA-120"
  },
  {
    "id": "sports-1",
    "name": "Pace 6mm Non-Slip Training Mat",
    "category": "Sports",
    "subcategory": "Fitness",
    "brand": "Boltic",
    "price": 899,
    "mrp": 1699,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Pace 6mm Non-Slip Training Mat engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "6mm shock absorption",
      "Non-slip texture",
      "Carry strap"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-101"
  },
  {
    "id": "sports-2",
    "name": "Reset High-Density Foam Roller",
    "category": "Sports",
    "subcategory": "Recovery",
    "brand": "Flash",
    "price": 999,
    "mrp": 1799,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Reset High-Density Foam Roller engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Targeted texture zones",
      "High density foam",
      "Easy clean"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-102"
  },
  {
    "id": "sports-3",
    "name": "Motion Cast Iron Kettlebell 8kg",
    "category": "Sports",
    "subcategory": "Strength",
    "brand": "Vantage",
    "price": 1899,
    "mrp": 3199,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Motion Cast Iron Kettlebell 8kg engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "8kg powder coated",
      "Wide grip handle",
      "Flat stable base"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-103"
  },
  {
    "id": "sports-4",
    "name": "Stride Double-Wall Steel Bottle",
    "category": "Sports",
    "subcategory": "Hydration",
    "brand": "Boltic",
    "price": 799,
    "mrp": 1399,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Stride Double-Wall Steel Bottle engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "750ml capacity",
      "Leakproof vacuum lid",
      "Carry loop"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-104"
  },
  {
    "id": "sports-5",
    "name": "Tempo 5-Band Resistance Set",
    "category": "Sports",
    "subcategory": "Training",
    "brand": "Flash",
    "price": 1199,
    "mrp": 2099,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tempo 5-Band Resistance Set engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Five resistance levels",
      "Door anchor & handles",
      "Carry pouch"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-105"
  },
  {
    "id": "sports-6",
    "name": "Speed Cable Skipping Rope Pro",
    "category": "Sports",
    "subcategory": "Training",
    "brand": "Vantage",
    "price": 599,
    "mrp": 1099,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526401485004-2fda9f6cfa25?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Speed Cable Skipping Rope Pro engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Ball bearing swivel",
      "Steel cable 3M",
      "Anti-slip handles"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-106"
  },
  {
    "id": "sports-7",
    "name": "Smart Insulated Gym Flask 1L",
    "category": "Sports",
    "subcategory": "Hydration",
    "brand": "Boltic",
    "price": 1099,
    "mrp": 1899,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526401485004-2fda9f6cfa25?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Smart Insulated Gym Flask 1L engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "1000ml vacuum insulated",
      "Dual drinking lid",
      "BPA free"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-107"
  },
  {
    "id": "sports-8",
    "name": "Heavy Resistance Loop Bands",
    "category": "Sports",
    "subcategory": "Training",
    "brand": "Flash",
    "price": 699,
    "mrp": 1199,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1526401485004-2fda9f6cfa25?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1526401485004-2fda9f6cfa25?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Heavy Resistance Loop Bands engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Set of 3 heavy loops",
      "Non-slip fabric knit",
      "Glute & leg focus"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-108"
  },
  {
    "id": "sports-9",
    "name": "Deep Tissue Percussion Massage Gun",
    "category": "Sports",
    "subcategory": "Recovery",
    "brand": "Vantage",
    "price": 2999,
    "mrp": 5999,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Deep Tissue Percussion Massage Gun engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Quiet brushless motor",
      "6 massage heads",
      "20 speed levels"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-109"
  },
  {
    "id": "sports-10",
    "name": "Waterproof Gym Duffel Bag 35L",
    "category": "Sports",
    "subcategory": "Accessories",
    "brand": "Boltic",
    "price": 1699,
    "mrp": 2999,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Waterproof Gym Duffel Bag 35L engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Separate shoe compartment",
      "Wet pocket",
      "35L volume"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-110"
  },
  {
    "id": "sports-11",
    "name": "Adjustable Cast Iron Dumbbell Set",
    "category": "Sports",
    "subcategory": "Strength",
    "brand": "Flash",
    "price": 3499,
    "mrp": 5999,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Adjustable Cast Iron Dumbbell Set engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "20kg total set",
      "Threaded collar locks",
      "Rubber grip bar"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-111"
  },
  {
    "id": "sports-12",
    "name": "High-Density Yoga Block Twin",
    "category": "Sports",
    "subcategory": "Fitness",
    "brand": "Vantage",
    "price": 699,
    "mrp": 1199,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated High-Density Yoga Block Twin engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "EVA foam blocks set of 2",
      "Beveled edges",
      "Moisture proof"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-112"
  },
  {
    "id": "sports-13",
    "name": "Padded Lifting Straps & Wraps",
    "category": "Sports",
    "subcategory": "Strength",
    "brand": "Boltic",
    "price": 499,
    "mrp": 899,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517438322307-e67111335459?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Padded Lifting Straps & Wraps engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Neoprene padded wrist",
      "Heavy cotton webbing",
      "Grip boost"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-113"
  },
  {
    "id": "sports-14",
    "name": "Non-Slip Workout Hand Gloves",
    "category": "Sports",
    "subcategory": "Fitness",
    "brand": "Flash",
    "price": 599,
    "mrp": 999,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517438322307-e67111335459?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Non-Slip Workout Hand Gloves engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Breathable mesh back",
      "Silicone palm padding",
      "Pull tab removal"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-114"
  },
  {
    "id": "sports-15",
    "name": "Tactical Hydration Backpack 10L",
    "category": "Sports",
    "subcategory": "Accessories",
    "brand": "Vantage",
    "price": 1999,
    "mrp": 3499,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1517438322307-e67111335459?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517438322307-e67111335459?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tactical Hydration Backpack 10L engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "2L hydration bladder included",
      "Bite valve",
      "Chest sternum strap"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-115"
  },
  {
    "id": "sports-16",
    "name": "Agility Ladder & Cone Training",
    "category": "Sports",
    "subcategory": "Training",
    "brand": "Boltic",
    "price": 1299,
    "mrp": 2299,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Agility Ladder & Cone Training engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "6M agility ladder",
      "12 disc cones",
      "Speed training set"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-116"
  },
  {
    "id": "sports-17",
    "name": "Compression Knee Support Sleeves",
    "category": "Sports",
    "subcategory": "Recovery",
    "brand": "Flash",
    "price": 799,
    "mrp": 1399,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Compression Knee Support Sleeves engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "3D knit compression",
      "Patella gel ring",
      "Side stabilizers"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-117"
  },
  {
    "id": "sports-18",
    "name": "Electro-Hydration Powder Pack",
    "category": "Sports",
    "subcategory": "Hydration",
    "brand": "Vantage",
    "price": 899,
    "mrp": 1499,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Electro-Hydration Powder Pack engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "30 single serve sachets",
      "Zero sugar electrolytes",
      "Berry lemon"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-118"
  },
  {
    "id": "sports-19",
    "name": "Ab Roller Wheel with Knee Pad",
    "category": "Sports",
    "subcategory": "Fitness",
    "brand": "Boltic",
    "price": 749,
    "mrp": 1299,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Ab Roller Wheel with Knee Pad engineered by Boltic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Ultra-wide wheel tread",
      "Ergonomic rubber handles",
      "Knee mat"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-SPO-119"
  },
  {
    "id": "sports-20",
    "name": "Speed Agility Jump Box Trainer",
    "category": "Sports",
    "subcategory": "Fitness",
    "brand": "Flash",
    "price": 2199,
    "mrp": 3799,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Speed Agility Jump Box Trainer engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "3-in-1 plyo box",
      "Slip resistant vinyl",
      "High density foam"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-SPO-120"
  },
  {
    "id": "accessories-1",
    "name": "Arc Daily Compact Crossbody Sling",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Urbanic",
    "price": 1199,
    "mrp": 2299,
    "stock": 10,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Arc Daily Compact Crossbody Sling engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Water resistant shell",
      "Quick access pocket",
      "Padded sleeve"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-101"
  },
  {
    "id": "accessories-2",
    "name": "Drift Daypack 18L Laptop Bag",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Zapster",
    "price": 2299,
    "mrp": 3999,
    "stock": 13,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Drift Daypack 18L Laptop Bag engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "18L volume",
      "Padded laptop sleeve",
      "Side bottle pocket"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-102"
  },
  {
    "id": "accessories-3",
    "name": "Signal Frame Rectangular Glasses",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "brand": "Flash",
    "price": 1499,
    "mrp": 2599,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Signal Frame Rectangular Glasses engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "UV400 protection",
      "Lightweight acetate",
      "Polarized lens"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-103"
  },
  {
    "id": "accessories-4",
    "name": "Loop Tech Cable Organizer Kit",
    "category": "Accessories",
    "subcategory": "Tech Organizers",
    "brand": "Vantage",
    "price": 899,
    "mrp": 1599,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Loop Tech Cable Organizer Kit engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Elastic cable loops",
      "Zip enclosure",
      "Water resistant"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-104"
  },
  {
    "id": "accessories-5",
    "name": "Arc Slim Vegan Leather Card Holder",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Urbanic",
    "price": 699,
    "mrp": 1299,
    "stock": 22,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622831617330-89e2d40b8e5c?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Arc Slim Vegan Leather Card Holder engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Six card slots",
      "Pull tab pocket",
      "RFID lining"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-105"
  },
  {
    "id": "accessories-6",
    "name": "RFID Minimalist Bifold Wallet",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Zapster",
    "price": 999,
    "mrp": 1799,
    "stock": 25,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622831617330-89e2d40b8e5c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated RFID Minimalist Bifold Wallet engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Full grain leather",
      "RFID blocking shield",
      "Money clip"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-106"
  },
  {
    "id": "accessories-7",
    "name": "Tactical Waterproof Tech Pouch",
    "category": "Accessories",
    "subcategory": "Tech Organizers",
    "brand": "Flash",
    "price": 1399,
    "mrp": 2399,
    "stock": 28,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1622831617330-89e2d40b8e5c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1622831617330-89e2d40b8e5c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Tactical Waterproof Tech Pouch engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Weatherproof YKK zips",
      "Fleece device pocket",
      "Cable web"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-107"
  },
  {
    "id": "accessories-8",
    "name": "Matte Acetate Polarized Sunglasses",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "brand": "Vantage",
    "price": 1699,
    "mrp": 2999,
    "stock": 31,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Matte Acetate Polarized Sunglasses engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Handmade acetate",
      "TAC polarized lens",
      "Hard case"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-108"
  },
  {
    "id": "accessories-9",
    "name": "Braided Nylon USB-C Cable 2M",
    "category": "Accessories",
    "subcategory": "Tech Organizers",
    "brand": "Urbanic",
    "price": 499,
    "mrp": 899,
    "stock": 34,
    "express": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Braided Nylon USB-C Cable 2M engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "100W PD charging",
      "10,000+ bend lifespan",
      "2M length"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-109"
  },
  {
    "id": "accessories-10",
    "name": "Leather Key Organizer Clip",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Zapster",
    "price": 599,
    "mrp": 999,
    "stock": 37,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Leather Key Organizer Clip engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Holds up to 7 keys",
      "Stainless locking pin",
      "Car key D-ring"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-110"
  },
  {
    "id": "accessories-11",
    "name": "Expandable Weekender Duffel Bag",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Flash",
    "price": 2799,
    "mrp": 4899,
    "stock": 40,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Expandable Weekender Duffel Bag engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Waterproof nylon",
      "Expandable bottom zip",
      "Trolley sleeve"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-111"
  },
  {
    "id": "accessories-12",
    "name": "Hard Shell Earbud Travel Case",
    "category": "Accessories",
    "subcategory": "Tech Organizers",
    "brand": "Vantage",
    "price": 399,
    "mrp": 699,
    "stock": 43,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Hard Shell Earbud Travel Case engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "EVA hard shell",
      "Mesh interior pocket",
      "Carabiner clip"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-112"
  },
  {
    "id": "accessories-13",
    "name": "Minimalist Stainless Money Clip",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Urbanic",
    "price": 499,
    "mrp": 899,
    "stock": 46,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Minimalist Stainless Money Clip engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Spring tempered steel",
      "Slim pocket profile",
      "Brushed finish"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-113"
  },
  {
    "id": "accessories-14",
    "name": "Canvas Daily Commuter Tote Bag",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Zapster",
    "price": 1299,
    "mrp": 2199,
    "stock": 49,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Canvas Daily Commuter Tote Bag engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "16oz heavy cotton canvas",
      "Zip top closure",
      "Internal bottle sleeve"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-114"
  },
  {
    "id": "accessories-15",
    "name": "Anti-Theft Slim Crossbody Bag",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Flash",
    "price": 1599,
    "mrp": 2799,
    "stock": 52,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Anti-Theft Slim Crossbody Bag engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Cut-proof fabric",
      "Hidden zip pockets",
      "RFID card slot"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-115"
  },
  {
    "id": "accessories-16",
    "name": "Blue Light Blocking Glasses",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "brand": "Vantage",
    "price": 1199,
    "mrp": 1999,
    "stock": 10,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563903530908-afdd15a6613d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Blue Light Blocking Glasses engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Filters 99% blue light",
      "TR90 flexible frame",
      "Anti glare"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-116"
  },
  {
    "id": "accessories-17",
    "name": "Leather Passport Travel Sleeve",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Urbanic",
    "price": 899,
    "mrp": 1499,
    "stock": 13,
    "express": true,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563903530908-afdd15a6613d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Leather Passport Travel Sleeve engineered by Urbanic. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Passport slot + 4 cards",
      "Pen holder",
      "Soft touch leather"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-117"
  },
  {
    "id": "accessories-18",
    "name": "Carabiner Heavy Duty Keychain",
    "category": "Accessories",
    "subcategory": "Wallets",
    "brand": "Zapster",
    "price": 499,
    "mrp": 899,
    "stock": 16,
    "express": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1563903530908-afdd15a6613d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1563903530908-afdd15a6613d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Carabiner Heavy Duty Keychain engineered by Zapster. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Titanium alloy carabiner",
      "Bottle opener built-in",
      "Dual key rings"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-118"
  },
  {
    "id": "accessories-19",
    "name": "Magnetic Cable Clip Organizer 3P",
    "category": "Accessories",
    "subcategory": "Tech Organizers",
    "brand": "Flash",
    "price": 549,
    "mrp": 949,
    "stock": 19,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Magnetic Cable Clip Organizer 3P engineered by Flash. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Magnetic desktop base",
      "Fits all cables",
      "Strong 3M tape"
    ],
    "colors": [
      "#0F1115",
      "#F4F4F5"
    ],
    "sku": "FL-ACC-119"
  },
  {
    "id": "accessories-20",
    "name": "Foldable Nylon Shopper Tote",
    "category": "Accessories",
    "subcategory": "Bags",
    "brand": "Vantage",
    "price": 699,
    "mrp": 1199,
    "stock": 22,
    "express": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    "description": "Curated Foldable Nylon Shopper Tote engineered by Vantage. Built for performance, everyday reliability, and sleek aesthetics.",
    "highlights": [
      "Packable into pouch",
      "Holds up to 15kg",
      "Washable nylon"
    ],
    "colors": [
      "#CCFF00",
      "#1E2024"
    ],
    "sku": "FL-ACC-120"
  }
];

export const products: Product[] = productSeed;

export const getProduct = (id?: string) => products.find((product) => product.id === id);
export const getProductVariant = (product: Product, color?: string) => product.variants?.find((variant) => variant.color === color) ?? product.variants?.[0];
export const getProductGallery = (product: Product, color?: string) => getProductVariant(product, color)?.gallery ?? product.gallery;
export const getDiscount = (product: Product) => Math.round(((product.mrp - product.price) / product.mrp) * 100);
export const formatINR = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
