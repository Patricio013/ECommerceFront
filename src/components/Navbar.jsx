import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate;

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
