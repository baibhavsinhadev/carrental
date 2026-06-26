# CarRental

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-Media-1A73E8?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A full-stack car rental platform built with a production-focused architecture.

CarRental allows users to discover available rental cars, search and filter listings, book vehicles for desired dates, and manage their bookings. Users can also become car owners and list their own vehicles through a dedicated owner dashboard.

Owners can manage their fleet, monitor bookings, control vehicle availability, and restore previously deleted listings using a soft delete system.

The project is designed to simulate a real-world car rental platform with secure authentication, role-based access control, production-ready backend architecture, optimized image management, and scalable REST APIs.

---

# Table of Contents

- [Live Demo](#live-demo)
- [Repository](#repository)
- [Features](#features)
- [System Highlights](#system-highlights)
- [Architecture Highlights](#architecture-highlights)
- [Tech Stack](#tech-stack)
- [Security](#security)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [API Overview](#api-overview)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Author](#author)
- [License](#license)
- [Inspiration](#inspiration)

---

# Live Demo

## Frontend

https://carrental-client-nu.vercel.app/

## Backend API

https://carrental-server-delta.vercel.app/

---

# Repository

GitHub Repository

https://github.com/baibhavsinhadev/carrental.git

Monorepo Structure

```bash
client/
server/
```

---

# Features

## Authentication

- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Cookie-Based Authentication
- Persistent Login
- Check User Authentication

---

## User Features

- Browse Available Cars
- Search Cars
- Filter Cars
- View Car Details
- Become an Owner
- Update Profile Image
- View User Profile

---

## Booking Features

- Create Booking
- Check Car Availability
- View User Bookings
- View Owner Bookings
- Update Booking Status

---

## Owner Features

- Owner Authentication
- List New Cars
- View Listed Cars
- Owner Dashboard
- Toggle Car Availability
- Soft Delete Cars
- Restore Deleted Cars

---

# System Highlights

- Role-Based Access Control (User / Owner)
- Secure Authentication & Authorization
- Cloud-Based Image Storage
- Search & Filter System
- Car Availability Management
- Booking Management Workflow
- Responsive Design
- Scalable REST API Architecture
- Production Deployment

---

# Architecture Highlights

## Authentication System

- JWT-Based Authentication
- HTTP-Only Cookies
- Protected Routes
- Persistent Login

---

## Car Management

- Owner-Based Listings
- Toggle Availability
- Search & Filter
- Soft Delete & Restore
- ImageKit Image Storage

---

## Booking Workflow

```text
Available Car
      ↓
Search & Filter
      ↓
View Car Details
      ↓
Check Availability
      ↓
Create Booking
      ↓
Owner Manages Booking
      ↓
Completed
```

---

## Owner Dashboard

- Fleet Management
- Booking Management
- Dashboard Analytics
- Availability Controls

---

## Media Management

- ImageKit Integration
- Optimized Image Delivery

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## Media Management

- ImageKit
- Multer

---

## Deployment

- Frontend → Vercel
- Backend → Vercel
- Database → MongoDB Atlas

---

# Security

The backend implements multiple layers of security:

- Helmet
- Rate Limiting
- Response Compression
- JWT Authentication
- HTTP-Only Cookies
- Password Hashing
- Protected Routes
- Persistent Login
- Image Validation

---

# Database Design

## User Model

```javascript
{
  name,
  email,
  password,
  role,
  image
}
```

---

## Car Model

```javascript
{
  owner,
  brand,
  model,
  year,
  category,
  seating_capacity,
  transmission,
  fuel_type,
  location,
  pricePerDay,
  image,
  isAvailable,
  isDeleted
}
```

---

## Booking Model

```javascript
{
  user,
  owner,
  car,
  pickupDate,
  returnDate,
  price,
  status
}
```

---

# Project Structure

## Backend

```bash
server/
├── configs/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
└── package.json
```

---

## Frontend

```bash
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

# Environment Variables

## Backend (.env)

```env
PORT=
MONGODB_URI=
CLIENT_URL=
NODE_ENV=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

---

## Frontend (.env)

```env
VITE_CURRENCY=
VITE_SERVER_URL=
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/baibhavsinhadev/carrental.git
cd carrental
```

---

## Setup Backend

```bash
cd server
npm install
npm run dev
```

---

## Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

# API Overview

## Authentication Routes

```bash
/api/auth
```

Features:

- Register User
- Login User
- Logout User
- Check User Authentication

---

## User Routes

```bash
/api/user
```

Features:

- Fetch All Cars
- Fetch Car By ID
- Get User Data
- Update User Role to Owner
- Update User Profile Image

---

## Owner Routes

```bash
/owner
```

Features:

- List New Car
- Check Owner Authentication
- Get Owner Cars
- Fetch Dashboard Data
- Toggle Car Availability
- Soft Delete Car
- Restore Deleted Car

---

## Booking Routes

```bash
/api/booking
```

Features:

- Create Booking
- Check Car Availability
- Get User Bookings
- Get Owner Bookings
- Update Booking Status

---

# Future Improvements

- Online Payment Integration
- Wishlist Functionality
- Car Reviews & Ratings
- Multiple Vehicle Images
- Email Notifications
- Booking Cancellation Policy
- Booking History Analytics
- Admin Dashboard
- Push Notifications
- Dark Mode
- Multi-language Support
- Advanced Search Filters
- Google Maps Integration
- Favorite Cars
- Driver Rental Support

---

# Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

Please read the **CONTRIBUTING.md** file before contributing.

---

# Code of Conduct

Please read the **CODE_OF_CONDUCT.md** before participating in this project.

We are committed to providing a welcoming and respectful environment for everyone.

---

# Author

Built by **Baibhav Sinha**

Focused on building production-oriented web applications using modern technologies and real-world software architecture principles.

GitHub:

https://github.com/baibhavsinhadev

---

# License

This project is licensed under the **MIT License**.

---

# Inspiration

This project is inspired by the work and tutorials of **GreatStack**.

CarRental was built independently as a portfolio project with additional architectural improvements, production-focused backend practices, enhanced security, owner-based fleet management, soft delete functionality, persistent authentication, and optimized image management using ImageKit.

The objective was not just to build a car rental application, but to simulate a real-world rental platform with scalable backend architecture, secure authentication, role-based access control, and practical booking workflows.

---

### ⭐ If you found this project helpful, consider giving it a Star!

Made with ❤️ using the MERN Stack.