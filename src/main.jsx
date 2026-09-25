import React from 'react'
// ↑ Importamos React en sí (necesario para usar JSX y el StrictMode)

import ReactDOM from 'react-dom/client'
// ↑ ReactDOM se encarga de "montar" (dibujar) la app dentro del HTML real

import { BrowserRouter } from 'react-router-dom'
// ↑ BrowserRouter habilita el enrutado: la app sabe en qué URL está sin recargar la página

import App from './App'
// ↑ Traemos el componente principal, que define las rutas de la app

import { CartProvider } from './context/CartContext'
// ↑ Traemos el proveedor global del carrito, para que toda la app comparta el mismo estado

import './index.css'
// ↑ Importamos los estilos GLOBALES (variables de color, tipografías, botones, etc.)

ReactDOM.createRoot(document.getElementById('root')).render(
  // ↑ Buscamos el <div id="root"> de index.html y montamos la app ahí dentro
  <React.StrictMode>
    {/* ↑ StrictMode: en desarrollo detecta errores y malas prácticas (en producción no hace nada) */}
    <BrowserRouter>
      {/* ↑ Todo lo de adentro podrá usar links, rutas y useParams de react-router-dom */}
      <CartProvider>
        {/* ↑ Todo lo de adentro podrá leer/modificar el carrito con useCart() */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)