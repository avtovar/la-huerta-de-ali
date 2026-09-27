import { useEffect, useState } from 'react'
// ↑ useState: estado para productos, cargando y error
// ↑ useEffect: efecto secundario (acá, cargar el JSON al montar)

import Item from '../Item/Item'
// ↑ La tarjeta que se repite por cada producto del catálogo

import { rutaPublica } from '../../utils/rutasPublicas'
// ↑ rutaPublica: arma la ruta del JSON con el prefijo del proyecto
// ↑ (import.meta.env.BASE_URL). Ver src/utils/rutasPublicas.js

import './ItemListContainer.css'
// ↑ Estilos propios de la grilla de productos

function ItemListContainer({ saludo }) {
  // ↑ saludo: título opcional que trae la página (ej. "Nuestras verduras")
  const [productos, setProductos] = useState([])
  // ↑ productos: array donde se guarda lo que trae el JSON
  const [cargando, setCargando] = useState(true)
  // ↑ cargando: true mientras se espera la respuesta del fetch
  const [error, setError] = useState(false)
  // ↑ error: pasa a true si el fetch falla

  useEffect(() => {
    // ↑ Este bloque corre UNA vez, cuando el componente se monta ([] = sin dependencias)
    fetch(rutaPublica('productos.json'))
      // ↑ Pedimos el archivo público del catálogo (simula una API)
      // ↑ OJO: la URL NO lleva '/' inicial a mano. rutaPublica() le pone delante
      // ↑ import.meta.env.BASE_URL, que en desarrollo es '/' y en el build es
      // ↑ '/la-huerta-de-ali/'. Con '/productos.json' pelado el navegador lo
      // ↑ buscaría en la raíz del dominio y en GitHub Pages daría 404.
      .then((res) => res.json())
      // ↑ Convertimos la respuesta en un objeto/array JavaScript
      .then((data) => {
        setProductos(data)
        // ↑ Guardamos los productos en el estado → React re-renderiza la grilla
        setCargando(false)
        // ↑ Terminó la carga
      })
      .catch((error) => {
        // ↑ Si algo falla (red, archivo inexistente...), entramos acá
        console.error('Error al cargar los productos:', error)
        // ↑ Mostramos el error en la consola del navegador
        setError(true)
        setCargando(false)
      })
  }, [])
  // ↑ Dependencias vacías: solo se ejecuta una vez al montar, no en cada render

  return (
    <div className="item-list-container">
      {saludo && <h2 className="section-title">{saludo}</h2>}
      {/* ↑ && = "si hay saludo, mostrá el título" */}

      {cargando ? (
        // ↑ Mientras carga...
        <p>Cargando verduras frescas...</p>
      ) : error ? (
        // ↑ Si falló...
        <p role="alert">No pudimos cargar los productos. Intentá nuevamente más tarde.</p>
        // ↑ role="alert": los lectores de pantalla anuncian el mensaje de error
      ) : (
        // ↑ Si cargó bien...
        <div className="item-grid">
          {productos.map((producto) => (
            // ↑ .map: convertimos cada producto del array en una tarjeta <Item>
            <Item key={producto.id} producto={producto} />
            // ↑ key: id único de cada producto. producto: se pasa por props
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemListContainer
// ↑ Exportamos el contenedor para usarlo en Home y en Productos