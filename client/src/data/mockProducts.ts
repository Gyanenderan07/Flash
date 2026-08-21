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

const generated = {
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
  sneaker: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
};

const photo = (id: string) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=1000&q=85";
const stage = (id: string) => photo(id) + "&fm=jpg";
const anglePool = [
  "photo-1523275335684-37898b6baf30", "photo-1546868871-7041f2a55e12", "photo-1579586337278-3befd40fd17a", "photo-1505740420928-5e560c06d30e",
  "photo-1542291026-7eec264c27ff", "photo-1552346154-21d32810aba3", "photo-1516035069371-29a1b244cc32", "photo-1510127034890-ba27508e9f1c",
  "photo-1505693416388-ac5ce068fe85", "photo-1602523961358-f9f03dd557db", "photo-1523293182086-7651a899d37f", "photo-1518611012118-696072aa579a",
  "photo-1553062407-98eeb64c6a62", "photo-1511499767150-a48a237f0083", "photo-1587829741301-dc798b83add3", "photo-1602143407151-7111542de6e8",
];
const fourAngles = (index: number, gallery: string[]) => {
  const distinct = Array.from(new Set(gallery));
  return distinct;
};

export const categoryOrder: ProductCategory[] = [
  "Electronics", "Fashion", "Footwear", "Watches", "Home & Living", "Beauty", "Sports", "Accessories",
];

