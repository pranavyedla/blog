
# MERN Stack Blog App

A full-stack blog platform built with the MERN stack (MongoDB, Express, React, Node.js).
Users can register, log in, create, edit, and view blog posts, including image uploads,
with a modern responsive UI.

## Features

- User authentication with JWT
- Create, delete, and view blog posts
- Image upload and display with posts
- Responsive UI (React)
- RESTful API backend (Express + MongoDB)
- Protected routes and user sessions

## Technologies Used

**Frontend:** React.js, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT

## Getting Started

**1. Clone the Repository**
```sh
git clone https://github.com/pranavyedla/blog.git
cd blog
```

**2. Backend Setup**
```sh
cd backend
npm install
```
Create a `.env` file in `/backend` with:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```sh
node index.js
```
The backend runs on `http://localhost:4000`

**3. Frontend Setup**
Open a new terminal:
```sh
cd frontend
npm install
```
Create a `.env` file in `/frontend` with:
```
VITE_API_URL=http://localhost:4000
```
Start the frontend:
```sh
npm run dev
```
Frontend runs on `http://localhost:5173`

## Deployment

- **Live Demo:**  
  [https://blog-mu-taupe-89.vercel.app/](https://blog-mu-taupe-89.vercel.app/)

- **Backend** is deployed on [Render](https://render.com/)
- **Frontend** is deployed on [Vercel](https://vercel.com/)

- Environment variables have been set accordingly for production on both platforms.
