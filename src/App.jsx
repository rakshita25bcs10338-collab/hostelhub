import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Balances from "./pages/Balances";
import Notices from "./pages/Notices";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen bg-zinc-950" />; 
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen bg-zinc-950" />;
  return !user ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/balances" element={<ProtectedRoute><Balances /></ProtectedRoute>} />
          <Route path="/notices" element={<ProtectedRoute><Notices /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}