📁 src/
├── 🏠 app/
│ ├── 🔐 (auth)/ # Authentication group routes
│ │ ├── 🔑 SignIn/
│ │ └── 📝 SignUp/
│ │
│ ├── 👤 (user)/ # User routes group
│ │ ├── 🏠 page.tsx # Home page
│ │ ├── 🛍️ products/
│ │ ├── 🛒 cart/
│ │ ├── 💳 checkout/
│ │ ├── 📦 orders/
│ │ └── 👤 profile/
│ │
│ ├── 👑 (admin)/ # Admin routes group
│ │ ├── 📊 dashboard/
│ │ ├── 📦 products/
│ │ ├── 📋 orders/
│ │ ├── 👥 customers/
│ │ └── ⚙️ settings/
│ │
│ └── 🏗️ layout.tsx # Root layout
│
├── 🧩 components/ # Reusable components
│ ├── 🎨 ui/ # UI components (shadcn/ui)
│ ├── 🔄 common/ # Shared components
│ │ ├── 🏷️ Header/
│ │ ├── 🦶 Footer/
│ │ └── 🧭 Navigation/
│ ├── 📝 forms/ # Form components
│ ├── 👑 admin/ # Admin-specific components
│ └── 👤 user/ # User-specific components
│
├── 🚀 pages - api/ # API routes
│ ├── 🔐 auth/
│ ├── 📦 products/
│ ├── 📋 orders/
│ ├── 🛒 cart/
│ └── 🔔 webhook/
│
├── 🛠️ lib/ # Utility functions and configurations
│ ├── 🔐 auth.ts # NextAuth configuration
│ ├── 🔧 utils.ts # Utility functions
│ ├── 🗄️ db.ts # Database connection utility
│ └── 🌐 api.ts # API utility functions (e.g., fetch wrapper)
│
├── 🎣 hooks/ # Custom React hooks
│ ├── 🛒 useCart.ts
│ ├── 🔐 useAuth.ts
│ └── 🎨 useTheme.ts
│
├── 📊 constants/ # Application-wide constants
│ ├── 🛣️ routes.ts
│ ├── 🔗 api-endpoints.ts
│ └── ⚙️ config.ts
│
├── 🧠 context/ # React Context providers
│ ├── 🛒 cart-context.tsx
│ ├── 🔐 auth-context.tsx
│ └── 🎨 theme-context.tsx
│
├── 📝 types/ # TypeScript type definitions
│ ├── 📦 product.ts
│ ├── 📋 order.ts
│ └── 👤 user.ts
│
├── 🛠️ services/ # Business logic services
│ ├── 📦 product.service.ts
│ ├── 📋 order.service.ts
│ └── 👤 user.service.ts
│
└── 🚦 middleware.ts # Next.js middleware for auth & routing

>
>
> admin password
> email : admin@gmail.com
> password : admin123456
>
> user password
> email : 142536789
> password : 142536789
>
> email : 123456789
> password : 123456789
>
>
> email : testraouf12@mozej.com
> password :testraouf12@mozej.com


>
>
> this is two page the first when user select on categories , send to the product page as context api , to open it ,
> change this structure , when the user select on category , send the nameof this category in url , then open the info
> of
> this product in another page , take care , make the structure withe material ui and handle the light ad dark page
> using
> next theme , and separate it as many comp not all code , in same page , and handle ">  are you have any suggestion for
> enhance the performance and seo or applicability and best practice and use mater ,,, handle this page firstly ""


> handle the light and dark mode as variable based on the global.css, use it as variable not static color code
> animation
> loading
> any
>

> handle the ui & material ui and responsive and light and dark mood  
> handle the functionality
> loading for each page
> enhance the performance and seo and applicability and best practice
> handle the animation
>
> remove console.log
> improve the api, and disappear the critical variables

> Responsive
>
> Home , Shop , Categories , Contact Us , Cart , View Cart , My Account , Login , Register , Header , footer
>
>
>
>
>
>
>

- handle the light and dark mood
- handle the structure of pages
  -handle the cases of view admin without save on database

- plan for the tomorrow

Unfortunately, I cannot directly create or provide images. However, I can guide you on how to design each page and
suggest tools or platforms where you can create these designs yourself. Here's how you can create visual examples for
each page:

