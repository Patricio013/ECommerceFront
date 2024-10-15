import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Para navegar entre las páginas
  const [isUser, setIsUser] = useState(false); // Estado para saber si es USER

  useEffect(() => {
    fetch('http://localhost:4002/categorias/ObtenerCategorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al obtener categorías:', err));
  
    const storedRoles = localStorage.getItem('roles');
    if (storedRoles) {
      try {
        const userRoles = JSON.parse(storedRoles);
        if (Array.isArray(userRoles) && userRoles.includes('USER')) {
          setIsUser(true);
        }
      } catch (error) {
        console.error('Error al analizar los roles desde localStorage:', error);
      }
    }
  }, []);  

  const handleVerProducto = (productoId) => {
    if (isUser) {
      navigate(`/producto/${productoId}`); // Navegar a la página de producto solo si es USER
    } else {
      alert('Necesitas ser un usuario con rol USER para ver este producto.');
      navigate('/login'); // Redirigir al login si no es USER
    }
  };

  return (
    <div>
      <h1>Catálogo de productos</h1>
      <div>
        {categorias.map(cat => (
          <div key={cat.id}>
            <h3>{cat.nombre}</h3>
            <div>
              {cat.catalogo.map(prod => (
                <div key={prod.id}>
                  <h4>{prod.titulo}</h4>
                  <p>{prod.descripcion}</p>
                  <p>${prod.precio}</p>
                  {/* Mostrar el botón de "Ver Producto" solo si es USER */}
                  {isUser && (
                    <button onClick={() => handleVerProducto(prod.id)}>
                      Ver Producto
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* El botón de filtrado solo lo puede ver y usar un USER */}
      {isUser && (
        <button onClick={() => navigate('/filtrado')}>Ir a filtrado</button>
      )}
    </div>
  );
}

export default Catalogo;



