# Student Management System (Backend — ES Modules)

Express + MongoDB (Mongoose) REST API, written with `import`/`export` syntax (`"type": "module"`).

## Structure
```
backend/
├── config/db.js              # MongoDB connection
├── models/Student.js          # Student schema
├── controllers/studentController.js # CRUD logic
├── routes/studentRoutes.js    # API routes
├── student.js                  # Entry point (starts server)
├── package.json
└── .env.example
```

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and set `MONGO_URI` (local or Atlas) and `PORT`.
3. `npm run dev` (nodemon) or `npm start`

## API Endpoints (base: `/api/students`)

| Method | Endpoint | Description                                         |
|--------|----------|------------------------------------------------------|
| POST   | /        | Create a student                                      |
| GET    | /        | Get all students (`?search=&course=&page=&limit=`)   |
| GET    | /:id     | Get one student                                       |
| PUT    | /:id     | Update a student                                      |
| DELETE | /:id     | Delete a student                                      |

### Example student JSON body
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "rollNumber": "CS2026-001",
  "age": 20,
  "gender": "Female",
  "course": "Computer Science",
  "department": "Engineering",
  "year": 2,
  "phone": "9876543210",
  "address": "Kochi, Kerala"
}
```
