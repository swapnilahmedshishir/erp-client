import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import Sales from "./pages/Sales";
import CreateSale from "./pages/CreateSale";

import NotFound from "./pages/NotFound";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/Settings";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* Sales */}

        <Route
          path="/sales"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]}>
              <CreateSale />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Redirect */}

      <Route path="/dashboard" element={<Navigate to="/" replace />} />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
