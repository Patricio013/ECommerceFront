import { useEffect, useState } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    fetch('carrito') // Obtener carrito
      .then(res => res.json())
      .then(data => setCarrito(data));
  }, []);

  const handleModificarCantidad = (productId, cantidad) => {
    fetch('carrito/modificarCantidad', {
      method: 'PUT',
      body: JSON.stringify({ productId, cantidad }),
    }).then(() => {
      // Actualizar el carrito después de modificar la cantidad
    });
  };

  return (
    <div>
      <h1>Tu carrito</h1>
      {carrito?.productos.map(prod => (
        <div key={prod.id}>
          <h3>{prod.nombre}</h3>
          <p>Cantidad: {prod.cantidad}</p>
          <button onClick={() => handleModificarCantidad(prod.id, prod.cantidad + 1)}>Agregar</button>
          <button onClick={() => handleModificarCantidad(prod.id, prod.cantidad - 1)}>Quitar</button>
        </div>
      ))}
    </div>
  );
}

export default Carrito;
