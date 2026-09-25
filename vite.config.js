import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ↑ base: './' hace que los recursos (JS, CSS, imágenes) usen rutas RELATIVAS
  // ↑ Así el sitio funciona al publicarlo en GitHub Pages (que sirve en /la-huerta-de-ali/)
  base: './',
})
