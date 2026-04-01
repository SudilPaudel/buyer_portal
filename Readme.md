# Buyer Portal - Real Estate Management Platform

A modern, full-stack real estate application that allows users to browse properties, manage favorites, and maintain a personalized shortlist. Built with React, TypeScript, Express, and PostgreSQL.

🌐 **Live Demo:** [https://buyer-portal-kappa.vercel.app/](https://buyer-portal-kappa.vercel.app/)

⚡ **Before accessing the live demo, please hit this endpoint first to wake up the server from cold sleep:**
```
https://buyer-portal-rkjj.onrender.com/ping
```
This may take 30-60 seconds on first request. Subsequent requests will be much faster.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [User Flows](#user-flows)
- [Deployment](#deployment)
- [Performance Notes](#performance-notes)

---

## Project Overview

**Buyer Portal** is a lightweight real estate platform designed for modern property brokers and buyers. It provides a seamless experience for browsing property listings, saving favorites, and managing a personalized shortlist.

The application is built as a **take-home assignment for a Junior Fullstack Web Developer role**, demonstrating proficiency in:
- Modern React development with TypeScript
- Backend API design with Express.js
- Database design with TypeORM and PostgreSQL
- Responsive UI/UX with Tailwind CSS
- Authentication and authorization
- State management and context API
- Real-time updates with context providers

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Carousel:** Swiper
- **Notifications:** React Hot Toast
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** Joi, Class Validator
- **Security:** Helmet, CORS
- **Logging:** Morgan

---

## ✨ Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Protected routes and role-based access control
- Auto-logout on token expiration
- Password hashing with bcryptjs

### Property Management
- Browse all available properties
- View detailed property information
- Dynamic property carousel on landing page
- Image error handling with fallback icons
- Responsive grid layout

### Favorites System
- Add/remove properties from favorites
- Real-time favorites count in navbar
- Paginated favorites list (customizable items per page: 3, 6, 9, 12)
- Server-side pagination with offset and limit
- Persistent favorites across sessions
- Heart icon state management

### User Experience
- Clean, light-themed UI
- Smooth animations and transitions
- Toast notifications for all actions
- Loading states and error handling
- Responsive design (mobile, tablet, desktop)
- Professional navbar with logo and favorites badge

---

## 📁 Project Structure

```
Take_Home_Assignment/
│
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/                     # API integration layer
│   │   │   ├── authApi.ts
│   │   │   ├── propertyApi.ts
│   │   │   ├── favouriteApi.ts
│   │   │   └── axios.ts
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── common/              # Shared components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── property/            # Property-related components
│   │   │   │   ├── PropertyGrid.tsx
│   │   │   │   ├── PropertyCard.tsx
│   │   │   │   ├── PropertySlider.tsx
│   │   │   │   └── FavouriteButton.tsx
│   │   │   └── ui/                  # UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Container.tsx
│   │   │       └── SectionTitle.tsx
│   │   │
│   │   ├── context/                 # React Context for state management
│   │   │   ├── AuthContext.tsx
│   │   │   ├── AuthContextState.ts
│   │   │   ├── FavoritesContext.tsx
│   │   │   └── FavoritesContextState.ts
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useFavorites.ts
│   │   │
│   │   ├── layouts/                 # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── PropertyDetailPage.tsx
│   │   │   ├── FavouritesPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   │
│   │   ├── routes/                  # Routing configuration
│   │   │   └── AppRouter.tsx
│   │   │
│   │   ├── types/                   # TypeScript type definitions
│   │   │   ├── auth.types.ts
│   │   │   ├── property.types.ts
│   │   │   └── favourite.types.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── cn.ts                # Class name utility
│   │   │   ├── formatCurrency.ts    # Currency formatting
│   │   │   └── storage.ts           # Local storage helpers
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── App.css
│   │
│   ├── public/
│   │   └── assets/
│   │       └── property_image/      # Property images
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── server/                          # Backend (Express + TypeORM)
│   ├── src/
│   │   ├── config/
│   │   │   ├── express.config.ts    # Express setup
│   │   │   ├── pg_db.config.ts      # Database configuration
│   │   │   └── routing.config.ts    # Routing setup
│   │   │
│   │   ├── controllers/             # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── property.controller.ts
│   │   │   └── favourite.controller.ts
│   │   │
│   │   ├── entities/                # TypeORM entities (database models)
│   │   │   ├── User/
│   │   │   ├── Property/
│   │   │   └── Favourite/
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── property.routes.ts
│   │   │   └── favourite.routes.ts
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── property.service.ts
│   │   │   └── favourite.service.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   │
│   │   ├── validators/              # Input validation
│   │   │   ├── auth.validator.ts
│   │   │   └── favourite.validator.ts
│   │   │
│   │   ├── types/
│   │   │   └── express.d.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── AppError.ts          # Custom error class
│   │   │   ├── asyncHandler.ts      # Async error handling wrapper
│   │   │   └── jwt.ts               # JWT utilities
│   │   │
│   │   ├── seeds/                   # Database seeders
│   │   │   └── property.seed.ts     # Pre-populate properties
│   │   │
│   │   └── index.ts                 # Entry point
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
│
└── Readme.md                        # This file
```

---

## Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher) - running locally or accessible
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Take_Home_Assignment
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file in the server directory
# (Example .env provided below)

# Initialize database and run migrations
npm run seed:properties

# Start the development server
npm run start:dev
```

**Example `.env` file:**
```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=buyer_portal

PORT=9004

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (if needed)
VITE_API_BASE_URL=http://localhost:9004

# Start development server
npm run dev
```

---

## 🏃 Running Locally

### Terminal 1: Start Backend Server
```bash
cd server
npm run start:dev
# Backend runs on http://localhost:9004
```

### Terminal 2: Start Frontend Dev Server
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:9004

---

## 📡 API Documentation

### Base URL (Live)
```
https://buyer-portal-rkjj.onrender.com
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Property Endpoints

#### Get All Properties
```
GET /properties?page=1&limit=10
Authorization: Bearer <token>

Response: { data: Property[], pagination }
```

#### Get Property by ID
```
GET /properties/:id
Authorization: Bearer <token>

Response: { data: Property }
```

### Favorites Endpoints

#### Get User's Favorites
```
GET /favourites?page=1&limit=10
Authorization: Bearer <token>

Response: { data: Favourite[], pagination }
```

#### Add to Favorites
```
POST /favourites
Authorization: Bearer <token>
Content-Type: application/json

{
  "propertyId": "property-uuid"
}

Response: { message, favourite }
```

#### Remove from Favorites
```
DELETE /favourites/:propertyId
Authorization: Bearer <token>

Response: { message }
```

---

## 👥 User Flows

### Flow 1: Sign Up → Login → Browse → Add Favorite

1. **Sign Up**
   - Navigate to `/register`
   - Enter email and password
   - Click "Create Account"
   - Redirected to `/login`

2. **Login**
   - Enter credentials
   - Click "Sign In"
   - Redirected to `/dashboard`

3. **Browse Properties**
   - View properties in grid layout on dashboard
   - Scroll through multiple pages
   - Click on any property to view details

4. **Add to Favorites**
   - On property detail page, click "Add" button
   - Button turns red with "Remove" text
   - Heart icon in navbar shows updated count
   - Property appears in favorites section

### Flow 2: Manage Favorites

1. **View Favorites**
   - Click heart icon in navbar
   - Redirected to `/favourites`
   - See all saved properties with pagination

2. **Change Items Per Page**
   - Use dropdown to select 3, 6, 9, or 12 items
   - Page automatically resets to page 1
   - Server-side pagination handles data fetching

3. **Remove Favorite**
   - Click "Remove" button on any property
   - Property removed from list
   - Heart count updates in navbar

### Flow 3: Logout

1. Click "Logout" in navbar
2. Session cleared
3. Redirected to landing page
4. All protected routes now require login

---

## Deployment

### Frontend - Vercel
- **URL:** https://buyer-portal-kappa.vercel.app/
- **Deployment:** Automatic on git push to main
- **Build Command:** `npm run build`
- **Environment Variables:** `VITE_API_BASE_URL` set to backend URL

### Backend - Render
- **URL:** https://buyer-portal-rkjj.onrender.com
- **Service Tier:** Free (may have request delays)
- **Database:** PostgreSQL hosted on Render
- **Deployment:** GitHub webhook integration

---

## Performance Notes

### Render Free Tier
The backend is hosted on **Render's free tier**, which means:
- **Cold start times:** Initial request may take 30-60 seconds
- **Request delays:** Responses may be 2-5 seconds slower than typical
- **Rate limits:** Fair-use policies apply

For production use, consider upgrading to a paid Render plan for better performance.

### Optimization Tips
1. First request will be slow (cold start) - subsequent requests are faster
2. Database queries are optimized with pagination
3. Frontend caches auth state in localStorage
4. Images use CDN URLs for faster loading

---

## Testing User Accounts

You can create your own account or use test data:

**Default Test User:**
- Email: `test@example.com`
- Password: `Test@123`

All properties are pre-seeded in the database and available immediately after signup.

---

## Key Features Implemented

### Completed Features
- User authentication with JWT
- Property listing and filtering
- Favorites management with real-time updates
- Server-side pagination
- Responsive design
- Error handling and validation
- Protected routes
- Auto-logout on token expiration
- Image fallback handling
- Toast notifications
- Professional UI/UX

### UI/UX Highlights
- Clean, light-themed design
- Smooth animations (Framer Motion)
- Swiper carousel for featured properties
- Pagination controls
- Real-time favorites badge
- Loading states and spinners
- Empty state messages
- Responsive navigation

---

## Contributing

This is a take-home assignment project. For questions or feedback, please contact the developer.

---

## License

This project is private and created for recruitment purposes.

---

## Developer Notes

This project demonstrates:
- **Fullstack Development:** Both frontend and backend knowledge
- **TypeScript:** Type-safe code across the stack
- **React Best Practices:** Hooks, Context API, proper component structure
- **Backend Architecture:** Service layer, middleware, error handling
- **Database Design:** Proper entity relationships and migrations
- **API Design:** RESTful principles, pagination, authentication
- **UI/UX:** Responsive design, animations, user feedback
- **DevOps:** Deployment on Vercel and Render

**Contact:** Feel free to reach out with any questions!

---

**Last Updated:** April 1, 2026
