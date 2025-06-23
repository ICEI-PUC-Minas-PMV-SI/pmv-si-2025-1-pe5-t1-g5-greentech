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
    if (token) {
      localStorage.setItem('token', token);
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error('Invalid token', e);
        setUser(null);
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

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
            user && (user.permission === 'Admin' || user.permission === 'RH')
              ? <UsersPage />
              : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={user ? '/users' : '/login'} />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
