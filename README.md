## 🚀 Quick Start

### 1. Clone and Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Update .env file with your MongoDB connection string
# Change MONGODB_URI and JWT_SECRET in backend/.env

# Start backend server
npm run dev
```

### 2. Setup Frontend

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes

- `GET /api/notes` - Get all user notes (with search)
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🛠️ Technologies

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend

- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## 🚨 Important Notes

- Make sure MongoDB Atlas is set up and connection string is correct
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Both servers need to be running simultaneously

Happy coding! 🎉
