import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Producto() {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`/productosUser/PorProducto?id=${id}`) // Obtener el producto por ID
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{producto.titulo}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: {producto.precio}</p>
      <p>Descuento: {producto.estadoDescuento ? `${producto.descuento}%` : 'Sin descuento'}</p>
      <p>Stock: {producto.stock}</p>
      {/* Aquí podrías mostrar la imagen o cualquier otra información */}
    </div>
  );
}

export default Producto;
