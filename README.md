# La Huerta de Ali

Proyecto de Pre-Entrega 2 de React JS, realizado por Ali Tovar.

La Huerta de Ali es una verdulería online con un catálogo de productos frescos,
detalle individual, carrito de compras y diseño responsive en modo oscuro.

## Tecnologías utilizadas

- React 18
- Vite
- React Router DOM 6
- Context API para el carrito
- CSS sin frameworks externos
- `fetch` y `useEffect` para cargar el catálogo local

## Instalación y ejecución

Requisitos: Node.js y npm instalados.

1. Abrir una terminal en la carpeta del proyecto.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir la dirección indicada por Vite, normalmente `http://localhost:5173`.

Para generar una compilación de producción:

```bash
npm run build
```

Para previsualizar esa compilación:

```bash
npm run preview
```

## Funcionalidades

- Página de inicio con presentación del emprendimiento.
- Catálogo de 12 verduras.
- Carga de productos desde `public/productos.json` usando `fetch` dentro de `useEffect`.
- Imágenes guardadas localmente en `public/verduras`.
- Tarjetas reutilizables mediante el componente `Item`.
- Vista de detalle para cada producto.
- Selector de cantidad.
- Carrito global mediante Context API.
- Imagen, nombre, cantidad y subtotal por producto, y total general en el resumen del carrito.
- Control de cantidades según el stock disponible.
- Opción para quitar productos, vaciar el carrito y finalizar una compra simulada.
- Newsletter simulado en el footer.
- Modo oscuro fijo con colores pastel de acento.
- Mensajes para carrito vacío, producto inexistente y error de carga.

## Rutas disponibles

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal |
| `/productos` | Catálogo completo |
| `/producto/:id` | Detalle de un producto |
| `/carrito` | Carrito de compras |

La navegación se realiza con `react-router-dom`, usando `NavLink` y `Link`, sin
recargar la página.

## Estructura principal

```text
index.html               Punto de entrada de Vite (contiene el <div id="root">)
vite.config.js           Configuración de Vite (plugin de React)
package.json             Dependencias y scripts del proyecto

src/
  index.css              Estilos GLOBALES: paleta de colores, tipografías y botones
  main.jsx               Punto de entrada de React
  App.jsx                Configuración de rutas
  context/
    CartContext.jsx      Estado global del carrito
  components/
    Layout/              Estructura general de la aplicación
    Header/              Logo y slogan
    NavBar/              Navegación principal y carrito
    CartWidget/          Ícono y contador del carrito
    Item/                Tarjeta reutilizable de producto
    ItemListContainer/   Carga y listado del catálogo
    ItemDetail/          Información y compra de un producto
    Footer/              Contacto, legales, newsletter y equipo
  pages/
    Home.jsx             Página principal
    Productos.jsx        Catálogo
    ProductoDetalle.jsx  Detalle por ID
    Carrito.jsx          Carrito de compras
    NotFound.jsx         Página 404

public/
  productos.json         Datos de los productos
  verduras/              Imágenes locales del catálogo
```

Nota: cada componente y página tiene su propio archivo CSS en la misma carpeta
(ej. `Item.jsx` → `Item.css`), importado desde ese mismo componente.

## Documentación del código

Para la explicación línea por línea del código (qué hace cada archivo, cada hook,
cada clase CSS y los conceptos de React que se usan), ver
[`DOCUMENTACION.md`](./DOCUMENTACION.md).

## Datos del emprendimiento

- Nombre: La Huerta de Ali
- Responsable: Ali Tovar
- Slogan: Somos los mejores en calidad y productos frescos.
- Email: huertaali@gmail.com
- Teléfono/WhatsApp: +54 9 12345678
- Instagram: @huertaali
- Sede: Av. Siempre Verde 1234, Buenos Aires

## Notas

El newsletter y la finalización de compra son demostraciones front-end. No
envían datos a un servidor ni procesan pagos reales.
