import { Link } from 'react-router-dom'
// ↑ Link: crea enlaces de navegación SIN recargar la página (SPA)

import './Header.css'
// ↑ Estilos propios del encabezado

function Header() {
  // ↑ Componente estático: logo + slogan de la verdulería
  return (
    <header className="header">
      {/* ↑ Etiqueta semántica de encabezado de página */}
      <div className="container header-inner">
        {/* ↑ container: centra el contenido; header-inner: alinea logo y título en fila */}
        <Link to="/" className="header-brand">
          {/* ↑ Al hacer clic en el logo volvemos a la página principal (/). Es un enlace de marca */}
          <span className="header-logo" aria-hidden="true">🥬</span>
          {/* ↑ Emoji de la marca. aria-hidden: es decorativo, los lectores de pantalla lo ignoran */}
          <div>
            <h1 className="header-title">La Huerta de Ali</h1>
            {/* ↑ Nombre del emprendimiento (h1: el título más importante de la página) */}
            <p className="header-slogan">Somos los mejores en calidad y productos frescos</p>
            {/* ↑ Slogan bajo el nombre */}
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
// ↑ Exportamos el componente para importarlo desde Layout