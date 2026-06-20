/**
 * Seed script for the 3legant e-commerce app.
 *
 * Populates the MongoDB Atlas database with realistic, relationally-consistent
 * fake data across every collection the app uses:
 *   categories, products, users, orders, cart, slider-section
 *
 * Notes:
 *  - The app uses the native MongoDB driver (no Mongoose). Document shapes here
 *    mirror exactly what the API routes in src/pages/api/* read & write.
 *  - There is no "reviews" collection in this project; product ratings live on
 *    cart.info[].rating, so reviews are represented through the cart collection.
 *  - The committed .env has a duplicated prefix bug
 *    (MONGODB_URI=MONGODB_URI=mongodb+srv://...). We parse .env ourselves and
 *    strip the stray prefix before connecting.
 *
 * Run:  node seed.js
 */

const fs = require("fs");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

// Database to seed (per project decision). The app reads MONGODB_DB=e-commerce,
// so to view this data in the running app set MONGODB_DB=3legant.
const TARGET_DB = "3legant";
const DEV_PASSWORD = "Password123";

// --- .env parsing -----------------------------------------------------------

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  const raw = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    env[key] = value;
  }
  return env;
}

function getMongoUri(env) {
  let uri = env.MONGODB_URI || "";
  // Fix the duplicated-prefix bug: "MONGODB_URI=mongodb+srv://..."
  uri = uri.replace(/^MONGODB_URI=/, "").trim();
  if (!uri.startsWith("mongodb")) {
    throw new Error(`Could not parse a valid MONGODB_URI from .env (got: "${uri.slice(0, 30)}...")`);
  }
  return uri;
}

// --- small helpers ----------------------------------------------------------

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const sample = (arr, n) => {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(rand(0, copy.length - 1), 1)[0]);
  }
  return out;
};
const money = (n) => Math.round(n * 100) / 100;

// Unsplash image helper (stable photo IDs, sized).
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

// --- static, realistic data -------------------------------------------------

const CATEGORIES = [
  { name: "Living Room", image: img("1567016432779-094069958ea5") },
  { name: "Bedroom", image: img("1505693416388-ac5ce068fe85") },
  { name: "Kitchen", image: img("1556909212-d5b604d0c90d") },
  { name: "Lighting", image: img("1513506003901-1e6a229e2d15") },
  { name: "Office", image: img("1497366216548-37526070297c") },
  { name: "Outdoor", image: img("1600210492486-724fe5c67fb0") },
];

