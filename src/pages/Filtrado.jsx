import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Filtrado() {
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4002/categorias/ObtenerCategorias') // Obtener categorías
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  const handleCategoriaChange = (categoriaId) => {
    setFiltros(prev =>
      prev.includes(categoriaId) ? prev.filter(id => id !== categoriaId) : [...prev, categoriaId]
    );
  };

  const handleFiltrar = () => {
    fetch(`http://localhost:4002/categorias/filtro?nombres=${filtros.join(',')}`)
      .then(res => res.json())
      .then(data => setProductosFiltrados(data));
  };

  return (
    <div>
      <h1>Filtrado de productos</h1>
      <div>
        {categorias.map(cat => (
          <div key={cat.id}>
            <input
              type="checkbox"
              onChange={() => handleCategoriaChange(cat.id)}
              checked={filtros.includes(cat.id)}
            />
            <label>{cat.nombre}</label>
          </div>
        ))}
      </div>
      <button onClick={handleFiltrar}>Aplicar filtro</button>
      <div>
        {productosFiltrados.map(prod => (
          <div key={prod.id}>
            <h4>{prod.titulo}</h4>
            <p>{prod.descripcion}</p>
            <p>{prod.precio}</p>
            <button onClick={() => navigate(`/producto/${prod.id}`)}>Ver Producto</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filtrado;
