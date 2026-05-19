import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Loans from "../pages/Loans";
import Collections from "../pages/Collections";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
            path="/loans"
            element={
                <ProtectedRoute>
                <Loans />
                </ProtectedRoute>
            }
        />

        <Route
            path="/collections"
            element={
                <ProtectedRoute>
                <Collections />
                </ProtectedRoute>
            }
        />

        

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;