// products grouped by category name; each has discounted price < original
const PRODUCTS_BY_CATEGORY = {
  "Living Room": [
    { name: "Loveseat Sofa", price: 199.0, was: 400.0, image: img("1567016432779-094069958ea5"), description: "A compact two-seater sofa upholstered in soft linen, with sturdy oak legs and deep cushioning for all-day comfort." },
    { name: "Velvet Accent Chair", price: 149.0, was: 220.0, image: img("1586023492125-27b2c045efd7"), description: "Plush velvet accent chair with a curved back and brass-finished legs — a statement piece for any corner." },
    { name: "Coffee Table Oak", price: 89.0, was: 130.0, image: img("1533090481720-856c6e3c1fdc"), description: "Minimalist solid-oak coffee table with a lower shelf for books and a hand-rubbed natural finish." },
    { name: "Modular Bookshelf", price: 175.0, was: 250.0, image: img("1594620302200-9a762244a156"), description: "Five-tier modular bookshelf in matte black steel and engineered wood, easy to assemble and reconfigure." },
  ],
  "Bedroom": [
    { name: "Upholstered Bed Frame", price: 459.0, was: 650.0, image: img("1505693416388-ac5ce068fe85"), description: "Queen-size upholstered bed frame with a tall tufted headboard and a slatted base — no box spring needed." },
    { name: "Nightstand Walnut", price: 99.0, was: 140.0, image: img("1532372320572-cda25615339b"), description: "Two-drawer walnut nightstand with soft-close runners and tapered mid-century legs." },
    { name: "Linen Duvet Set", price: 79.0, was: 110.0, image: img("1522771739844-6a9f6d5f14af"), description: "Stonewashed pure-linen duvet cover set, breathable and softer with every wash. Includes two pillow shams." },
    { name: "Full-Length Mirror", price: 119.0, was: 160.0, image: img("1618220179428-22790b461013"), description: "Floor-standing full-length mirror with a slim aluminum frame; lean it or mount it." },
  ],
  "Kitchen": [
    { name: "Ceramic Dinnerware Set", price: 64.0, was: 95.0, image: img("1556909212-d5b604d0c90d"), description: "16-piece stoneware dinnerware set in a warm matte glaze, dishwasher and microwave safe." },
    { name: "Stainless Cookware Set", price: 189.0, was: 270.0, image: img("1584990347449-a2d4c2c8c8c8"), description: "Tri-ply stainless steel cookware set with riveted handles and tempered glass lids — induction ready." },
    { name: "Acacia Cutting Board", price: 34.0, was: 50.0, image: img("1594041680534-e8c8cdebd659"), description: "End-grain acacia wood cutting board with juice groove and built-in handles." },
    { name: "Pour-Over Coffee Set", price: 49.0, was: 70.0, image: img("1495474472287-4d71bcdd2085"), description: "Glass pour-over carafe with a reusable stainless filter and cork collar — barista-quality at home." },
  ],
  "Lighting": [
    { name: "Arc Floor Lamp", price: 129.0, was: 180.0, image: img("1513506003901-1e6a229e2d15"), description: "Sweeping arc floor lamp with a brushed-brass stem and a marble base; perfect over a reading chair." },
    { name: "Pendant Light Globe", price: 69.0, was: 95.0, image: img("1524758631624-e2822e304c36"), description: "Frosted-glass globe pendant with a matte black canopy — warm, even, diffused light." },
    { name: "Table Lamp Linen", price: 54.0, was: 80.0, image: img("1507473885765-e6ed057f782c"), description: "Ceramic table lamp with a natural linen drum shade and an inline dimmer switch." },
    { name: "LED Desk Lamp", price: 39.0, was: 60.0, image: img("1507003211169-0a1dd7228f2d"), description: "Adjustable LED desk lamp with three color temperatures, touch controls, and a USB charging port." },
  ],
  "Office": [
    { name: "Ergonomic Office Chair", price: 229.0, was: 320.0, image: img("1497366216548-37526070297c"), description: "Mesh-back ergonomic office chair with adjustable lumbar support, armrests, and a synchro-tilt mechanism." },
    { name: "Standing Desk", price: 349.0, was: 480.0, image: img("1518455027359-f3f8164ba6bd"), description: "Electric height-adjustable standing desk with a bamboo top and programmable memory presets." },
    { name: "Desk Organizer Set", price: 29.0, was: 45.0, image: img("1524995997946-a1c2e315a42f"), description: "Five-piece felt and wood desk organizer set to keep stationery, cables, and devices tidy." },
    { name: "Task Floor Mat", price: 44.0, was: 65.0, image: img("1505691938895-1758d7feb511"), description: "Anti-fatigue standing mat with beveled edges and a non-slip base for long working sessions." },
  ],
  "Outdoor": [
    { name: "Patio Lounge Chair", price: 159.0, was: 230.0, image: img("1600210492486-724fe5c67fb0"), description: "Weather-resistant rattan lounge chair with quick-dry cushions and a powder-coated frame." },
    { name: "Folding Bistro Set", price: 119.0, was: 170.0, image: img("1600585154340-be6161a56a0c"), description: "Two-chair folding bistro set in acacia wood, ideal for balconies and small patios." },
    { name: "Outdoor String Lights", price: 24.0, was: 38.0, image: img("1530043867251-b2d3e6c0c8b1"), description: "48ft weatherproof LED string lights with 24 shatterproof bulbs for warm outdoor ambiance." },
    { name: "Hammock with Stand", price: 139.0, was: 200.0, image: img("1520038410233-7141be7e6f97"), description: "Quilted double hammock with a freestanding steel frame — assembles in minutes, no trees required." },
  ],
};

