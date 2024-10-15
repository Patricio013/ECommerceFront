import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4002/usuarios/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          const token = data.access_token;
          localStorage.setItem('token', token);

          const decoded = jwtDecode(token);
          const roles = decoded.roles || [];
          localStorage.setItem('roles', JSON.stringify(roles));

          setIsAuthenticated(true);
          navigate('/');
        } else {
          alert('Error: No se recibió un token');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Ocurrió un error durante la solicitud');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button onClick={() => navigate('/register')}>
        Registrarme
      </button>
    </div>
  );
}

export default Login;

