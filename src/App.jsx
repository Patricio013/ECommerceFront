import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Filtrado from './pages/Filtrado';
import Producto from './pages/Producto';
import Navbar from './components/Navbar';
import * as jwtDecode from 'jwt-decode'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRoles(decoded.roles || []);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token inválido:', error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setUserRoles([]);
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !userRoles.some(role => allowedRoles.includes(role))) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carrito" element={<ProtectedRoute element={<Carrito />} allowedRoles={['USER']} />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminProductos />} allowedRoles={['ADMIN']} />} />
        <Route path="/filtrado" element={<ProtectedRoute element={<Filtrado />} allowedRoles={['USER']} />} />
        <Route path="/producto/:id" element={<Producto />} />
      </Routes>
    </Router>
  );
}

export default App;


