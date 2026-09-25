import { useState } from 'react'
// ↑ useState: estado local de la cantidad elegida y del mensaje de confirmación

import { Link } from 'react-router-dom'
// ↑ Link: enlaces para "Ir al carrito" y "Seguir comprando"

import { useCart } from '../../context/CartContext'
// ↑ useCart: leemos el carrito y usamos addToCart

import './ItemDetail.css'
// ↑ Estilos propios de la vista de detalle

function ItemDetail({ producto }) {
  // ↑ Recibe el producto completo por props (desde ProductoDetalle)
  const { addToCart, carrito } = useCart()
  // ↑ addToCart: función para agregar al carrito; carrito: lista actual

  const [cantidad, setCantidad] = useState(1)
  // ↑ cantidad: cuántas unidades eligió el usuario (arranca en 1)
  const [agregado, setAgregado] = useState(false)
  // ↑ agregado: true después de agregar → mostramos los mensajes de éxito

  const { nombre, categoria, precio, unidad, descripcion, imagen, stock } = producto
  // ↑ Desestructuración: sacamos los datos del producto que vamos a mostrar

  const cantidadEnCarrito = carrito.find((item) => item.id === producto.id)?.cantidad || 0
  // ↑ Buscamos cuántas unidades de este producto YA tenemos en el carrito
  // ↑ ?. evita romper si no existe; || 0 pone 0 cuando no hay ninguna

  const stockDisponible = Math.max(0, stock - cantidadEnCarrito)
  // ↑ Stock que queda para agregar: total menos lo ya reservado en el carrito

  const handleAgregar = () => {
    // ↑ Acción del botón "Agregar al carrito"
    if (stockDisponible === 0) return
    // ↑ Si no queda stock, no hacemos nada
    addToCart(producto, Math.min(cantidad, stockDisponible))
    // ↑ Agregamos la cantidad elegida, pero nunca más que el stock disponible
    setAgregado(true)
    // ↑ Cambiamos la pantalla a la confirmación
  }

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={imagen} alt={nombre} />
        {/* ↑ Imagen grande del producto */}
      </div>

      <div className="item-detail-info">
        <span className="item-categoria">{categoria}</span>
        <h2>{nombre}</h2>
        <p className="item-detail-precio">
          ${precio} <span>/ {unidad}</span>
        </p>
        <p className="item-detail-descripcion">{descripcion}</p>
        <p className="item-detail-stock">Disponible: {stockDisponible} {unidad}</p>
        {/* ↑ Le mostramos al usuario cuánto queda, descontando lo del carrito */}

        {agregado ? (
          // ↑ Si ya agregamos el producto...
          <div className="item-detail-confirmacion">
            <p>¡Agregado al carrito! 🛒</p>
            <Link to="/carrito" className="btn btn-primary">Ir al carrito</Link>
            <Link to="/productos" className="btn btn-outline">Seguir comprando</Link>
          </div>
        ) : (
          // ↑ ...si todavía no, mostramos el selector de cantidad y el botón
          <div className="item-detail-compra">
            <div className="cantidad-selector">
              <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))}>−</button>
              {/* ↑ Botón menos: baja la cantidad, pero nunca por debajo de 1 */}
              <span>{cantidad}</span>
              <button
                type="button"
                disabled={cantidad >= stockDisponible}
                // ↑ Deshabilitamos "+" si ya llegamos al stock disponible
                onClick={() => setCantidad((c) => Math.min(stockDisponible, c + 1))}
                // ↑ Botón más: sube la cantidad, con tope en el stock disponible
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={stockDisponible === 0}
              // ↑ Si no hay stock, el botón queda deshabilitado
              onClick={handleAgregar}
            >
              {stockDisponible === 0 ? 'Sin stock disponible' : 'Agregar al carrito'}
              {/* ↑ Cambia el texto según quede stock o no */}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemDetail
// ↑ Exportamos el detalle para usarlo en ProductoDetalle