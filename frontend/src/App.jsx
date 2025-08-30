import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RolebasedRoute from "./components/RolebasedRoute";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { restoreAuthHeaders } from "./store/slices/authSlice";
import RegisterPage from "./pages/RegisterPage";
import ToastProvider from "./components/ToastProvider";
import BookingUser from "./pages/user/BookingUser";
import RoomUser from "./pages/user/RoomUser";
import ListBookingUser from "./pages/user/ListBookingUser";
import BookingAdmin from "./pages/admin/BookingAdmin";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuthHeaders());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              user?.role === "admin" ? (
                <Navigate to="/admin/bookings" replace />
              ) : (
                <Navigate to="/rooms" replace />
              )
            }
          />

          {/* user */}
          <Route
            path="/rooms"
            element={
              <RolebasedRoute allowedRoles={["user"]}>
                <RoomUser />
              </RolebasedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <RolebasedRoute allowedRoles={["user"]}>
                <ListBookingUser />
              </RolebasedRoute>
            }
          />
          <Route
            path="/add-booking"
            element={
              <RolebasedRoute allowedRoles={["user"]}>
                <BookingUser />
              </RolebasedRoute>
            }
          />
          <Route
            path="user/savings"
            element={
              <RolebasedRoute allowedRoles={["user"]}>
                {/* <SavingsPage /> */}
              </RolebasedRoute>
            }
          />
          <Route
            path="user/settlements"
            element={
              <RolebasedRoute allowedRoles={["user"]}>
                {/* <SettlementsPage /> */}
              </RolebasedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="admin/bookings"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                <BookingAdmin />
              </RolebasedRoute>
            }
          />
          <Route
            path="add-savings"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                {/* <AddSavingsAdmin /> */}
              </RolebasedRoute>
            }
          />

          <Route
            path="admin/loans"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                {/* <LoansAdmin /> */}
              </RolebasedRoute>
            }
          />
          <Route
            path="admin/settlements"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                {/* <SettlementsAdmin /> */}
              </RolebasedRoute>
            }
          />
        </Route>
      </Routes>
      <ToastProvider />
    </BrowserRouter>
  );
}

export default App;
