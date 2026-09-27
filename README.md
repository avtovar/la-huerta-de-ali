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

Requisitos: Node.js instalado (se recomienda la versión 18 o superior) y npm,
que ya viene incluido dentro de Node.

Hay dos formas de levantar el proyecto en desarrollo. Las dos funcionan:

- Opción A: el atajo `./local.sh`, que hace los pasos repetitivos por vos.
- Opción B: los comandos de npm a mano, que son el camino oficial de la cursada.

### Opción A: el atajo `./local.sh`

`local.sh` es un script Bash que se ubica solo en la raíz del proyecto, verifica
que `node` y `npm` estén instalados, avisa si la versión de Node es menor a 18,
ejecuta `npm install` automáticamente cuando hace falta (si no existe la carpeta
`node_modules` o si `package-lock.json` quedó más reciente) y después levanta el
servidor de desarrollo.

```bash
./local.sh
```

Muestra un banner al arrancar y un mensaje de despedida al salir. Cualquier
argumento extra se reenvía tal cual a Vite:

```bash
./local.sh --host          # expone el servidor en la red local
./local.sh --port 3000     # usa el puerto 3000 en lugar del 5173
```

En Windows el atajo no funciona con doble clic: el archivo empieza con una línea
`#!/usr/bin/env bash`, que solo honra un intérprete Unix. Usá Git Bash, usá WSL,
o invocá el intérprete explícitamente desde PowerShell:

```powershell
bash ./local.sh
```

### Opción B: comandos npm (el camino oficial)

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
local.sh                 Atajo Bash que instala lo necesario y levanta el servidor

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

## Autor

| Dato | Información |
| --- | --- |
| Nombre | Ali Tovar |
| Rol | Autor y desarrollador del proyecto |
| Cursada | Pre-Entrega · React JS |
| Email del emprendimiento | [huertaali@gmail.com](mailto:huertaali@gmail.com) |
| Teléfono/WhatsApp | +54 9 12345678 |
| Instagram | @huertaali |
| Sede | Av. Siempre Verde 1234, Buenos Aires |
| Código | [github.com/avtovar/la-huerta-de-ali](https://github.com/avtovar/la-huerta-de-ali) |
| Sitio publicado | [avtovar.github.io/la-huerta-de-ali](https://avtovar.github.io/la-huerta-de-ali/) |

> **La Huerta de Ali** · Somos los mejores en calidad y productos frescos.
> Pre-Entrega 2 de React JS. Proyecto realizado por **Ali Tovar**.

## Notas

El newsletter y la finalización de compra son demostraciones front-end. No
envían datos a un servidor ni procesan pagos reales.
