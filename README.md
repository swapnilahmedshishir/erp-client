# Mini ERP – Inventory & Sales Management System (Frontend)

A modern and responsive frontend application for the **Mini ERP – Inventory & Sales Management System**, built with **React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, and React Query**.

The application provides secure authentication, role-based access control, product management, sales management, and dashboard analytics.

---

# 🚀 Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Redux Toolkit
- TanStack React Query
- Axios
- React Hook Form
- Zod
- Lucide React

---

# ✨ Features

## Authentication

- JWT Login
- Protected Routes
- Persistent Authentication
- Automatic Logout

---

## Role-Based Authorization

Three user roles are supported:

### Admin

- Dashboard Access
- Full Product Management
- Sales Management
- System Settings

### Manager

- Dashboard Access
- Product Management
- Create Sales

### Employee

- Dashboard Access
- View Products
- Create Sales

---

# 📊 Dashboard

- Total Products
- Total Sales
- Total Revenue
- Low Stock Products
- Responsive Statistics Cards

---

# 📦 Product Module

- Product List
- Add Product
- Edit Product
- Delete Product
- Product Image Upload
- Search Products
- Pagination

---

# 💰 Sales Module

- Create Sales
- Multiple Product Selection
- Quantity Management
- Automatic Total Calculation
- Sales History

---

# 🎨 UI Features

- Responsive Dashboard
- Professional Sidebar
- Role-Based Navigation
- Loading States
- Empty States
- Reusable Components
- Pagination
- Search
- Modal Components

---

# 📁 Project Structure

```text
src
│
├── api
├── assets
├── components
│   ├── common
│   ├── dashboard
│   ├── layout
│   ├── product
│   └── sales
│
├── features
│
├── hooks
│
├── layouts
│
├── pages
│
├── routes
│
├── services
│
├── store
│
├── types
│
├── utils
│
├── App.tsx
└── main.tsx
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/erp-client.git
```

```bash
cd erp-client
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_URL=http://localhost:5001/api/v1
```

Replace the URL with your deployed backend URL when running in production.

---

## 4. Run Development Server

```bash
npm run dev
```

Application will run at

```
http://localhost:5173
```

---

## 5. Build for Production

```bash
npm run build
```

---

## 6. Preview Production Build

```bash
npm run preview
```

---

# 🔐 Default Login Credentials

## Admin

| Field    | Value           |
| -------- | --------------- |
| Email    | admin@gmail.com |
| Password | 123456          |

---

## Manager

| Field    | Value             |
| -------- | ----------------- |
| Email    | manager@gmail.com |
| Password | 123456            |

---

## Employee

| Field    | Value              |
| -------- | ------------------ |
| Email    | employer@gmail.com |
| Password | 123456             |

---

# 📂 Available Pages

| Route              | Description           |
| ------------------ | --------------------- |
| /login             | User Login            |
| /                  | Dashboard             |
| /products          | Product List          |
| /products/create   | Create Product        |
| /products/edit/:id | Edit Product          |
| /sales             | Sales History         |
| /sales/create      | Create Sale           |
| /settings          | Settings (Admin Only) |

---

# 🔒 Role Permissions

| Feature        | Admin | Manager | Employee |
| -------------- | :---: | :-----: | :------: |
| Dashboard      |  ✅   |   ✅    |    ✅    |
| View Products  |  ✅   |   ✅    |    ✅    |
| Add Product    |  ✅   |   ✅    |    ❌    |
| Edit Product   |  ✅   |   ✅    |    ❌    |
| Delete Product |  ✅   |   ❌    |    ❌    |
| View Sales     |  ✅   |   ✅    |    ❌    |
| Create Sale    |  ✅   |   ✅    |    ✅    |
| Settings       |  ✅   |   ❌    |    ❌    |

---

# 📜 Available Scripts

Start Development Server

```bash
npm run dev
```

Build Project

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

Lint Project

```bash
npm run lint
```

---

# 🔗 Backend API

The frontend communicates with the backend REST API.

Default Base URL:

```
http://localhost:5001/api/v1
```

Configure the production API URL using the `.env` file.

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 📄 License

This project was developed as part of a **Full Stack (MERN) Technical Assessment** for evaluation purposes.
