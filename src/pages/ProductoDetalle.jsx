import { useEffect, useState } from 'react'
// ↑ useState: estado del producto encontrado y del loading
// ↑ useEffect: dispara la búsqueda cada vez que cambia el id en la URL

import { useParams, Link } from 'react-router-dom'
// ↑ useParams: lee los parámetros dinámicos de la URL (ej. :id de /producto/3)
// ↑ Link: enlace para volver al catálogo si no se encuentra el producto

import ItemDetail from '../components/ItemDetail/ItemDetail'
// ↑ Componente que muestra los datos del producto y permite agregarlo al carrito

function ProductoDetalle() {
  const { id } = useParams()
  // ↑ Sacamos el id de la URL, ej. en /producto/5 → id = "5"

  const [producto, setProducto] = useState(null)
  // ↑ producto: el objeto encontrado, o null si no existe
  const [cargando, setCargando] = useState(true)
  // ↑ cargando: true mientras hacemos el fetch

  useEffect(() => {
    // ↑ Este bloque corre cada vez que cambia el id (y la primera vez)
    setCargando(true)
    // ↑ Reiniciamos el loading por si venimos de otro detalle
    fetch('/productos.json')
      .then((res) => res.json())
      // ↑ Convertimos la respuesta a array de productos
      .then((data) => {
        const encontrado = data.find((item) => item.id === Number(id))
        // ↑ .find busca el primer producto cuyo id coincida con el de la URL
        // ↑ Number(id) convierte el string "5" al número 5 (los ids del JSON son números)
        setProducto(encontrado || null)
        // ↑ Si no lo encuentra, guardamos null (después mostramos el aviso)
        setCargando(false)
      })
      .catch((error) => {
        // ↑ Si el fetch falla, terminamos la carga sin producto
        console.error('Error al cargar el producto:', error)
        setCargando(false)
      })
  }, [id])
  // ↑ Dependencia [id]: si el usuario navega de un detalle a otro, se vuelve a buscar

  if (cargando) {
    // ↑ Mientras carga mostramos un mensaje simple
    return <div className="page container"><p>Cargando producto...</p></div>
  }

  if (!producto) {
    // ↑ Si no existe el producto con ese id, mostramos el aviso + botón para volver
    return (
      <div className="page container">
        <h2>No encontramos esa verdura</h2>
        <p>Puede que el producto ya no esté disponible.</p>
        <Link to="/productos" className="btn btn-primary">Volver a productos</Link>
      </div>
    )
  }

  return (
    <div className="page container">
      <ItemDetail producto={producto} />
      {/* ↑ Pasamos el producto encontrado al componente de detalle */}
    </div>
  )
}

export default ProductoDetalle
// ↑ Exportamos la página para declararla en las rutas de App.jsx