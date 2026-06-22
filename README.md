
---

# 📁 Project Folder Structure (MERN Stack)

```text id="p8xk2m"
client/
│
└── src/
    │
    ├── assets/                 # Images, Icons, Logos
    │
    ├── components/            # Reusable UI Components
    │   ├── ui/                # Core UI (Button, Input, Loader, Modal)
    │   ├── common/            # Layout components (Navbar, Footer, Notifications)
    │   └── cards/             # Feature Cards (DoctorCard, MedicineCard)
    │
    ├── constants/             # Static data (Services, Emergency contacts, etc.)
    │
    ├── context/               # Global state (AuthContext, CartContext)
    │
    ├── hooks/                 # Custom hooks (useAuth, useLocalStorage)
    │
    ├── layouts/               # Layout wrappers (MainLayout, AuthLayout)
    │
    ├── pages/                 # Application pages
    │   ├── auth/              # Login, Signup, Forgot Password, Splash
    │   ├── main/              # Home, Doctors, Appointment, Medicine, Lab, Blog, Contact
    │
    ├── routes/                # Routing + Protected routes
    │
    ├── services/              # API calls (Axios setup, endpoints)
    │
    └── utils/                 # Helper functions (validators, formatters)

------------------------------------------------------------

server/                     # Node.js Backend
│
├── config/                # Database connection & config files
├── controllers/           # Business logic (API logic)
├── middlewares/           # Auth middleware, error handling
├── models/                # MongoDB schemas (Mongoose models)
├── routes/                # API route definitions
├── utils/                 # Helper functions (JWT, password hashing)
│
├── .env                   # Environment variables (DO NOT PUSH TO GITHUB)
├── server.js              # Main entry point
└── package.json           # Backend dependencies
```

---

# Important Notes (for README)

```text id="q3l9vn"
- .env file must NEVER be pushed to GitHub
- All API calls should be handled via services/ folder
- Components must be reusable and modular
- Backend follows MVC architecture (Model - Controller - Route)
- Global state is managed using Context API / Redux Toolkit
- Code must follow consistent naming conventions
```

---

