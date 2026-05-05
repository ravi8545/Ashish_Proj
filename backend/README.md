# Ashish — Backend API

Production-ready Node.js + Express + MongoDB backend powering the Ashish photographer & cinematographer portfolio.

## Features

- **JWT-based admin authentication** (single admin, no public signup)
- **Callback request system** (public submit + admin manage with pagination & search)
- **Portfolio management** (public read, admin CRUD)
- **Security**: helmet, CORS, rate limiting, bcrypt-hashed passwords, input validation
- **Cloudinary + Multer** structure ready for future media uploads

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── callbackController.js
│   │   └── portfolioController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validate.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Callback.js
│   │   └── Portfolio.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── callbackRoutes.js
│   │   └── portfolioRoutes.js
│   ├── scripts/
│   │   └── seedAdmin.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit values
npm run seed:admin     # creates the single admin user from .env
npm run dev            # start with nodemon
```

The server runs at `http://localhost:5000` by default.

## Environment Variables

See [.env.example](.env.example).

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret (use a long random value) |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Used only by `npm run seed:admin` |
| `CLIENT_ORIGIN` | Comma-separated list of allowed CORS origins |
| `CLOUDINARY_*` | Optional, for future uploads |

## API Endpoints

Base URL: `/api`

### Health

| Method | Endpoint | Auth |
| --- | --- | --- |
| GET | `/api/health` | Public |

### Auth

| Method | Endpoint | Auth | Body |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Public | `{ email, password }` |
| GET | `/api/auth/me` | Bearer | — |

### Callback Requests

| Method | Endpoint | Auth | Notes |
| --- | --- | --- | --- |
| POST | `/api/callback` | Public | `{ name, phone, message? }` — rate-limited |
| GET | `/api/callback` | Admin | Query: `status`, `search`, `page`, `limit` |
| GET | `/api/callback/:id` | Admin | |
| PUT | `/api/callback/:id` | Admin | `{ status: "pending" \| "contacted" }` |
| DELETE | `/api/callback/:id` | Admin | |

### Portfolio

| Method | Endpoint | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/api/portfolio` | Public | Query: `category`, `search`, `page`, `limit` |
| GET | `/api/portfolio/:id` | Public | |
| POST | `/api/portfolio` | Admin | `{ title, category, thumbnail, videoUrl, description? }` |
| PUT | `/api/portfolio/:id` | Admin | partial update allowed |
| DELETE | `/api/portfolio/:id` | Admin | |

Categories: `weddings`, `commercials`, `events`, `music`.

## Auth Header

```
Authorization: Bearer <token>
```

## Frontend Integration Example

```js
// "Request a Callback" form submission
await fetch('http://localhost:5000/api/callback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, phone, message }),
});
```

## Production Notes

- Set `NODE_ENV=production`
- Use a strong, unique `JWT_SECRET`
- Restrict `CLIENT_ORIGIN` to your deployed frontend domain(s)
- Run behind HTTPS / a reverse proxy
- Use a managed MongoDB cluster (e.g. MongoDB Atlas)
