# Documentación - pre_entrega_react_ali_tovar

**La Huerta de Ali** es una verdulería online (pre-entrega 2 de React JS) que muestra un catálogo de 12 verduras, permite ver el detalle de cada producto, armar un carrito de compras y finalizar una compra simulada. Usa **React 18 + Vite**, **React Router DOM 6** para la navegación y **Context API** para el estado global del carrito, con **CSS puro** (modo oscuro fijo).

## Estructura

- `index.html` — Punto de entrada de Vite: define `#root` donde React dibuja toda la app.
- `package.json` — Configuración del proyecto: nombre, scripts (`dev`, `build`, `preview`) y dependencias.
- `vite.config.js` — Configuración mínima de Vite (solo el plugin de React).
- `src/main.jsx` — Entrada de la app: monta React y envuelve todo con `BrowserRouter` + `CartProvider`.
- `src/index.css` — Estilos GLOBALES: variables de color (paleta), tipografías, botones genéricos, clases utilitarias (`.container`, `.btn`, `.page`).
- `src/App.jsx` — Configura las rutas de la aplicación (Home, Productos, Detalle, Carrito, 404).
- `src/context/CartContext.jsx` — Estado GLOBAL del carrito con Context API: agregar, quitar, cambiar cantidad, vaciar y calcular totales.
- `src/components/Layout/Layout.jsx` — Esqueleto común de todas las páginas: Header + NavBar + contenido (`<Outlet/>`) + Footer.
- `src/components/Header/Header.jsx` — Encabezado con el logo y el slogan del emprendimiento.
- `src/components/NavBar/NavBar.jsx` — Barra de navegación con links (`Inicio`, `Productos`) y el carrito.
- `src/components/CartWidget/CartWidget.jsx` — Ícono del carrito con un contador de productos agregados.
- `src/components/Footer/Footer.jsx` — Pie de página: contacto, legales, newsletter simulado y tarjetas del equipo.
- `src/components/Item/Item.jsx` — Tarjeta reutilizable que muestra un producto (imagen, nombre, precio, botones).
- `src/components/ItemListContainer/ItemListContainer.jsx` — Hace `fetch` de `productos.json`, muestra "cargando", maneja error y dibuja la grilla de `Item`.
- `src/components/ItemDetail/ItemDetail.jsx` — Vista de detalle de un producto con selector de cantidad y control de stock.
- `src/pages/Home.jsx` — Página principal con hero de presentación y el catálogo.
- `src/pages/Productos.jsx` — Catálogo completo reutilizando `ItemListContainer`.
- `src/pages/ProductoDetalle.jsx` — Busca el producto por `:id` de la URL y muestra `ItemDetail`.
- `src/pages/Carrito.jsx` — Página del carrito: lista de items, cantidades, subtotales, total y finalizar compra.
- `src/pages/NotFound.jsx` — Página 404 para cualquier ruta inexistente.
- `public/productos.json` — Datos estáticos de los 12 productos (nombre, precio, stock, imagen...).
- `public/verduras/` — Imágenes locales de cada verdura.
- `src/**/*.css` — Estilos particulares de cada componente (organizados en la misma carpeta del componente).

## Comandos

```
npm run dev      -> levanta el servidor de desarrollo (http://localhost:5173)
npm run build    -> genera la versión de producción en la carpeta dist/
npm run preview  -> previsualiza la compilación de producción localmente
```

> ⚠️ Nota: este proyecto no tiene script de `lint` configurado.

## Conceptos clave que se ven en este proyecto

1. **Componentes funcionales** — Cada archivo `.jsx` exporta una función que devuelve JSX; React lo convierte en HTML.
2. **Props** — Datos que viajan de un componente padre a un hijo (ej. `producto` que recibe `Item`).
3. **Estado con `useState`** — Permite que un componente "recuerde" cosas y se vuelva a dibujar cuando cambian (ej. `cargando`, `cantidad`, `carrito`).
4. **`useEffect`** — Ejecuta efectos secundarios; acá se usa para hacer `fetch` del catálogo al montar el componente.
5. **Context API (`createContext` + `useContext`)** — Comparte el carrito entre TODOS los componentes sin pasar props de mano en mano.
6. **React Router DOM** — `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useParams` y `Outlet` para navegar sin recargar la página.
7. **`.map()` con `key`** — Se usa para convertir un array de productos en una lista de componentes; `key` ayuda a React a identificar cada uno.
8. **`fetch` de un JSON local** — La app carga los productos desde `public/productos.json` (simula una API).
9. **`grid` / `flexbox` en CSS** — Para armar grillas de productos, layout de página y diseños responsive.
10. **Variables CSS (`:root`)** — Centralizan colores y fuentes para mantener una paleta consistente.

