import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import MapView from "./pages/MapView";
import ProtectedRoute from "./components/ProtectedRoute";
import VehicleDetails from "./pages/VehicleDetails";
import AppLayout from "./layouts/AppLayout";
import Users from "./pages/Users";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <Routes>
      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      <Route path="/logout" element={<Logout />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Vehicles />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicles/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <VehicleDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AppLayout>
              <Users />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Bookings />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <AppLayout>
              <MapView />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