const productSeed: Product[] = [
  {
    id: "nova-beat-x1", name: "NovaBeat X1", category: "Electronics", subcategory: "Audio", brand: "Nexora", price: 2999, mrp: 7499, stock: 24, express: true,
    image: generated.headphones, gallery: [generated.headphones, stage("photo-1505740420928-5e560c06d30e"), stage("photo-1484704849700-f032a568e944"), stage("photo-1590658268037-6bf12165a8df")], description: "Immersive over-ear sound shaped for deep focus and fast commutes.", highlights: ["40mm spatial drivers", "42-hour battery", "Hybrid active noise cancellation", "Bluetooth 5.3 multipoint"], colors: ["#F5F2EA", "#141414", "#CCFF00"], sku: "FL-NBX1-PEARL", variants: [
      { color: "#F5F2EA", name: "Ghost White", sku: "FL-NBX1-WHT", image: generated.headphones, gallery: [generated.headphones, stage("photo-1505740420928-5e560c06d30e"), stage("photo-1484704849700-f032a568e944"), stage("photo-1590658268037-6bf12165a8df")] },
      { color: "#141414", name: "Obsidian Black", sku: "FL-NBX1-BLK", image: stage("photo-1505740420928-5e560c06d30e"), gallery: [stage("photo-1505740420928-5e560c06d30e"), stage("photo-1484704849700-f032a568e944"), stage("photo-1590658268037-6bf12165a8df"), stage("photo-1487215078519-e21cc028cb29")] },
      { color: "#CCFF00", name: "Volt Lime", sku: "FL-NBX1-VLT", image: stage("photo-1487215078519-e21cc028cb29"), gallery: [stage("photo-1487215078519-e21cc028cb29"), stage("photo-1590658268037-6bf12165a8df"), stage("photo-1505740420928-5e560c06d30e"), stage("photo-1484704849700-f032a568e944")] },
    ],
  },
  {
    id: "flashfit-watch-22", name: "FlashFit Watch 22", category: "Watches", subcategory: "Smart Watches", brand: "Flash", price: 1999, mrp: 4999, stock: 16, express: true,
    image: generated.watch, gallery: [generated.watch, stage("photo-1546868871-7041f2a55e12"), stage("photo-1579586337278-3befd40fd17a"), stage("photo-1523275335684-37898b6baf30")], description: "A sharp, all-day health companion built around your rhythm.", highlights: ["AMOLED always-on display", "Heart-rate and sleep tracking", "7-day battery", "50m water resistance"], colors: ["#111111", "#EEF0EC", "#758E0A"], sku: "FL-FW22-GRAPH", variants: [
      { color: "#111111", name: "Obsidian Black", sku: "FL-FW22-BLK", image: generated.watch, gallery: [generated.watch, stage("photo-1546868871-7041f2a55e12"), stage("photo-1579586337278-3befd40fd17a"), stage("photo-1523275335684-37898b6baf30")] },
      { color: "#EEF0EC", name: "Ghost White", sku: "FL-FW22-WHT", image: stage("photo-1523275335684-37898b6baf30"), gallery: [stage("photo-1523275335684-37898b6baf30"), stage("photo-1579586337278-3befd40fd17a"), stage("photo-1546868871-7041f2a55e12"), stage("photo-1508057198894-247b23fe5ade")] },
      { color: "#758E0A", name: "Volt Lime", sku: "FL-FW22-LIME", image: stage("photo-1579586337278-3befd40fd17a"), gallery: [stage("photo-1579586337278-3befd40fd17a"), stage("photo-1546868871-7041f2a55e12"), stage("photo-1523275335684-37898b6baf30"), stage("photo-1508057198894-247b23fe5ade")] },
    ],
  },
  {
    id: "flashcam-pro", name: "FlashCam Pro", category: "Electronics", subcategory: "Cameras", brand: "Lumicore", price: 24999, mrp: 49999, stock: 8, express: false,
    image: generated.camera, gallery: [generated.camera, stage("photo-1516035069371-29a1b244cc32"), stage("photo-1510127034890-ba27508e9f1c"), stage("photo-1452780212940-6f5c0d14d848")], description: "A compact mirrorless camera that keeps up with the moment.", highlights: ["24MP APS-C sensor", "4K video capture", "Phase-detect autofocus", "Wi-Fi creator transfer"], colors: ["#202020", "#B7B7B2"], sku: "FL-FCP-24K", variants: [
      { color: "#202020", name: "Obsidian Black", sku: "FL-FCP-BLK", image: generated.camera, gallery: [generated.camera, stage("photo-1516035069371-29a1b244cc32"), stage("photo-1510127034890-ba27508e9f1c"), stage("photo-1452780212940-6f5c0d14d848")] },
      { color: "#B7B7B2", name: "Graphite Silver", sku: "FL-FCP-SLV", image: stage("photo-1516035069371-29a1b244cc32"), gallery: [stage("photo-1516035069371-29a1b244cc32"), stage("photo-1510127034890-ba27508e9f1c"), stage("photo-1452780212940-6f5c0d14d848"), generated.camera] },
    ],
  },
  {
    id: "flashrun-max", name: "FlashRun Max", category: "Footwear", subcategory: "Running", brand: "Vantage", price: 2599, mrp: 3999, stock: 33, express: true,
    image: generated.sneaker, gallery: [generated.sneaker, stage("photo-1542291026-7eec264c27ff"), stage("photo-1552346154-21d32810aba3"), stage("photo-1551107696-a4b0c5a0d9a2")], description: "Responsive daily runners with a light, locked-in feel.", highlights: ["Breathable knit upper", "Adaptive foam return", "Grippy street outsole", "Reflective pull tab"], colors: ["#151515", "#F3F3EF", "#CCFF00"], sizes: ["6", "7", "8", "9", "10"], sku: "FL-FRM-BLK", variants: [
      { color: "#151515", name: "Obsidian Black", sku: "FL-FRM-BLK", image: generated.sneaker, gallery: [generated.sneaker, stage("photo-1542291026-7eec264c27ff"), stage("photo-1552346154-21d32810aba3"), stage("photo-1551107696-a4b0c5a0d9a2")] },
      { color: "#F3F3EF", name: "Ghost White", sku: "FL-FRM-WHT", image: stage("photo-1552346154-21d32810aba3"), gallery: [stage("photo-1552346154-21d32810aba3"), stage("photo-1551107696-a4b0c5a0d9a2"), stage("photo-1542291026-7eec264c27ff"), generated.sneaker] },
      { color: "#CCFF00", name: "Volt Lime", sku: "FL-FRM-LIME", image: stage("photo-1542291026-7eec264c27ff"), gallery: [stage("photo-1542291026-7eec264c27ff"), generated.sneaker, stage("photo-1552346154-21d32810aba3"), stage("photo-1551107696-a4b0c5a0d9a2")] },
    ],
  },
  {
    id: "drift-hoodie", name: "Drift Studio Hoodie", category: "Fashion", subcategory: "Streetwear", brand: "Urbanic", price: 1899, mrp: 3299, stock: 43, express: true,
    image: photo("photo-1556821840-3a63f95609a7"), gallery: [photo("photo-1556821840-3a63f95609a7"), photo("photo-1556821840-3a63f95609a7")], description: "A heavyweight layer with a clean cut and a soft brushed interior.", highlights: ["420 GSM cotton blend", "Dropped shoulder fit", "Brushed fleece interior", "Kangaroo pocket"], colors: ["#CCFF00", "#131313", "#ECEAE4"], sizes: ["S", "M", "L", "XL"], sku: "FL-DSH-LIME",
  },
  {
    id: "orbit-one", name: "Orbit One Chrono", category: "Watches", subcategory: "Analog Watches", brand: "Vantage", price: 4499, mrp: 8999, stock: 11, express: false,
    image: photo("photo-1523275335684-37898b6baf30"), gallery: [photo("photo-1523275335684-37898b6baf30"), photo("photo-1523275335684-37898b6baf30")], description: "A clean steel chronograph that brings precision to every look.", highlights: ["Sapphire-coated mineral glass", "Japanese quartz movement", "Stainless steel case", "2-year warranty"], colors: ["#1B1B1B", "#B9B8B4"], sku: "FL-OR1-STEEL",
  },
  {
    id: "halo-desk-lamp", name: "Halo Desk Light", category: "Home & Living", subcategory: "Lighting", brand: "Luxora", price: 1699, mrp: 2999, stock: 27, express: true,
    image: photo("photo-1507473885765-e6ed057f782c"), gallery: [photo("photo-1507473885765-e6ed057f782c"), photo("photo-1507473885765-e6ed057f782c")], description: "A focused, dimmable pool of light for late nights and early starts.", highlights: ["Touch dimming", "Warm-to-cool tones", "USB-C power", "Low-glare diffuser"], colors: ["#F0F0EA", "#1B1B1B"], sku: "FL-HDL-01",
  },
  {
    id: "flash-noir", name: "Flash Noir Eau de Parfum", category: "Beauty", subcategory: "Fragrance", brand: "Flash", price: 1499, mrp: 2999, stock: 38, express: true,
    image: photo("photo-1547887538-e3a2f32cb1cc"), gallery: [photo("photo-1547887538-e3a2f32cb1cc"), photo("photo-1547887538-e3a2f32cb1cc")], description: "A warm, modern scent with a brisk hit of citrus over dark woods.", highlights: ["50ml eau de parfum", "Citrus and cedar notes", "Long-wear composition", "Gift-ready bottle"], colors: ["#231A13", "#E4B85C"], sku: "FL-NOIR-50",
  },
  {
    id: "pace-training-mat", name: "Pace Training Mat", category: "Sports", subcategory: "Fitness", brand: "Boltic", price: 899, mrp: 1699, stock: 52, express: true,
    image: photo("photo-1601925260368-ae2f83cf8b7f"), gallery: [photo("photo-1601925260368-ae2f83cf8b7f"), photo("photo-1601925260368-ae2f83cf8b7f")], description: "A stable, cushioning base for your at-home movement ritual.", highlights: ["6mm shock absorption", "Non-slip texture", "Easy-clean finish", "Includes carry strap"], colors: ["#1A1A1A", "#A6C900"], sku: "FL-PTM-6MM",
  },
  {
    id: "arc-sling", name: "Arc Daily Sling", category: "Accessories", subcategory: "Bags", brand: "Urbanic", price: 1199, mrp: 2299, stock: 20, express: true,
    image: photo("photo-1553062407-98eeb64c6a62"), gallery: [photo("photo-1553062407-98eeb64c6a62"), photo("photo-1553062407-98eeb64c6a62")], description: "A compact crossbody built to keep the small essentials close.", highlights: ["Water-resistant shell", "Quick-access front pocket", "Adjustable strap", "Padded device sleeve"], colors: ["#171717", "#8F9D52"], sku: "FL-ADS-OBSID",
  },
  {
    id: "pocket-speaker", name: "Pocket Pulse Speaker", category: "Electronics", subcategory: "Audio", brand: "Zapster", price: 1799, mrp: 3499, stock: 35, express: true,
    image: photo("photo-1608043152269-423dbba4e7e1"), gallery: [photo("photo-1608043152269-423dbba4e7e1"), photo("photo-1608043152269-423dbba4e7e1")], description: "Big, clear sound in a palm-sized shape that follows you out.", highlights: ["16W tuned audio", "12-hour playtime", "IPX7 water resistance", "Stereo pairing"], colors: ["#141414", "#EFEFE9"], sku: "FL-PPS-16W",
  },
  {
    id: "frame-glow", name: "Frame Glow Mirror", category: "Home & Living", subcategory: "Decor", brand: "Luxora", price: 3299, mrp: 5999, stock: 14, express: false,
    image: photo("photo-1618220179428-22790b461013"), gallery: [photo("photo-1618220179428-22790b461013"), photo("photo-1618220179428-22790b461013")], description: "A softly lit wall mirror that makes an everyday corner feel considered.", highlights: ["Dimmable LED halo", "Anti-fog finish", "Touch sensor", "Wall-mount hardware"], colors: ["#E9E7DF", "#1A1A1A"], sku: "FL-FGM-LED",
  },
  { id: "airloop-mini", name: "AirLoop Mini Earbuds", category: "Electronics", subcategory: "Audio", brand: "Nexora", price: 1699, mrp: 3499, stock: 31, express: true, isNew: true, image: photo("photo-1606220945770-b5b6c2c55bf1"), gallery: [photo("photo-1606220945770-b5b6c2c55bf1"), photo("photo-1590658268037-6bf12165a8df")], description: "Pocket-sized wireless listening with a clean bass lift for fast days.", highlights: ["30-hour charge case", "Low-latency mode", "Dual-mic calling", "Splash resistance"], colors: ["#F5F2EA", "#151515"], sku: "FL-ALM-AIR" },
  { id: "orbit-projector", name: "Orbit Pocket Projector", category: "Electronics", subcategory: "Projectors", brand: "Lumicore", price: 8999, mrp: 14999, stock: 9, express: false, image: photo("photo-1626379953822-baec19c3accd"), gallery: [photo("photo-1626379953822-baec19c3accd"), photo("photo-1528399783831-8318d62d5b5b")], description: "A compact projection engine for evenings that need a bigger frame.", highlights: ["1080p support", "120-inch throw", "Built-in stereo speaker", "USB-C input"], colors: ["#F2F1EB", "#1B1B1B"], sku: "FL-OPP-1080" },
  { id: "grid-mech-75", name: "Grid Mech 75 Keyboard", category: "Electronics", subcategory: "Computing", brand: "Zapster", price: 4299, mrp: 6999, stock: 18, express: true, isNew: true, image: photo("photo-1587829741301-dc798b83add3"), gallery: [photo("photo-1587829741301-dc798b83add3"), photo("photo-1595225476474-87563907a212")], description: "A crisp mechanical board with a compact layout and a focused typing feel.", highlights: ["Hot-swap switches", "Wireless tri-mode", "PBT keycaps", "Volume dial"], colors: ["#1A1A1A", "#EDEDE6"], sku: "FL-GM75-OBS" },
  { id: "flux-charge-3", name: "Flux Charge 3-in-1", category: "Electronics", subcategory: "Accessories", brand: "Flash", price: 1999, mrp: 3299, stock: 29, express: true, image: photo("photo-1587033411391-5d9e51cce126"), gallery: [photo("photo-1587033411391-5d9e51cce126"), photo("photo-1609592806596-4dbe0f194f8c")], description: "A single charging stand for the desk devices that keep your day moving.", highlights: ["15W wireless pad", "Fold-flat travel mode", "USB-C cable included", "Device-safe cooling"], colors: ["#F3F3EC", "#161616"], sku: "FL-FC3-15W" },
  { id: "mode-utility-jacket", name: "Mode Utility Jacket", category: "Fashion", subcategory: "Outerwear", brand: "Urbanic", price: 2899, mrp: 4999, stock: 25, express: true, isNew: true, image: photo("photo-1548883354-7622d03aca27"), gallery: [photo("photo-1548883354-7622d03aca27"), photo("photo-1551028719-00167b16eac5")], description: "A weather-ready layer with clean pockets and a relaxed city cut.", highlights: ["Water-resistant shell", "Utility pocket system", "Adjustable hem", "Mesh lining"], colors: ["#1B1B1B", "#757C51"], sizes: ["S", "M", "L", "XL"], sku: "FL-MUJ-OBS" },
  { id: "signal-relaxed-tee", name: "Signal Relaxed Tee", category: "Fashion", subcategory: "Essentials", brand: "Flash", price: 799, mrp: 1499, stock: 63, express: true, image: photo("photo-1521572163474-6864f9cf17ab"), gallery: [photo("photo-1521572163474-6864f9cf17ab"), photo("photo-1503341504253-dff4815485f1")], description: "A soft heavyweight tee cut for the off-duty side of the fast lane.", highlights: ["240 GSM cotton", "Relaxed shoulder", "Ribbed collar", "Pre-washed finish"], colors: ["#F4F2E8", "#1A1A1A", "#D8FF00"], sizes: ["S", "M", "L", "XL"], sku: "FL-SRT-SIG" },
  { id: "linewide-trouser", name: "Linewide Cargo Trouser", category: "Fashion", subcategory: "Bottoms", brand: "Urbanic", price: 2199, mrp: 3799, stock: 37, express: true, image: photo("photo-1473966968600-fa801b869a1a"), gallery: [photo("photo-1473966968600-fa801b869a1a"), photo("photo-1506629905607-d405b7a30db5")], description: "Structured cargo trousers with a straight fit that works at speed.", highlights: ["Cotton twill", "Six utility pockets", "Adjustable cuffs", "Relaxed rise"], colors: ["#292A26", "#C7C0AD"], sizes: ["28", "30", "32", "34"], sku: "FL-LCT-OLV" },
  { id: "pace-street-cap", name: "Pace Street Cap", category: "Fashion", subcategory: "Headwear", brand: "Vantage", price: 699, mrp: 1199, stock: 48, express: true, image: photo("photo-1588850561407-ed78c282e89b"), gallery: [photo("photo-1588850561407-ed78c282e89b"), photo("photo-1521369909029-2afed882baee")], description: "A light, low-profile cap for bright commutes and shaded weekends.", highlights: ["Curved visor", "Breathable panels", "Adjustable closure", "Embroidered mark"], colors: ["#101010", "#F2F2EA"], sku: "FL-PSC-BLK" },
  { id: "vector-runner", name: "Vector Runner LT", category: "Footwear", subcategory: "Running", brand: "Vantage", price: 2999, mrp: 5499, stock: 26, express: true, isNew: true, image: photo("photo-1542291026-7eec264c27ff"), gallery: [photo("photo-1542291026-7eec264c27ff"), photo("photo-1551107696-a4b0c5a0d9a2")], description: "Everyday running trainers built with responsive support and a sharp street stance.", highlights: ["Energy foam midsole", "Engineered mesh", "Grippy rubber outsole", "Heel pull"], colors: ["#E2F800", "#101010", "#F4F4EF"], sizes: ["6", "7", "8", "9", "10"], sku: "FL-VRL-LIME" },
  { id: "arc-court-low", name: "Arc Court Low", category: "Footwear", subcategory: "Sneakers", brand: "Flash", price: 2399, mrp: 4299, stock: 34, express: true, image: photo("photo-1549298916-b41d501d3772"), gallery: [photo("photo-1549298916-b41d501d3772"), photo("photo-1552346154-21d32810aba3")], description: "Clean low-top sneakers with a cushioned ride and a pared-back upper.", highlights: ["Synthetic leather upper", "Padded collar", "Cupsole grip", "Contrast heel tab"], colors: ["#F3F3ED", "#181818"], sizes: ["6", "7", "8", "9", "10"], sku: "FL-ACL-WHT" },
  { id: "trail-shift", name: "Trail Shift Hike", category: "Footwear", subcategory: "Outdoor", brand: "Boltic", price: 3499, mrp: 5999, stock: 15, express: false, image: photo("photo-1460353581641-37baddab0fa2"), gallery: [photo("photo-1460353581641-37baddab0fa2"), photo("photo-1520639888713-7851133b1ed0")], description: "A sure-footed trail shoe for routes that leave the pavement behind.", highlights: ["Rugged lug sole", "Reinforced toe", "Water-resistant mesh", "Cushioned collar"], colors: ["#2A2A27", "#7C8A40"], sizes: ["7", "8", "9", "10", "11"], sku: "FL-TSH-TRAIL" },
  { id: "tempo-slip", name: "Tempo Recovery Slide", category: "Footwear", subcategory: "Slides", brand: "Boltic", price: 999, mrp: 1799, stock: 59, express: true, image: photo("photo-1552346154-21d32810aba3"), gallery: [photo("photo-1552346154-21d32810aba3"), photo("photo-1551107696-a4b0c5a0d9a2")], description: "Soft recovery slides made for the switch from training to reset.", highlights: ["Contoured foam", "Textured footbed", "Quick-dry finish", "Lightweight build"], colors: ["#1A1A1A", "#E2F800"], sizes: ["6", "7", "8", "9", "10"], sku: "FL-TRS-OBS" },
  { id: "chronoflex-s", name: "ChronoFlex S", category: "Watches", subcategory: "Smart Watches", brand: "Flash", price: 3299, mrp: 6499, stock: 19, express: true, isNew: true, image: photo("photo-1546868871-7041f2a55e12"), gallery: [photo("photo-1546868871-7041f2a55e12"), photo("photo-1579586337278-3befd40fd17a")], description: "A streamlined wearable for training blocks, sleep, and every notification between.", highlights: ["Bright AMOLED face", "GPS activity modes", "5-day battery", "Magnetic charging"], colors: ["#161616", "#D2D2CD"], sku: "FL-CFS-GRAPH" },
  { id: "halo-classic", name: "Halo Classic Watch", category: "Watches", subcategory: "Analog Watches", brand: "Luxora", price: 2799, mrp: 4999, stock: 22, express: true, image: photo("photo-1524805444758-089113d48a6d"), gallery: [photo("photo-1524805444758-089113d48a6d"), photo("photo-1508057198894-247b23fe5ade")], description: "A minimal dial, polished case, and easy strap for the always-put-together look.", highlights: ["40mm case", "Mineral crystal", "Genuine leather strap", "Quartz movement"], colors: ["#D7C4A0", "#1A1A1A"], sku: "FL-HCW-TAN" },
  { id: "pulse-band", name: "Pulse Training Band", category: "Watches", subcategory: "Fitness Bands", brand: "Boltic", price: 1399, mrp: 2499, stock: 41, express: true, image: photo("photo-1510017803434-a899398421b3"), gallery: [photo("photo-1510017803434-a899398421b3"), photo("photo-1579586337278-3befd40fd17a")], description: "A stripped-back fitness band that keeps the movement stats close.", highlights: ["Step tracking", "Sleep modes", "7-day battery", "Water resistant"], colors: ["#151515", "#E2F800"], sku: "FL-PTB-LIME" },
  { id: "fold-lounge-chair", name: "Fold Lounge Chair", category: "Home & Living", subcategory: "Furniture", brand: "Luxora", price: 6999, mrp: 10999, stock: 7, express: false, isNew: true, image: photo("photo-1505693416388-ac5ce068fe85"), gallery: [photo("photo-1505693416388-ac5ce068fe85"), photo("photo-1555041469-a586c61ea9bc")], description: "A sculptural lounge seat that brings a softer pace to your reading corner.", highlights: ["Powder-coated frame", "Padded seat", "Textured upholstery", "Floor-safe feet"], colors: ["#E6E2D7", "#393A34"], sku: "FL-FLC-CREAM" },
  { id: "cloud-throw", name: "Cloud Grid Throw", category: "Home & Living", subcategory: "Textiles", brand: "Flash", price: 1499, mrp: 2699, stock: 36, express: true, image: photo("photo-1523697991302-3726b9a47ec7"), gallery: [photo("photo-1523697991302-3726b9a47ec7"), photo("photo-1505693416388-ac5ce068fe85")], description: "A soft textured throw designed for the last hour of the day.", highlights: ["Cotton blend", "Generous 150cm length", "Machine washable", "Fringed edge"], colors: ["#EAE7DD", "#5A6244"], sku: "FL-CGT-SAGE" },
  { id: "pulse-brew", name: "Pulse Brew Kettle", category: "Home & Living", subcategory: "Kitchen", brand: "Zapster", price: 2499, mrp: 4299, stock: 17, express: true, image: photo("photo-1517256673644-36ad11246d21"), gallery: [photo("photo-1517256673644-36ad11246d21"), photo("photo-1495474472287-4d71bcdd2085")], description: "A precision kettle for clean pours before the day starts moving.", highlights: ["Variable temperature", "Gooseneck spout", "Quick boil", "Hold temperature mode"], colors: ["#171717", "#E7E5DC"], sku: "FL-PBK-1L" },
  { id: "drift-diffuser", name: "Drift Aroma Diffuser", category: "Home & Living", subcategory: "Wellness", brand: "Luxora", price: 1899, mrp: 3299, stock: 28, express: true, image: photo("photo-1602523961358-f9f03dd557db"), gallery: [photo("photo-1602523961358-f9f03dd557db"), photo("photo-1603006905003-be475563bc59")], description: "A quiet diffuser that resets the room with a single measured mist.", highlights: ["Ultrasonic mist", "Timer modes", "Ambient light", "Auto shut-off"], colors: ["#E9E7DE", "#C8B694"], sku: "FL-DAD-MIST" },
  { id: "citrus-rush", name: "Citrus Rush Body Mist", category: "Beauty", subcategory: "Fragrance", brand: "Flash", price: 699, mrp: 1199, stock: 57, express: true, isNew: true, image: photo("photo-1523293182086-7651a899d37f"), gallery: [photo("photo-1523293182086-7651a899d37f"), photo("photo-1594035910387-fea47794261f")], description: "A bright, quick-refresh body mist with citrus lifted by clean green notes.", highlights: ["100ml mist", "Fresh citrus notes", "Layer-friendly", "Travel-ready cap"], colors: ["#F7DA73", "#F3F0E5"], sku: "FL-CRM-100" },
  { id: "velvet-skin-set", name: "Velvet Skin Reset Kit", category: "Beauty", subcategory: "Skincare", brand: "Luxora", price: 1799, mrp: 3099, stock: 24, express: true, image: photo("photo-1556228578-8c89e6adf883"), gallery: [photo("photo-1556228578-8c89e6adf883"), photo("photo-1556229010-6c3f2c9ca5f8")], description: "A simple three-step routine built around a calm, hydrated finish.", highlights: ["Cleanser + serum + cream", "Barrier-friendly", "AM/PM routine", "Gift-ready set"], colors: ["#F1E9DE", "#A8B64B"], sku: "FL-VSR-SET" },
  { id: "inkline-lip", name: "Inkline Soft Matte Lip", category: "Beauty", subcategory: "Makeup", brand: "Urbanic", price: 599, mrp: 999, stock: 45, express: true, image: photo("photo-1586495777744-4413f21062fa"), gallery: [photo("photo-1586495777744-4413f21062fa"), photo("photo-1598440947619-2c35fc9aa908")], description: "A soft-matte liquid color with a comfortable, stay-put finish.", highlights: ["Weightless texture", "Precision applicator", "Long-wear color", "Non-drying finish"], colors: ["#A84345", "#8F5B54", "#B38B72"], sku: "FL-ISL-RED" },
  { id: "reset-foam-roller", name: "Reset Foam Roller", category: "Sports", subcategory: "Recovery", brand: "Boltic", price: 999, mrp: 1799, stock: 46, express: true, image: photo("photo-1518611012118-696072aa579a"), gallery: [photo("photo-1518611012118-696072aa579a"), photo("photo-1599058917212-d750089bc07e")], description: "A firm textured roller for the reset between hard sessions.", highlights: ["Targeted texture zones", "High-density foam", "Lightweight core", "Easy-clean finish"], colors: ["#171717", "#E2F800"], sku: "FL-RFR-CORE" },
  { id: "motion-kettlebell", name: "Motion Kettlebell 8kg", category: "Sports", subcategory: "Strength", brand: "Boltic", price: 1899, mrp: 3199, stock: 21, express: false, image: photo("photo-1534438327276-14e5300c3a48"), gallery: [photo("photo-1534438327276-14e5300c3a48"), photo("photo-1583454110551-21f2fa2afe61")], description: "A balanced cast-iron kettlebell for compact strength sessions at home.", highlights: ["8kg fixed weight", "Wide grip handle", "Powder-coated finish", "Stable flat base"], colors: ["#1A1A1A"], sku: "FL-MKB-8KG" },
  { id: "stride-bottle", name: "Stride Steel Bottle", category: "Sports", subcategory: "Hydration", brand: "Flash", price: 799, mrp: 1399, stock: 66, express: true, isNew: true, image: photo("photo-1602143407151-7111542de6e8"), gallery: [photo("photo-1602143407151-7111542de6e8"), photo("photo-1526401485004-2fda9f6cfa25")], description: "A durable steel bottle that keeps your pace hydrated without the plastic.", highlights: ["750ml capacity", "Double-wall steel", "Leakproof cap", "Carry loop"], colors: ["#E2F800", "#151515", "#F3F3ED"], sku: "FL-SSB-750" },
  { id: "tempo-resistance-set", name: "Tempo Resistance Set", category: "Sports", subcategory: "Training", brand: "Boltic", price: 1199, mrp: 2099, stock: 39, express: true, image: photo("photo-1517836357463-d25dfeac3438"), gallery: [photo("photo-1517836357463-d25dfeac3438"), photo("photo-1598289431512-b97b0917affc")], description: "Five resistance levels for a full body session in a compact carry pouch.", highlights: ["Five band strengths", "Door anchor", "Handles included", "Carry pouch"], colors: ["#1D1D1B", "#768B00"], sku: "FL-TRS-5" },
  { id: "drift-daypack", name: "Drift Daypack 18L", category: "Accessories", subcategory: "Bags", brand: "Vantage", price: 2299, mrp: 3999, stock: 26, express: true, isNew: true, image: photo("photo-1553062407-98eeb64c6a62"), gallery: [photo("photo-1553062407-98eeb64c6a62"), photo("photo-1500534623283-312aade485b7")], description: "A streamlined daypack with enough room for work, training, and an extra layer.", highlights: ["18L volume", "Padded laptop sleeve", "Water-resistant shell", "Side bottle pocket"], colors: ["#1B1B1B", "#6E7D46"], sku: "FL-DDP-18" },
  { id: "signal-sunglasses", name: "Signal Frame Sunglasses", category: "Accessories", subcategory: "Eyewear", brand: "Urbanic", price: 1499, mrp: 2599, stock: 32, express: true, image: photo("photo-1511499767150-a48a237f0083"), gallery: [photo("photo-1511499767150-a48a237f0083"), photo("photo-1508296695146-257a814070b4")], description: "A sharp rectangular frame that brings an immediate finish to the look.", highlights: ["UV400 lenses", "Lightweight acetate", "Hard case included", "Polarized finish"], colors: ["#161616", "#C6A970"], sku: "FL-SFS-BLK" },
  { id: "loop-cable-kit", name: "Loop Cable Kit", category: "Accessories", subcategory: "Tech Organizers", brand: "Zapster", price: 899, mrp: 1599, stock: 54, express: true, image: photo("photo-1551033406-611cf9a28f67"), gallery: [photo("photo-1551033406-611cf9a28f67"), photo("photo-1505740420928-5e560c06d30e")], description: "A compact organizer that stops the small tech essentials from wandering.", highlights: ["Elastic cable loops", "Zip enclosure", "Water-resistant shell", "Pocket-friendly size"], colors: ["#202020", "#B9C88B"], sku: "FL-LCK-OBS" },
  { id: "arc-card-holder", name: "Arc Card Holder", category: "Accessories", subcategory: "Wallets", brand: "Flash", price: 699, mrp: 1299, stock: 61, express: true, image: photo("photo-1627123424574-724758594e93"), gallery: [photo("photo-1627123424574-724758594e93"), photo("photo-1622831617330-89e2d40b8e5c")], description: "A slim everyday card holder with a clean pull-tab and a low-profile build.", highlights: ["Six card slots", "Pull-tab pocket", "Vegan leather", "RFID lining"], colors: ["#1A1A1A", "#AD8E5C"], sku: "FL-ACH-BLK" },
  {
    id: "hl-1",
    name: "AuraDesk Smart Lamp",
    category: "Home & Living",
    subcategory: "Lighting",
    brand: "Lumicore",
    price: 3499,
    mrp: 5999,
    stock: 14,
    express: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Minimalist ambient LED desk lamp with touch dimming and wireless Qi charging base.",
    highlights: ["Minimalist ambient LED", "Touch dimming", "Wireless Qi charging base", "Eye-comfort LED array"],
    colors: ["#0F1115", "#F4F4F5"],
    sku: "FL-HL1-LAMP"
  },
  {
    id: "hl-2",
    name: "Nordic Ceramic Diffuser",
    category: "Home & Living",
    subcategory: "Wellness",
    brand: "Botanic",
    price: 1899,
    mrp: 3299,
    stock: 22,
    express: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultrasonic aroma diffuser with matte ceramic stone finish and warm ambient glow.",
    highlights: ["Ultrasonic misting", "Matte ceramic finish", "Warm ambient glow", "Auto shut-off sensor"],
    colors: ["#9CA3AF", "#D1D5DB"],
    sku: "FL-HL2-DIFF"
  },
  {
    id: "hl-3",
    name: "Minimal Ergonomic Seat Cushion",
    category: "Home & Living",
    subcategory: "Furniture",
    brand: "Vantage",
    price: 2199,
    mrp: 3999,
    stock: 19,
    express: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Memory foam posture cushion with breathable honeycomb mesh and obsidian cover.",
    highlights: ["Memory foam core", "Honeycomb mesh", "Obsidian cover", "Lumbar support"],
    colors: ["#1E2024", "#CCFF00"],
    sku: "FL-HL3-CUSH"
  },
];

export const products: Product[] = productSeed.map((product, index) => ({ ...product, gallery: fourAngles(index, product.gallery) }));

export const getProduct = (id?: string) => products.find((product) => product.id === id);
export const getProductVariant = (product: Product, color?: string) => product.variants?.find((variant) => variant.color === color) ?? product.variants?.[0];
export const getProductGallery = (product: Product, color?: string) => getProductVariant(product, color)?.gallery ?? product.gallery;
export const getDiscount = (product: Product) => Math.round(((product.mrp - product.price) / product.mrp) * 100);
export const formatINR = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
