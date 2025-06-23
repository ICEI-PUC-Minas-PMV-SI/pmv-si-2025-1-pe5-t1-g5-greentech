import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import LoginPage from './LoginPage';
import UsersPage from './UsersPage';

export const AuthContext = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
      setUser(null);
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error('JWT decode failed:', err);
      setToken(null);
      return;
    }

    const expiresAt = decoded.exp * 1000;
    if (Date.now() >= expiresAt) {
      console.warn('JWT is already expired');
      setToken(null);
      return;
    }

    setUser(decoded);
    localStorage.setItem('token', token);

    const msUntilExpiry = expiresAt - Date.now();
    const timeoutId = setTimeout(() => {
      setToken(null);
      navigate('/login');
    }, msUntilExpiry);

    return () => clearTimeout(timeoutId);
  }, [token, navigate]);

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/users" /> : <LoginPage />}
        />
        <Route
          path="/users/*"
          element={
            user
              ? <UsersPage />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? '/users' : '/login'} />}
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
