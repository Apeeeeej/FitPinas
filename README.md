# FitPinas Backend

FitPinas is a fitness management REST API for workout plans, exercises, workout logs, and progress tracking.

## Technology stack

- NestJS
- TypeORM
- MySQL
- JWT authentication
- bcrypt password hashing
- Postman for API testing

## Setup

1. Create a MySQL database named `fitpinas`.
2. Copy `.env.example` to `.env` and update the MySQL credentials and JWT secret.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run start:dev`.

The API is available at `http://localhost:3000/api`.

## Database export

The sanitized database export is in `database/fitpinas.sql`. Import it through phpMyAdmin or the MySQL client before starting the API. It includes the complete schema and generic sample exercises; no user credentials are included. Register a new account through `POST /api/auth/register` after importing.

## Main API resources

- `POST /api/auth/register`
- `POST /api/auth/login`
- `/api/exercises`
- `/api/workout-plans`
- `/api/workout-logs`
- `/api/progress`

All resources except registration and login require a JWT bearer token.
