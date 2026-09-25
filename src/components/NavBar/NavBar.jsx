import { NavLink } from 'react-router-dom'
// ↑ NavLink: como Link, pero además sabe si la URL actual coincide (para marcar el link activo)

import CartWidget from '../CartWidget/CartWidget'
// ↑ Widget del carrito con su contador de productos

import './NavBar.css'
// ↑ Estilos propios de la barra de navegación

function NavBar() {
  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')
  // ↑ Función para las clases del link: NavLink la llama con { isActive }
  // ↑ Si la ruta actual es la del link, le agrega la clase .nav-link-active (se resalta)

  return (
    <nav className="navbar">
      {/* ↑ Etiqueta semántica de navegación */}
      <div className="container navbar-inner">
        {/* ↑ Centra el contenido y separa los links (izquierda) del carrito (derecha) */}
        <ul className="nav-links">
          {/* ↑ Lista de links de navegación */}
          <li>
            <NavLink to="/" end className={linkClass}>
              {/* ↑ end: solo se marca activo en la ruta EXACTA "/", no en las demás */}
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={linkClass}>
              Productos
            </NavLink>
          </li>
        </ul>
        <CartWidget />
        {/* ↑ Contador del carrito, siempre visible en la barra */}
      </div>
    </nav>
  )
}

export default NavBar
// ↑ Exportamos el componente para usarlo en Layout