## Árbol de dependencias

```
index.html
  └─ src/main.jsx                          ✅ punto de entrada
       ├─ src/index.css                    ✅ estilos globales aplicados
       ├─ src/context/CartContext.jsx      ✅ proveedor global del carrito
       │    └─ consumido por: CartWidget, Item, ItemDetail, Carrito
       └─ src/App.jsx                      ✅ configura las rutas
            └─ src/components/Layout/Layout.jsx   ✅ (Layout.css ✅)
                 ├─ Header/Header.jsx             ✅ (Header.css ✅)
                 ├─ NavBar/NavBar.jsx             ✅ (NavBar.css ✅)
                 │    └─ CartWidget/CartWidget.jsx ✅ (CartWidget.css ✅)
                 ├─ Footer/Footer.jsx             ✅ (Footer.css ✅)
                 └─ <Outlet/> → páginas
                      ├─ Home.jsx + Home.css              ✅
                      │    └─ ItemListContainer.jsx       ✅ (ItemListContainer.css ✅)
                      │         └─ Item/Item.jsx          ✅ (Item.css ✅)
                      ├─ Productos.jsx                    ✅
                      │    └─ ItemListContainer.jsx       ✅ (reutilizado)
                      ├─ ProductoDetalle.jsx              ✅
                      │    └─ ItemDetail/ItemDetail.jsx   ✅ (ItemDetail.css ✅)
                      ├─ Carrito.jsx + Carrito.css        ✅
                      └─ NotFound.jsx                     ✅
public/
  ├─ productos.json    ✅ datos del catálogo (se lee con fetch)
  └─ verduras/         ✅ imágenes locales
dist/                  ⚙️ carpeta generada por npm run build (no se toca a mano)
node_modules/          ⚙️ dependencias instaladas por npm (no se toca a mano)
```

> Todos los CSS del proyecto están importados y aplicados: no hay hojas de estilo huérfanas. 🎉

## Paleta

Variables definidas en `src/index.css` (modo oscuro con acentos pastel):

| Variable | Valor | Uso |
| --- | --- | --- |
| `--color-bg` | `#252a27` | Fondo general de la app |
| `--color-bg-soft` | `#343b35` | Fondo de secciones/hero/resumen |
| `--color-card` | `#303733` | Fondo de tarjetas (productos, equipo, detalle) |
| `--color-primary` | `#86a98b` | Verde principal (NavBar, botones primarios) |
| `--color-primary-dark` | `#b2d0b0` | Verde claro para textos destacados |
| `--color-secondary` | `#e8c09d` | Color de apoyo (botón secundario, avatar) |
| `--color-accent` | `#e5a8a8` | Acento (badge del carrito, botón quitar) |
| `--color-text` | `#f5f0e7` | Texto principal |
| `--color-text-soft` | `#c7c4b9` | Texto secundario / descripciones |
| `--color-border` | `#59635a` | Bordes y separadores |
| `--font-display` | `'Quicksand', sans-serif` | Títulos (h1–h4) |
| `--font-body` | `'Nunito Sans', sans-serif` | Texto general |
| `--radius-sm/md/lg` | `10px / 18px / 28px` | Bordes redondeados |
| `--shadow-soft` | `0 8px 24px rgba(0,0,0,0.22)` | Sombra de tarjetas |

## Cómo cambiar...

- **Colores del sitio** — Edita las variables `--color-*` en `src/index.css` (`:root`). Un solo cambio se refleja en toda la app.
- **Catálogo de productos** — Agrega, quita o modifica objetos en `public/productos.json` (respeta `id` únicos). Las imágenes van en `public/verduras/`.
- **Rutas** — Agrega un `<Route>` en `src/App.jsx` y crea la página correspondiente en `src/pages/`.
- **Datos del emprendimiento** — Email, teléfono, Instagram y sede están en `src/components/Footer/Footer.jsx`.
- **Control de stock** — El límite por producto se define en `productos.json` (`stock`) y se respeta en `CartContext`, `ItemDetail` y `Carrito`.

## Notas

- El newsletter y la finalización de compra son **simulaciones front-end**: no envían datos a ningún servidor ni procesan pagos reales.
- ⚠️ Dato a revisar: el producto con `id: 11` en `productos.json` se llama "Banana" pero usa imagen/descripción de berenjena (parece un error de copiado del catálogo).

---

*Documentado por Ali Valentin Tovar Morales*