const USERS = [
  { name: "Admin User", username: "admin", email: "admin@gmail.com", phone: "+1-202-555-0100" },
  { name: "Olivia Martin", username: "oliviam", email: "olivia.martin@gmail.com", phone: "+1-202-555-0111" },
  { name: "Liam Johnson", username: "liamj", email: "liam.johnson@gmail.com", phone: "+1-202-555-0122" },
  { name: "Emma Williams", username: "emmaw", email: "emma.williams@outlook.com", phone: "+1-202-555-0133" },
  { name: "Noah Brown", username: "noahb", email: "noah.brown@gmail.com", phone: "+1-202-555-0144" },
  { name: "Ava Jones", username: "avaj", email: "ava.jones@yahoo.com", phone: "+1-202-555-0155" },
  { name: "William Garcia", username: "willg", email: "william.garcia@gmail.com", phone: "+1-202-555-0166" },
  { name: "Sophia Miller", username: "sophiam", email: "sophia.miller@outlook.com", phone: "+1-202-555-0177" },
  { name: "James Davis", username: "jamesd", email: "james.davis@gmail.com", phone: "+1-202-555-0188" },
  { name: "Isabella Rodriguez", username: "isabellar", email: "isabella.rodriguez@gmail.com", phone: "+1-202-555-0199" },
  { name: "Benjamin Wilson", username: "benw", email: "benjamin.wilson@yahoo.com", phone: "+1-202-555-0200" },
  { name: "Mia Anderson", username: "miaa", email: "mia.anderson@gmail.com", phone: "+1-202-555-0211" },
];

const ADDRESSES = [
  { street: "742 Evergreen Terrace", city: "Springfield", state: "IL", country: "USA", zipCode: "62704" },
  { street: "221B Baker Street", city: "Brooklyn", state: "NY", country: "USA", zipCode: "11201" },
  { street: "1600 Amphitheatre Pkwy", city: "Mountain View", state: "CA", country: "USA", zipCode: "94043" },
  { street: "350 Fifth Avenue", city: "New York", state: "NY", country: "USA", zipCode: "10118" },
  { street: "1 Infinite Loop", city: "Cupertino", state: "CA", country: "USA", zipCode: "95014" },
  { street: "500 Terry A Francois Blvd", city: "San Francisco", state: "CA", country: "USA", zipCode: "94158" },
  { street: "233 S Wacker Drive", city: "Chicago", state: "IL", country: "USA", zipCode: "60606" },
  { street: "400 Broad Street", city: "Seattle", state: "WA", country: "USA", zipCode: "98109" },
  { street: "2800 E Observatory Rd", city: "Los Angeles", state: "CA", country: "USA", zipCode: "90027" },
  { street: "11 Wall Street", city: "New York", state: "NY", country: "USA", zipCode: "10005" },
  { street: "600 Congress Ave", city: "Austin", state: "TX", country: "USA", zipCode: "78701" },
  { street: "1201 Brickell Ave", city: "Miami", state: "FL", country: "USA", zipCode: "33131" },
];

const SLIDER_IMAGES = [
  { url: img("1567016432779-094069958ea5"), alt: "Modern living room collection" },
  { url: img("1505693416388-ac5ce068fe85"), alt: "Cozy bedroom essentials" },
  { url: img("1513506003901-1e6a229e2d15"), alt: "Designer lighting sale" },
  { url: img("1497366216548-37526070297c"), alt: "Work-from-home office picks" },
];

const SHIPPING_TYPES = ["Free", "Express", "Pickup"];
const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];
const PAYMENT_METHODS = ["credit-card", "paypal", "cash-on-delivery"];

// --- main -------------------------------------------------------------------

