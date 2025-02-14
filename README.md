# House OF EdTech

### Next.js 14 App with Prisma & MongoDB**
```markdown
# 🚀 Next.js 14 + Prisma + MongoDB Full-Stack App

This is a **Next.js 14** full-stack application that includes **authentication, CRUD operations for posts and user profiles, and optimized performance** using best practices.



## 🌟 Features
- **User Authentication:** Login & Signup with secure authentication.
- **CRUD Operations:** Users can create, read, update, and delete posts.
- **Profile Management:** Users can update their profile information.
- **Zod Validation:** Ensuring data integrity and type safety.
- **Optimized Performance:**
  - Used `useCallback` for efficient re-renders.
  - Avoided `"use client"` at the parent level for better SSR performance.
  - Implemented **code-splitting** and caching mechanisms.
- **Server-Side Rendering (SSR):** Faster page loads with dynamic data.
- **Docker Support:** `Dockerfile` and `docker-compose` included.
- **Tailwind CSS:** Responsive and modern UI.

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, React.js, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma, MongoDB
- **Tools & Deployment:** Git, Docker, Docker Compose

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/nextjs14-prisma-mongodb.git
cd nextjs14-prisma-mongodb
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root and add:
```env
DATABASE_URL="mongodb+srv://your-user:your-password@your-cluster.mongodb.net/your-database"
TOKEN_SECRET="aifuieru374i2u34y837yriheirer458475842759jher2763722@&^#&@*^#&@*^@*&^"
```

### 4️⃣ Prisma Setup (MongoDB)
```sh
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the Development Server
```sh
npm run dev
```
App will be live at **http://localhost:3000**

---

## 🐳 Running with Docker

### 1️⃣ Build and Start the Container
```sh
docker-compose up --build -d
```

### 2️⃣ Stop and Remove Containers
```sh
docker-compose down
```



## 🏗️ Code Structure
```
root-folder/
│── prisma/            # Prisma schema
│── src/
│   ├── app/           # Next.js application
│   ├── components/    # UI components
│   ├── api/           # API Routes
│   ├── utils/         # Helper functions
│── public/            # Static assets (showcase images)
│── .env
│── Dockerfile
│── docker-compose.yml
│── next.config.js
│── package.json
│── README.md
```

---

## 📦 Docker Setup

### **Dockerfile**
```dockerfile

FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first for caching optimization
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Production-ready container
FROM node:20-alpine AS prod
WORKDIR /app

# Copy built app
COPY --from=base /app /app

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
```

### **Docker Compose**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: prod
    container_name: nextjs_app
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: mongodb+srv://your-user:your-password@your-cluster.mongodb.net/your-database

```

---

## 📸 UI Showcase
<p align="center">
  <img src="./public/home.png"  style="width:800px; height:400px;">
  <img src="./public/login.png"  style="width:800px; height:400px;">
  <img src="./public/createpost.png"  style="width:800px; height:400px;">
  <img src="./public/profile.png"  style="width:800px; height:400px;">
  

</p>

---

---

## 📌 Best Practices & Optimizations
✅ **Performance Optimizations**
- Used `useCallback` to prevent unnecessary re-renders.
- Avoided `"use client"` in parent-level components for better SSR.
- Implemented **code-splitting** for reduced bundle size.

✅ **Database & API Efficiency**
- MongoDB with Prisma ORM for easy query handling.
- Used **Next.js API Routes** for backend logic.

✅ **Security**
- **JWT** for authentication.
- **Environment Variables** for sensitive data.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💡 Future Improvements
- Add real-time WebSockets for live updates.
- Implement image uploads for profiles and posts.
- Enhance UI with animations.

---



