function AdminProductos() {
    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
      fetch('productosAdmin')
        .then(res => res.json())
        .then(data => setProductos(data));
    }, []);
  
    return (
      <div>
        <h1>Administrar Productos</h1>
        {productos.map(prod => (
          <div key={prod.id}>
            <h3>{prod.nombre}</h3>
            <button>Modificar</button>
          </div>
        ))}
        <button>Crear Nuevo Producto</button>
      </div>
    );
  }
  
  export default AdminProductos;
  