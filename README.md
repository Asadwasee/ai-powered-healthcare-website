client/
src/
├── assets/             # Images, Icons, Logos
├── components/         # Atom & Reusable UI Components
│   ├── ui/             # Core UI (Button, Input, Loader, Modal)
│   ├── common/         # Layout specific (Navbar, Footer, Notification)
│   └── cards/          # Contextual Cards (DoctorCard, MedicineCard)
├── constants/          # Static Data arrays (Services list, Emergency contacts)
├── context/            # Global Context State (AuthContext, CartContext)
├── hooks/              # Custom React Hooks (useAuth, useLocalStorage)
├── layouts/            # Shared structural layouts (MainLayout, AuthLayout)
├── pages/              # Individual Page components 
│   ├── auth/           # Login, Signup, ForgotPassword, Splash
│   ├── main/           # Home, Doctors, Appointment, Medicine, Lab, Blog, Contact
├── routes/             # App routing engine & Guards
├── services/           # Axios config and endpoint definitions
└── utils/              # Helper utilities (date formatters, validators)
server/                 # Node.js Backend
│   ├── config/             # Database & Config files
│   ├── controllers/        # Business Logic for Routes
│   ├── middlewares/        # Auth & Error middlewares
│   ├── models/             # MongoDB Mongoose Schemas
│   ├── routes/             # Express Route Definitions
│   ├── utils/              # Helper functions (JWT helpers)
│   ├── .env                # Backend Environment Variables
│   ├── server.js           # Entry Point
│   └── package.json
└── README.md
