# DevFlow AI - Setup Guide

This guide will help you set up and run both the backend and frontend for the DevFlow AI application.

## Project Structure

```
DevFlow-AI/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── backend/           # Node.js + Express backend
    ├── src/
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

The `.env` file is already created. For development, the default values should work:

```
PORT=5000
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
DATABASE_PATH=./database.db
```

**For production**, change the `JWT_SECRET` to a strong random string.

### 3. Run Backend

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

The backend will be available at `http://localhost:5000`

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Run Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running Both Simultaneously

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Option 2: Using npm-concurrently (Optional)

From the root directory, you can set up a script to run both:

```bash
npm install -D concurrently
```

Add this to root `package.json`:

```json
"scripts": {
  "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
}
```

Then run:

```bash
npm run dev
```

## API Endpoints

### Authentication Endpoints

- **POST** `/api/auth/signup` - Create a new user account
  - Request body: `{ name, email, password, role }`
  - Response: `{ user, token }`

- **POST** `/api/auth/login` - Login to existing account
  - Request body: `{ email, password }`
  - Response: `{ user, token }`

- **GET** `/api/auth/me` - Get current authenticated user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

- **GET** `/api/health` - Health check
  - Response: `{ status: 'ok' }`

## Frontend Features

### Authentication

The frontend handles authentication through the `useAuth` hook:

```typescript
const { login, signup, logout, getUser, isAuthenticated } = useAuth();
```

**Methods:**

- `login(email, password)` - Login user and store token
- `signup(name, email, password, role)` - Create new user account
- `logout()` - Clear stored token and user data
- `getUser()` - Get current user object from localStorage
- `isAuthenticated()` - Check if user is logged in

**Token Storage:**

- JWT token is stored in `localStorage` under key `token`
- User data is stored in `localStorage` under key `user`

## Database

The backend uses SQLite with the following schema:

### users table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

The database file (`database.db`) is created automatically on first run.

## Troubleshooting

### CORS Error

If you see CORS errors, ensure:

- Backend is running on `http://localhost:5000`
- Frontend is running on `http://localhost:5173`
- The backend has CORS enabled (it does by default)

### Database Lock Error

If you get database lock errors:

1. Stop the backend
2. Delete `database.db`
3. Restart the backend (it will recreate the database)

### Port Already in Use

If port 5000 or 5173 is already in use:

- Change `PORT` in backend `.env`
- Update the `API_BASE_URL` in `frontend/src/services/api.ts`

## Security Notes

**Important for Production:**

1. Change `JWT_SECRET` to a strong random string
2. Set `NODE_ENV=production`
3. Use HTTPS instead of HTTP
4. Add proper input validation
5. Implement rate limiting
6. Use environment-specific configuration

## Next Steps

- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Add social login (GitHub, Google)
- [ ] Implement user profile management
- [ ] Add role-based access control (RBAC)
- [ ] Set up automated tests
- [ ] Deploy to production
