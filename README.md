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
> email : HIHICaptain@gmail.com
> password : HIHICaptain@gmail.com
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