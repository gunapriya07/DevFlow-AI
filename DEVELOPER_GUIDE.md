# DevFlow AI - Developer Guide

## Overview

DevFlow AI is a full-stack web application for developers. It consists of:

- **Frontend**: React + TypeScript with Vite
- **Backend**: Node.js/Express with SQLite

## Architecture

### Frontend (`/frontend`)

- **Framework**: React 19.2 + TypeScript
- **Build Tool**: Vite
- **State Management**: React hooks + localStorage
- **Styling**: Inline CSS-in-JS

**Key Components:**

- `LoginPage.tsx` - User login interface
- `SingupPage.tsx` - User registration interface
- `Dashboard.tsx` - Main dashboard (after login)
- `useAuth` hook - Authentication logic

**Key Features:**

- JWT token-based authentication
- Token storage in localStorage
- API integration with backend
- Error handling and validation

### Backend (`/backend`)

- **Framework**: Express.js + TypeScript
- **Database**: SQLite
- **Authentication**: JWT with bcryptjs
- **API**: RESTful

**Key Files:**

- `src/index.ts` - Express server setup
- `src/db/database.ts` - Database wrapper
- `src/routes/auth.ts` - Authentication routes
- `src/middleware/auth.ts` - JWT verification middleware

## Authentication Flow

### Signup Flow

1. User fills signup form (name, email, password, role)
2. Frontend validates input
3. Frontend calls `POST /api/auth/signup`
4. Backend validates and hashes password with bcryptjs
5. Backend creates user in database
6. Backend generates JWT token
7. Frontend stores token and user data in localStorage
8. Frontend redirects to dashboard

### Login Flow

1. User fills login form (email, password)
2. Frontend validates input
3. Frontend calls `POST /api/auth/login`
4. Backend validates credentials
5. Backend generates JWT token
6. Frontend stores token and user data in localStorage
7. Frontend redirects to dashboard

### Protected Routes

1. Frontend checks `localStorage.getItem('token')`
2. On API calls, token is included in `Authorization: Bearer <token>` header
3. Backend middleware verifies JWT signature
4. If valid, request proceeds; if invalid, returns 401

## API Reference

### Authentication Endpoints

#### POST /api/auth/signup

Register a new user

**Request:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepassword123",
  "role": "developer"
}
```

**Response (201):**

```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "developer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400, 409):**

```json
{
  "error": "User already exists"
}
```

#### POST /api/auth/login

Login user

**Request:**

```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "developer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**

```json
{
  "error": "Invalid email or password"
}
```

#### GET /api/auth/me

Get current authenticated user

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "developer"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Invalid token"
}
```

## Development Workflow

### 1. Starting Development

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

### 2. Making Changes

**Backend:**

- Edit files in `src/`
- TypeScript is automatically compiled
- Server restarts on file changes (when using appropriate tooling)

**Frontend:**

- Edit files in `src/`
- Vite automatically reloads on save
- TypeScript errors appear in browser console

### 3. Testing Authentication

1. Open http://localhost:5173
2. Click "Create one" to go to signup
3. Fill form and click "Create Account"
4. Should redirect to dashboard
5. User token stored in localStorage

### 4. Debugging

**Frontend:**

- Use browser DevTools (F12)
- Check `localStorage` for token and user data
- Check Network tab for API calls
- Check Console for errors

**Backend:**

- Check terminal output for logs
- Add `console.log()` statements
- Use debugger with `--inspect` flag:
  ```bash
  node --inspect-brk --loader ts-node/esm src/index.ts
  ```

## File Structure

```
DevFlow-AI/
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks (useAuth)
│   │   ├── services/          # API service (api.ts)
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main App component
│   │   ├── LoginPage.tsx       # Login page
│   │   ├── SingupPage.tsx      # Signup page
│   │   └── Dashboard.tsx       # Dashboard page
│   ├── public/                # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/
    ├── src/
    │   ├── db/                # Database logic
    │   │   └── database.ts    # Database wrapper
    │   ├── middleware/        # Express middleware
    │   │   └── auth.ts        # JWT verification
    │   ├── routes/            # API routes
    │   │   └── auth.ts        # Auth endpoints
    │   └── index.ts           # Express server
    ├── package.json
    ├── tsconfig.json
    └── .env
```

## Common Tasks

### Add a New API Endpoint

1. Create route handler in `backend/src/routes/auth.ts`:

```typescript
router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  // Handler code
});
```

2. Call from frontend in `frontend/src/services/api.ts`:

```typescript
async getProfile(token: string) {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}
```

### Modify Database Schema

1. Edit `backend/src/db/database.ts`
2. Update the `initialize()` method
3. Delete `database.db` and restart backend

### Add Form Validation

**Frontend:**

```typescript
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### Handle API Errors

**Frontend:**

```typescript
try {
  const result = await api.login(email, password);
} catch (error: any) {
  setError(error.message);
}
```

## Best Practices

1. **Security**
   - Never commit `.env` with real secrets
   - Change JWT_SECRET for production
   - Always hash passwords (already done with bcryptjs)
   - Validate input on both frontend and backend

2. **Code Quality**
   - Use TypeScript types everywhere
   - Add error handling
   - Add comments for complex logic
   - Keep components small and focused

3. **Performance**
   - Don't store sensitive data in localStorage (tokens are OK with httpOnly consideration)
   - Minimize API calls
   - Lazy load components when possible

4. **Testing**
   - Test API endpoints with Postman/Insomnia
   - Test form validation
   - Test error scenarios

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Change PORT in .env if needed
```

### Frontend API calls failing

```
- Check if backend is running
- Check CORS settings in backend
- Check API_BASE_URL in frontend/src/services/api.ts
```

### Database issues

```bash
# Reset database
rm database.db
# Restart backend to recreate it
```

## Next Steps

- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add social login (GitHub, Google)
- [ ] Create user profile management
- [ ] Add role-based access control
- [ ] Implement API testing
- [ ] Add logging
- [ ] Deploy to production

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
