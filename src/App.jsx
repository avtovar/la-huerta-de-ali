import { Routes, Route } from 'react-router-dom'
// ↑ Routes y Route: definimos qué página se muestra según la URL actual

import Layout from './components/Layout/Layout'
// ↑ Layout es el "esqueleto" común: Header, NavBar, contenido y Footer

import Home from './pages/Home'
// ↑ Página principal (hero + catálogo)

import Productos from './pages/Productos'
// ↑ Página con el catálogo completo

import ProductoDetalle from './pages/ProductoDetalle'
// ↑ Página de detalle de un producto (recibe el id por la URL)

import Carrito from './pages/Carrito'
// ↑ Página del carrito de compras

import NotFound from './pages/NotFound'
// ↑ Página 404 para rutas que no existen

function App() {
  // ↑ El componente raíz: solo se encarga de declarar las rutas
  return (
    <Routes>
      {/* ↑ Aquí adentro vive el "mapa" de rutas de la app */}
      <Route path="/" element={<Layout />}>
        {/* ↑ Todo lo que cuelga de "/" se dibuja DENTRO del Layout (en su <Outlet/>) */}
        <Route index element={<Home />} />
        {/* ↑ index = la ruta "/" exacta muestra Home */}

        <Route path="productos" element={<Productos />} />
        {/* ↑ /productos → catálogo completo */}

        <Route path="producto/:id" element={<ProductoDetalle />} />
        {/* ↑ /producto/3 → detalle del producto con id 3 (el :id es dinámico) */}

        <Route path="carrito" element={<Carrito />} />
        {/* ↑ /carrito → página del carrito */}

        <Route path="*" element={<NotFound />} />
        {/* ↑ * = cualquier otra URL → página 404 */}
      </Route>
    </Routes>
  )
}

export default App
// ↑ Exportamos App para poder importarla desde main.jsx