# Buyer Portal Server

A modern RESTful API backend for a property buyer portal built with Express.js, TypeScript, and PostgreSQL.

---

## Features

- **Authentication** - JWT-based authentication with secure password hashing (bcryptjs)
- **User Management** - User registration, profile management, and role-based access
- **Property Management** - Full CRUD operations for property listings
- **Favorites** - Users can add/remove properties from their favorites
- **Security** - Helmet for HTTP headers, CORS protection, input validation
- **Type Safety** - Full TypeScript support
- **Database** - PostgreSQL with TypeORM ORM

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configuration
```

### Configuration

Create a `.env` file in the server root:

```env
# Server
PORT=9004

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=buyer_portal

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Running the Server

```bash
# Development mode (with hot reload)
npm run start:dev

# Seed properties (optional)
npm run seed:properties
```

The server will start on `http://localhost:9004`

---

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Users
- `GET /users` - Get user profile
- `PUT /users` - Update user profile
- `DELETE /users` - Delete user account

### Properties
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get property details
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Favorites
- `GET /favourites` - Get user's favorite properties
- `POST /favourites` - Add property to favorites
- `DELETE /favourites/:propertyId` - Remove property from favorites

---

## Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/         # API route definitions
├── service/        # Business logic
├── entities/       # TypeORM database models
├── middlewares/    # Express middlewares (auth, error handling)
├── validators/     # Input validation
├── config/         # Configuration files
├── utils/          # Utility functions & helpers
├── types/          # TypeScript type definitions
├── seeds/          # Database seeders
└── index.ts        # Application entry point
```

---

## Tech Stack

- **Runtime** - Node.js
- **Framework** - Express.js
- **Language** - TypeScript
- **ORM** - TypeORM
- **Database** - PostgreSQL
- **Authentication** - JWT (jsonwebtoken)
- **Validation** - Joi, class-validator
- **Security** - Helmet, CORS, bcryptjs
- **Dev Tools** - Nodemon, ts-node

---

## Available Scripts

```bash
npm run start:dev        # Start development server with hot reload
npm run seed:properties  # Seed database with sample properties
npm test                 # Run tests (not yet implemented)
```

---

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Helmet.js for HTTP header security
- Input validation and sanitization
- Error handling middleware

