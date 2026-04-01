# Buyer Portal - Client

A modern, responsive React application for a property buyer portal. Users can browse properties, manage favorites, and build their ideal property wishlist with ease.

---

## Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Property Browsing** - Explore all available property listings with detailed information
- **Favorites Management** - Add/remove properties to favorites with real-time updates
- **Responsive Design** - Mobile-first, fully responsive UI for all devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Auto-sliding Carousel** - Featured properties on landing page
- **Server-side Pagination** - Efficient data loading for favorites
- **Real-time Favorites Counter** - Live heart icon count in navbar
- **Role-based Access** - Different views based on user role
- **Protected Routes** - Secure authentication-required pages
- **Error Handling** - Graceful error messages and image fallbacks

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend server running on `http://localhost:9004`

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend API URL (if needed)
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start on `http://localhost:5173`

---

## Configuration

Create a `.env` file in the client root (if needed):

```env
# Backend API URL
VITE_API_URL=http://localhost:9004/api
```

---

## Example User Flows

### 1. **Sign Up → Login → Browse Properties**

```
1. Navigate to http://localhost:5173
2. Click "Get Started" button
3. Fill registration form:
   - Full Name
   - Email
   - Password
4. Click "Create account"
5. Login with registered credentials
6. View dashboard with all properties
```

### 2. **Browse Properties → Add to Favorites**

```
1. On Dashboard page, view all available properties
2. Click on any property card to view details
3. On property detail page:
   - View full property information
   - Click green "Add" button to add to favorites
   - Button turns red when property is favorited
4. Favorites count updates in navbar heart icon
5. Visit Favorites page to view all saved properties
```

### 3. **Manage Favorites with Pagination**

```
1. Login to dashboard
2. Click heart icon in navbar
3. View Favorites page with paginated list
4. Use dropdown to control items per page (3, 6, 9, 12)
5. Navigate between pages using pagination controls
6. Click "Remove" button to unfavorite a property
7. Favorites count in navbar updates in real-time
```

### 4. **Logout and Return**

```
1. Click profile/logout button in navbar
2. You'll be logged out and redirected to landing page
3. If you try to access /login or /register while logged in:
   - Toast message: "You are already logged in"
   - Redirected to dashboard automatically
```

---

## Pages Overview

### Landing Page (`/`)
- Hero section with auto-sliding featured properties
- Property carousel with manual navigation buttons
- Call-to-action buttons (conditional based on auth status)
- Key features showcase
- Footer with navigation links

### Registration Page (`/register`)
- User account creation form
- Email and password validation
- Automatic redirect to dashboard if already logged in

### Login Page (`/login`)
- Secure user login form
- JWT token-based authentication
- Remember user session
- Automatic redirect to dashboard if already logged in

### Dashboard Page (`/dashboard`)
- Welcome greeting with user information
- Favorites count display
- Grid view of all available properties
- Quick favorite toggle from cards
- Loader states and error handling

### Property Detail Page (`/properties/:id`)
- Full property information display
- Large property image with fallback icon
- Detailed amenities and features
- Price and location information
- Green/Red "Add/Remove from Favorites" button
- Related property suggestions

### Favorites Page (`/favourites`)
- List of all user's favorite properties
- Desktop table view and mobile card view
- Server-side pagination with configurable items per page
- Quick remove from favorites functionality
- Empty state message when no favorites

---

## Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Swiper** - Carousel/slider component
- **Context API** - State management

---

## Project Structure

```
src/
├── api/                 # API calls and axios configuration
├── components/          # Reusable UI components
│   ├── common/         # Navbar, Footer, Layout components
│   ├── property/       # Property cards, grid, slider
│   └── ui/             # Button, Input, Container components
├── context/            # React Context for Auth and Favorites
├── hooks/              # Custom hooks (useAuth, useFavorites)
├── layouts/            # Page layouts
├── pages/              # Page components
├── routes/             # Router configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main App component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

---

## API Integration

The client connects to the backend API at `http://localhost:9004/api`. Key API endpoints used:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /users/me` - Get current user info
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get property details
- `GET /favourites` - Get user's favorites (with pagination)
- `POST /favourites` - Add to favorites
- `DELETE /favourites/:propertyId` - Remove from favorites

---

## Environment Setup

Ensure the backend server is running before starting the client:

```bash
# Terminal 1: Start backend (from server directory)
cd server
npm run start:dev

# Terminal 2: Start frontend (from client directory)
cd client
npm run dev
```

---

## Troubleshooting

### Images not loading?
- Ensure your internet connection is stable
- Clear browser cache (Cmd+Shift+R on Mac)
- Check browser console for CORS issues

### Can't login?
- Verify backend server is running
- Check that API URL is correct in `.env`
- Ensure user account exists (register first)

### Favorites not updating?
- Hard refresh the page
- Clear browser cookies
- Check browser console for errors

### Port already in use?
- Kill existing process: `lsof -ti:5173 | xargs kill`
- Or use different port: `npm run dev -- --port 5174`

---

## Support

For issues or questions, check the backend server logs and browser console for detailed error messages.

---

## License

Proprietary - Take Home Assignment

### Project structure (client)
See `src/` for modular API, context, components, layouts, pages, and routes.
