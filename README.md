# ✍️ TheBlog – Fullstack Blogging Platform

A full-featured blogging platform built with modern web technologies. Users can register with email verification, log in securely, and post blogs using a clean, responsive UI. Designed for developers, writers, and learners who want to explore how fullstack apps work with RESTful APIs and MySQL databases.

---

## 🚀 Features

- 🧾 User Registration with Email Verification: Secure account creation via verification codes sent to user emails.
- 🔐 Authentication & Authorization: JWT-based login and session handling.
- 📝 Blog Post Creation: Write, edit, and publish personal blog posts using a user-friendly interface.
- 📬 RESTful API: Robust and scalable Spring Boot backend API for blog and user management.
- 🌈 Clean UI: Modern, responsive frontend built with ReactJS and TailwindCSS.

---

## 🛠️ Tech Stack

### 💻 Frontend
- ReactJS
- TailwindCSS

### 🧠 Backend
- Spring Boot (Java)
- Spring Security + JWT
- Spring Mail (for email verification)
- MySQL (Database)
- Docker (for deployment)

---

## 📦 Setup Instructions

### 1. Clone the Repository
<pre>
git clone https://github.com/yourusername/TheBlog.git
cd TheBlog
</pre>

### 2. Setup Backend
<pre>
cd backend-springboot/TheBlog
</pre>

🔨 Build the Docker image:
<pre>
docker build -t yourdockerhub/theblog-backend:v1.20 .
docker push yourdockerhub/theblog-backend:v1.20
</pre>

🧪 Run Locally (without Docker):
<pre>
./mvnw spring-boot:run
</pre>

### 3. Setup Frontend
<pre>
cd ../client
</pre>

🔧 Install dependencies:
<pre>
npm install
</pre>

🚀 Start the development server:
<pre>
npm run dev
</pre>

Make sure to update the API base URL in your frontend .env:
<pre>
VITE_API_URL=http://localhost:8080
</pre>

---

## CI/CD Status

![Frontend CI](https://github.com/nvhnam/TheBLOG/actions/workflows/frontend.yml/badge.svg)
![Backend CI](https://github.com/nvhnam/TheBLOG/actions/workflows/backend.yml/badge.svg)

---

## 🌐 Live Demo
You can deploy the backend via Render and frontend via Vercel. Update CORS and .env URLs accordingly for production.

## 🤝 Contributing
Have suggestions or want to collaborate? Feel free to reach out or submit a PR!

- 📧 Email: nvhnam01@gmail.com
- 🌍 Portfolio: https://nguyenviethoangnam.vercel.app/

---

## ⭐ Support the Project
If you find TheBlog useful, please consider giving it a star ⭐ and sharing it with others. Your support helps the project grow and reach more learners!
