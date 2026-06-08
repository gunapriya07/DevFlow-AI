# DevFlow AI Backend

Node.js/Express backend for DevFlow AI application with authentication.

## Features

- User registration and login with JWT authentication
- SQLite database
- Password hashing with bcryptjs
- CORS enabled for frontend integration
- TypeScript support

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
DATABASE_PATH=./database.db
```

## Running

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Body: `{ name, email, password, role }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

- `GET /api/auth/me` - Get current user (requires auth token)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

- `GET /api/health` - Health check
  - Returns: `{ status: 'ok' }`
