# 3legant — Full-Stack E-Commerce Platform

A modern, full-stack furniture & home-goods store built with **Next.js 14 (App Router)**,
**TypeScript**, **MongoDB**, and **Material UI**. It ships with a complete customer storefront
and a separate admin dashboard for managing products, categories, orders, and homepage content.

> **Demo login (after seeding):** `admin@gmail.com` / `Password123`

---

## ✨ Features

### Storefront (customer)
- Home page with hero slider, category showcase, new arrivals, and newsletter
- Product catalog with search, price/category filters, and grid/list views
- Category browsing and product detail pages with ratings & related products
- Cart with a 3-step checkout wizard (cart → details → confirmation)
- User account: profile, saved address, and order history
- Contact page with EmailJS-powered form and map
- Light / dark theme toggle (persisted)

### Admin dashboard
- KPI overview (orders, users, products, revenue) with top products & recent orders
- CRUD for **products**, **categories**, and homepage **slider** images
- Order management with status updates
- Cloudinary-backed image uploads

---

## 🧱 Tech Stack

| Area | Technology |
|------|-----------|
| Framework | Next.js 14 (App Router) + React 18 |
| Language | TypeScript |
| UI | Material UI v5, Tailwind CSS, Framer Motion |
| Database | MongoDB (native driver) on MongoDB Atlas |
| Auth | NextAuth.js (credentials) + bcrypt |
| State / data | React Context, React Query |
| Media | Cloudinary (uploads), next/image |
| Email | EmailJS |
| Theming | next-themes + CSS design tokens |

---

## 🎨 Design system

Brand colors and surfaces are centralized as CSS variables (design tokens) in
[`src/app/globals.css`](src/app/globals.css) — a deep-green primary on a neutral ink base, with
fully tuned **light and dark** palettes plus semantic and order-status tokens. Components
reference `var(--primary)`, `var(--foreground)`, `var(--surface)`, etc. rather than hardcoded
hex values, and Tailwind utilities are mapped to the same tokens in
[`tailwind.config.ts`](tailwind.config.ts).

All imagery renders through a single primitive,
[`AppImage`](src/components/common/ui/AppImage.tsx), which locks a consistent aspect ratio and
applies `object-fit: cover`, so product/category cards never stretch or distort.

---

## 📁 Project structure

```
src/
├─ app/                      # Next.js App Router
│  ├─ (auth)/                # signin, signup
│  ├─ user/                  # storefront: home, shop, categories, viewcart, useraccount, contactus
│  ├─ admin/                 # dashboard: home, products, categories, orders, slider-section
│  ├─ globals.css            # design tokens (light + dark) + base styles
│  └─ layout.tsx             # root layout (providers, theme, toasts)
├─ pages/api/                # REST API routes + NextAuth
│  ├─ products.ts  categories.ts  orders.ts  user.ts  addtocart.ts  slidersection.ts
│  └─ auth/[...nextauth].ts
├─ components/               # shared UI (Header, Footer, AppImage, loaders, dialogs)
├─ context/                  # React Context providers (cart, products, categories, user, theme…)
└─ lib/mongodb.ts            # MongoClient connection helper
seed.js                      # database seeding script (see below)
```

---

## 🗄️ Data model

The app uses the native MongoDB driver against these collections:

| Collection | Purpose | Key fields |
|------------|---------|-----------|
| `categories` | Product categories | name, image, timestamps |
| `products` | Catalog | name, image, price, `categoryId`, PriceBeforeDiscount, description |
| `users` | Accounts | name, username, email, phone, password (bcrypt), image |
| `orders` | Orders | userId, orderCode, contactInfo, shippingAddress, paymentMethod, items[], totals, status |
| `cart` | Per-user cart | userId, info[] (productId, quantity, isFavourite, rating) |
| `slider-section` | Homepage hero images | images[] (url, alt, timestamps) |

Relationships: `products.categoryId → categories._id`; `orders.userId` / `cart.userId →
users._id`; `orders.items[].productId` / `cart.info[].productId → products._id`.

---

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (MongoDB Atlas recommended)

### 1. Clone & install

```bash
git clone https://github.com/MohamedAbdEl-Rauof/E-Commerce-Platform.git
cd E-Commerce-Platform

# This project has a known MUI peer-dependency conflict (@mui/lab vs @mui/material),
# so install with legacy peer resolution:
npm install --legacy-peer-deps
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/3legant?appName=Cluster0
MONGODB_DB=3legant

NEXTAUTH_SECRET=<generate-a-random-secret>
ADMIN_EMAIL=admin@gmail.com
JWT_EXPIRATION=1h

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

# EmailJS (contact form) — public keys
NEXT_PUBLIC_EMAILJS_SERVICE_ID=<service-id>
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<template-id>
NEXT_PUBLIC_EMAILJS_USER_ID=<user-id>
```

> The app selects its database via `MONGODB_DB`. Make sure it matches the database you seed.
> Any account whose email equals `ADMIN_EMAIL` is granted the **admin** role.

### 3. Seed sample data (optional but recommended)

`seed.js` populates every collection with realistic, relationally-consistent data
(categories, 24 products with Unsplash imagery, users, orders, carts, and slider images).

```bash
node seed.js
```

All seeded users share the password **`Password123`** (bcrypt-hashed), including the admin
account `admin@gmail.com`.

### 4. Run

```bash
npm run dev      # start the dev server at http://localhost:3000
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `node seed.js` | Seed the database with sample data |

---

## ☁️ Deployment

Deploy on **Vercel** (recommended for Next.js):

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add all `.env` variables in **Project → Settings → Environment Variables**.
4. Deploy.

Ensure your MongoDB Atlas cluster allows connections from Vercel (IP allowlist `0.0.0.0/0`
for serverless, or use Atlas's recommended settings).

---

## 🔒 Security notes

- Never commit a real `.env` — keep credentials out of version control and rotate any that
  were ever exposed.
- Passwords are hashed with bcrypt; authentication is handled by NextAuth.js.

---

## 📄 License

This project is provided for educational/portfolio purposes.