async function main() {
  const env = loadEnv();
  const uri = getMongoUri(env);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(TARGET_DB);
    console.log(`Connected. Seeding database: "${TARGET_DB}"\n`);

    const collections = ["categories", "products", "users", "orders", "cart", "slider-section"];

    // 1. Wipe
    for (const name of collections) {
      await db.collection(name).deleteMany({});
    }
    console.log("Cleared existing documents in all target collections.");

    const now = new Date();

    // 2. Categories
    const categoryDocs = CATEGORIES.map((c) => ({
      _id: new ObjectId(),
      name: c.name,
      image: c.image,
      createdAt: now,
      updatedAt: now,
    }));
    await db.collection("categories").insertMany(categoryDocs);
    const categoryByName = Object.fromEntries(categoryDocs.map((c) => [c.name, c]));

    // 3. Products
    const productDocs = [];
    for (const [catName, items] of Object.entries(PRODUCTS_BY_CATEGORY)) {
      const category = categoryByName[catName];
      for (const p of items) {
        productDocs.push({
          _id: new ObjectId(),
          name: p.name,
          image: p.image,
          price: money(p.price),
          categoryId: category._id,
          description: p.description,
          PriceBeforeDiscount: money(p.was),
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    await db.collection("products").insertMany(productDocs);

    // 4. Users (bcrypt-hashed password, with address)
    const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);
    const userDocs = USERS.map((u, i) => ({
      _id: new ObjectId(),
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone,
      password: passwordHash,
      image: null,
      address: ADDRESSES[i % ADDRESSES.length],
    }));
    await db.collection("users").insertMany(userDocs);

    // 5. Orders (reference users + products)
    const orderDocs = [];
    for (let i = 0; i < 18; i++) {
      const user = pick(userDocs);
      const chosen = sample(productDocs, rand(1, 4));
      const items = chosen.map((prod) => {
        const quantity = rand(1, 3);
        const price = prod.price;
        return { productId: prod._id, quantity, price, total: money(price * quantity) };
      });
      const subTotal = money(items.reduce((s, it) => s + it.total, 0));
      const shippingType = pick(SHIPPING_TYPES);
      const shippingCost = shippingType === "Express" ? 15 : 0;
      const total = money(subTotal + shippingCost);
      const [firstName, ...rest] = user.name.split(" ");
      const lastName = rest.join(" ") || firstName;
      const method = pick(PAYMENT_METHODS);
      const paymentMethod =
        method === "credit-card"
          ? { method, cardNumber: `4242 4242 4242 ${rand(1000, 9999)}`, expirationDate: `${String(rand(1, 12)).padStart(2, "0")}/2${rand(7, 9)}`, cvc: String(rand(100, 999)) }
          : { method };
      // spread createdAt over the last ~90 days
      const createdAt = new Date(now.getTime() - rand(0, 90) * 24 * 60 * 60 * 1000);

      orderDocs.push({
        _id: new ObjectId(),
        userId: user._id,
        orderCode: "ORDER-" + rand(100000, 999999),
        contactInfo: { firstName, lastName, phone: user.phone, email: user.email },
        shippingAddress: user.address,
        paymentMethod,
        items,
        shoppingandTotal: { shippingType, subTotal: String(subTotal), Total: String(total) },
        status: pick(ORDER_STATUSES),
        createdAt,
      });
    }
    await db.collection("orders").insertMany(orderDocs);

    // 6. Cart (one per user) — also serves as the "reviews" via per-item rating
    const cartDocs = userDocs.map((user) => {
      const chosen = sample(productDocs, rand(3, 6));
      return {
        _id: new ObjectId(),
        userId: user._id,
        info: chosen.map((prod) => ({
          productId: prod._id,
          quantity: rand(1, 3),
          isFavourite: Math.random() < 0.4,
          rating: rand(1, 5),
        })),
      };
    });
    await db.collection("cart").insertMany(cartDocs);

    // 7. Slider section (singleton)
    const sliderImages = SLIDER_IMAGES.map((s) => ({
      id: new ObjectId(),
      url: s.url,
      alt: s.alt,
      createdAt: now,
      updatedAt: now,
    }));
    await db.collection("slider-section").insertOne({
      _id: new ObjectId(),
      images: sliderImages,
      createdAt: now,
      updatedAt: now,
    });

    // 8. Summary
    const totalRatings = cartDocs.reduce((s, c) => s + c.info.length, 0);
    console.log("\n=== Seed complete — documents per collection ===");
    for (const name of collections) {
      const count = await db.collection(name).countDocuments();
      console.log(`  ${name.padEnd(16)} ${count}`);
    }
    console.log(`\n  product ratings (cart.info[].rating, our "reviews"): ${totalRatings}`);
    console.log(`\nDev login for any seeded user — password: "${DEV_PASSWORD}"`);
    console.log(`Admin account: admin@gmail.com / ${DEV_PASSWORD}`);
    console.log(`\nNote: data was seeded into DB "${TARGET_DB}". The app reads MONGODB_DB=${env.MONGODB_DB || "(unset)"};`);
    console.log(`set MONGODB_DB=${TARGET_DB} to see this data in the running app.`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("\nSeed failed:", err);
  process.exit(1);
});
