# Contributing to CarRental

Thank you for your interest in contributing to **CarRental**.

Contributions are welcome and appreciated. Whether you want to fix a bug, improve documentation, optimize performance, or introduce a new feature, your help is valuable.

---

# Getting Started

## 1. Fork the Repository

```bash
git clone https://github.com/baibhavsinhadev/carrental.git
cd carrental
```

---

## 2. Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

## 3. Configure Environment Variables

Create the required `.env` files for both the **client** and **server** using the examples provided in the project documentation.

### Backend

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

### Frontend

```env
VITE_CURRENCY=
VITE_SERVER_URL=
```

---

## 4. Run the Project

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# Contribution Guidelines

## Branch Naming

Use meaningful branch names.

```text
feature/add-payment-system
feature/car-reviews
fix/booking-validation
fix/search-filter
docs/update-readme
refactor/owner-dashboard
```

---

## Commit Messages

Follow clear and descriptive commit messages.

```text
feat: add booking cancellation feature
feat: implement owner dashboard
fix: resolve authentication middleware issue
fix: improve availability checking
docs: update README
refactor: optimize booking controller
```

---

# Pull Request Process

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit using meaningful commit messages.
6. Push your branch.
7. Open a Pull Request.

---

# Code Standards

## Frontend

* Use functional React components.
* Keep components reusable and modular.
* Follow the existing folder structure.
* Write clean and readable code.
* Use meaningful variable and function names.
* Avoid unnecessary re-renders.

---

## Backend

* Follow REST API conventions.
* Keep controllers focused on a single responsibility.
* Validate incoming data.
* Handle errors properly.
* Use async/await consistently.
* Reuse middleware whenever possible.
* Keep business logic separate from routes.

---

# Reporting Issues

If you discover a bug or security issue, please open an issue including:

* Steps to reproduce
* Expected behavior
* Actual behavior
* Screenshots (if applicable)
* Environment details

---

# Feature Requests

Feature suggestions are always welcome.

When creating a feature request, please include:

* Problem statement
* Proposed solution
* Expected impact
* Possible implementation approach

---

# Development Principles

When contributing, please try to follow these principles:

* Write clean and maintainable code.
* Keep commits small and focused.
* Maintain consistent coding style.
* Avoid introducing breaking changes without discussion.
* Test your changes before submitting.

---

# License

By contributing to this project, you agree that your contributions will be licensed under the same **MIT License** as the project.

---

Thank you for helping improve **CarRental**!