Tools to Create Dashboard Designs
Figma (Free for personal use):

Use pre-built UI kits like Material Design, Tailwind UI, or Ant Design to quickly create dashboard layouts.

Figma is collaborative and allows you to prototype interactions.

Adobe XD:

Great for creating high-fidelity designs with animations and transitions.

Canva:

Use Canva’s templates for dashboard designs (search for "admin dashboard" templates).

Sketch:

Popular among designers for creating detailed UI designs.

Online Tools:

Balsamiq for wireframes.

Lucidchart for flowcharts and layouts.

Design Examples for Each Page
Below, I’ll describe how to design each page visually using these tools:

1️⃣ Dashboard Overview Page (Home)
Layout:

Top Section: Place 4-6 statistics cards in a grid (2x2 or 3x2).

Middle Section: Add two charts (e.g., a line chart for sales trends and a bar chart for user growth).

Bottom Section: Use a table or cards for Recent Orders, Recent Reviews, and New Users.

Visual Style:

Use a dark sidebar with light content for contrast.

Add icons (e.g., a shopping cart for orders, a user icon for new users).

Use soft shadows and rounded corners for cards.

2️⃣ Products Management Page
Layout:

Top Section: Add a search bar with filters (e.g., by name, category, price).

Middle Section: Display a table with product details (Name, Price, Category, Stock, Actions).

Bottom Section: Add a floating button for "Add New Product."

Visual Style:

Use a minimal table design with alternating row colors.

Add hover effects on table rows.

Use a modal popup for the "Add New Product" form.

3️⃣ Categories Management Page
Layout:

Top Section: Add a search bar and a button for "Add New Category."

Middle Section: Display a table or grid of categories (Name, Image, Number of Products, Actions).

Visual Style:

Use cards for each category with an image preview.

Add edit and delete icons in the actions column.

4️⃣ Orders Management Page
Layout:

Top Section: Add a search bar with filters (e.g., by order ID, status, date).

Middle Section: Display a table with order details (Order ID, Customer, Total Amount, Status, Actions).

Bottom Section: Add a dropdown to update order status.

Visual Style:

Use badges for order status (e.g., green for "Delivered," yellow for "Pending").

Add a modal popup for order details.

5️⃣ Users Management Page
Layout:

Top Section: Add a search bar and a button for "Add New User."

Middle Section: Display a table with user details (Name, Email, Role, Status, Actions).

Visual Style:

Use toggle switches for banning/unbanning users.

Add a modal popup for editing user roles.

6️⃣ Reviews Management Page
Layout:

Top Section: Add a search bar with filters (e.g., by product, rating).

Middle Section: Display a table with review details (Product, User, Rating, Comment, Status, Actions).

Visual Style:

Use star icons for ratings.

Add approve/reject buttons with color-coded labels.

7️⃣ Cart Management Page (Optional)
Layout:

Top Section: Add a search bar to filter by user.

Middle Section: Display a table with cart details (User, Number of Items, Total Price, Actions).

Visual Style:

Use a modal popup to view cart details.

Add a delete icon to remove items.

8️⃣ Slider Section Management Page
Layout:

Top Section: Add a button for "Add New Slide."

Middle Section: Display a table or grid of slider images (Image, Alt Text, Actions).

Visual Style:

Use image thumbnails for preview.

Add edit and delete icons in the actions column.

9️⃣ Settings Page
Layout:

Top Section: Add tabs for different settings (General, Email, Security, Payment, Shipping).

Middle Section: Display forms for each setting.

Visual Style:

Use input fields, dropdowns, and toggle switches.

Add a save button at the bottom of each form.

🔟 Analytics & Reports Page (Optional)
Layout:

Top Section: Add tabs for different reports (Sales, Users, Products).

Middle Section: Display charts and tables for each report.

Visual Style:

Use interactive charts (e.g., line charts, bar charts, pie charts).

Add an export button for downloading reports.

Where to Find Inspiration
Dribbble: Search for "admin dashboard" or "e-commerce dashboard" for design inspiration.

Behance: Look for UI/UX designers who specialize in dashboards.

ThemeForest: Purchase pre-built admin dashboard templates (e.g., Material Dashboard, Bootstrap Admin Templates).

If you need help with specific design elements or tools, let me know! 🚀


