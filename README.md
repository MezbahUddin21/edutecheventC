# EduTechEvent 🎓

A full-stack educational and technology event platform built with:

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Zustand + React Query
- **Backend:** NestJS + TypeScript + TypeORM
- **Database:** PostgreSQL
- **Cache:** Redis (in-memory fallback included for dev)

---

## Project Structure

```
edutechevent/
├── backend/       # NestJS API
└── frontend/      # React app
```

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (optional for dev — falls back to in-memory cache)

---

## 1. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE edutechevent;
```

The app uses TypeORM with `synchronize: true` in development, so tables are created automatically on first run.

---

## 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your DB credentials and secrets
npm install
npm run start:dev
```

The API will be available at `http://localhost:3001/api`

### Key `.env` values to set:

| Key | Description |
|-----|-------------|
| `DB_HOST` | PostgreSQL host (default: `localhost`) |
| `DB_PORT` | PostgreSQL port (default: `5432`) |
| `DB_USERNAME` | DB user (default: `postgres`) |
| `DB_PASSWORD` | DB password |
| `DB_NAME` | DB name (default: `event_finder`) |
| `REDIS_HOST` | Redis host (default: `localhost`) |
| `REDIS_PORT` | Redis port (default: `6379`) |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (default: `7d`) |
| `PORT` | API port (default: `3001`) |

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

The Vite dev server proxies `/api` requests to `http://localhost:3001`, so no CORS issues.

---

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user (auth required) |
| GET | `/api/auth/my-events` | Get user's registrations (auth required) |

### Events
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/events` | List events (with filters) |
| GET | `/api/events/featured` | Featured events |
| GET | `/api/events/upcoming` | Upcoming events |
| GET | `/api/events/stats` | Event stats |
| GET | `/api/events/:id` | Event detail |
| POST | `/api/events` | Create event (auth required) |
| PUT | `/api/events/:id` | Update event (auth required) |
| DELETE | `/api/events/:id` | Delete event (auth required) |
| POST | `/api/events/:id/register` | Register for event (auth required) |
| DELETE | `/api/events/:id/register` | Unregister from event (auth required) |

### Categories
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/categories` | List all categories |

### Query Parameters for `GET /api/events`
| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Full-text search on title/description/city |
| `categoryId` | UUID | Filter by category |
| `eventType` | enum | `in_person`, `online`, `hybrid` |
| `city` | string | Filter by city |
| `startFrom` | ISO date | Events starting after this date |
| `startTo` | ISO date | Events starting before this date |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |
| `featured` | `"true"` | Featured events only |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12) |
| `sortBy` | string | `startDate`, `price`, `createdAt`, `title` |
| `sortOrder` | string | `ASC` or `DESC` |

---

## Redis Caching

The backend uses Redis for caching with these TTLs:

| Cache Key | TTL | Description |
|-----------|-----|-------------|
| `events:list:*` | 2 min | Paginated event lists |
| `events:detail:*` | 5 min | Individual event details |
| `events:featured` | 10 min | Featured events |
| `categories:all` | 30 min | Category list |

**Without Redis:** The app falls back to in-memory caching automatically. To enable Redis, install `cache-manager-redis-yet` and update `app.module.ts`:

```ts
import { redisStore } from 'cache-manager-redis-yet';

CacheModule.registerAsync({
  useFactory: (config: ConfigService) => ({
    store: redisStore,
    host: config.get('REDIS_HOST', 'localhost'),
    port: config.get<number>('REDIS_PORT', 6379),
    ttl: 60 * 5,
  }),
})
```

---

## Docker (Coming Soon)

Docker support will be added. For now, run PostgreSQL and Redis locally.

---

## Features

- 🔍 Full-text event search
- 🗂 Filter by category, type, city, price, date
- 🎫 Event registration / unregistration
- 👤 Auth (register / login / JWT)
- 📊 User dashboard with registered events
- ⭐ Featured events
- 📱 Fully responsive UI
- ⚡ Redis caching on all list endpoints
- 🔒 Route guards (organizers only can edit their events)
- 🌱 Auto-seeded categories on first run
