#!/usr/bin/env bash
# ↑ Shebang: le indica al sistema operativo que este archivo se ejecuta con Bash
#   (y no con sh), porque usamos `printf`, `command -v` y `${variable%%patrón}`.
#   `env` lo hace portable: el mismo archivo funciona en Linux, macOS, WSL y Git Bash.

set -e
# ↑ Modo "fail fast": en cuanto un comando falla, el script se detiene.
#   Así, si `npm install` se cae, nunca seguimos adelante con dependencias rotas.

# ══════════════════════════════════════════════════════════════
# 1) COLORES ANSI · se activan sólo si la terminal los soporta
# ══════════════════════════════════════════════════════════════
# ↑ Para saber si hay color miramos dos cosas:
#   `-t 1`    → que la salida sea una terminal real (y no un archivo redirigido).
#   `NO_COLOR` → estándar que permite desactivar los colores a pedido del usuario.
if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  C_RESET=$'\033[0m'   # ↑ \033 = carácter ESC ; [0m = "vuelve al color normal"
  C_BOLD=$'\033[1m'     # ↑ Negrita
  C_CYAN=$'\033[36m'    # ↑ Cian:    títulos y datos del proyecto
  C_GREEN=$'\033[32m'   # ↑ Verde:   mensajes de éxito
  C_YELLOW=$'\033[33m'  # ↑ Amarillo: avisos (informativos, no bloquean)
  C_RED=$'\033[31m'     # ↑ Rojo:    errores que sí bloquean
else
  # ↑ Sin soporte de color dejamos las variables vacías: los `printf` siguen
  #   funcionando igual, simplemente no se imprime ninguna secuencia de escape.
  C_RESET=''
  C_BOLD=''
  C_CYAN=''
  C_GREEN=''
  C_YELLOW=''
  C_RED=''
fi

# ══════════════════════════════════════════════════════════════
# 2) NOS UBICAMOS EN LA RAÍZ DEL PROYECTO
# ══════════════════════════════════════════════════════════════
cd "$(dirname "$0")"
# ↑ Este "truco" permite ejecutar `./local.sh` desde CUALQUIER carpeta:
#   `dirname "$0"` devuelve la ruta donde vive el script y `cd` nos lleva hasta ahí.
#   No usamos `realpath` porque no viene preinstalado en macOS.
RAIZ="$(pwd)"   # ↑ Guardamos la ruta absoluta para mostrarla en el banner.

# ══════════════════════════════════════════════════════════════
# 3) BANNER DE BIENVENIDA
# ══════════════════════════════════════════════════════════════
printf '\n'
printf '%s\n' "${C_CYAN}${C_BOLD}  LA HUERTA DE ALI  ·  servidor de desarrollo${C_RESET}"
printf '%s\n' "${C_CYAN}  React 18 + Vite 5  ·  proyecto de Ali Tovar${C_RESET}"
printf '%s\n' "${C_CYAN}  ─────────────────────────────────────────────────────${C_RESET}"
printf '%s\n' "${C_CYAN}  Carpeta :${C_RESET} $RAIZ"

if [ "$#" -gt 0 ]; then
  # ↑ Si el usuario pasó opciones (./local.sh --host, --port 3000, ...) las anunciamos.
  printf '%s\n' "${C_CYAN}  Opciones:${C_RESET} $* ${C_YELLOW}(se entregan tal cual a Vite)${C_RESET}"
else
  # ↑ Sin opciones dejamos el comportamiento por defecto de Vite: sólo localhost.
  printf '%s\n' "${C_CYAN}  Opciones:${C_RESET} ${C_YELLOW}ninguna → Vite escuchará en http://localhost:5173${C_RESET}"
fi
printf '\n'

# ══════════════════════════════════════════════════════════════
# 4) COMPROBAMOS QUE NODE Y NPM ESTÁN INSTALADOS
# ══════════════════════════════════════════════════════════════
# ↑ `command -v` busca el ejecutable dentro del PATH.
#   Con `>/dev/null 2>&1` descartamos la salida: sólo nos interesa sí o no.
if ! command -v node >/dev/null 2>&1; then
  printf '%s\n' "${C_RED}  ✖ No se encontró 'node' en el PATH.${C_RESET}"
  printf '%s\n' "     Descárgalo desde https://nodejs.org (versión 18 o superior)"
  printf '%s\n' "     y vuelve a abrir la terminal para que el PATH se actualice."
  exit 1   # ↑ Código 1 = error de entorno. No hay forma de seguir sin Node.
fi

if ! command -v npm >/dev/null 2>&1; then
  printf '%s\n' "${C_RED}  ✖ No se encontró 'npm' en el PATH.${C_RESET}"
  printf '%s\n' "     npm viene incluido dentro de Node.js."
  printf '%s\n' "     Reinstala Node.js y vuelve a intentar."
  exit 1   # ↑ Sin npm no hay forma de instalar dependencias ni levantar Vite.
fi

# ══════════════════════════════════════════════════════════════
# 5) VERSIÓN DE NODE (aviso, no bloqueo)
# ══════════════════════════════════════════════════════════════
VERSION_NODE="$(node -v)"       # ↑ Ejemplo de salida: "v20.11.1"
MAYOR_NODE="${VERSION_NODE#v}"  # ↑ Quitamos la "v" inicial  -> "20.11.1"
MAYOR_NODE="${MAYOR_NODE%%.*}"  # ↑ Cortamos en el 1er punto -> "20"
# ↑ El `2>/dev/null` esconde el error si la versión viniera con un formato
#   inesperado (no numérico): en ese caso la comparación falla y no avisamos.
if [ "$MAYOR_NODE" -lt 18 ] 2>/dev/null; then
  printf '%s\n' "${C_YELLOW}  ⚠ Aviso: detectamos Node $VERSION_NODE; se recomienda la 18 o superior.${C_RESET}"
  printf '%s\n' "${C_YELLOW}    Si Vite falla, actualiza Node desde https://nodejs.org${C_RESET}"
fi
# ↑ Sólo es un aviso: seguimos adelante para no bloquear a quien sí puede trabajar.

# ══════════════════════════════════════════════════════════════
# 6) DEPENDENCIAS · instalamos sólo si hace falta
# ══════════════════════════════════════════════════════════════
MOTIVO_INSTALAR=''
if [ ! -d node_modules ]; then
  # ↑ Caso 1: primera vez que se ejecuta el script en esta máquina.
  MOTIVO_INSTALAR='no existe la carpeta node_modules'
elif [ -f package-lock.json ] && [ package-lock.json -nt node_modules ]; then
  # ↑ Caso 2: el lockfile se actualizó después de la última instalación.
  #   El operador `-nt` significa "newer than" (más reciente que).
  MOTIVO_INSTALAR='package-lock.json es más reciente que node_modules'
fi

if [ -n "$MOTIVO_INSTALAR" ]; then
  printf '%s\n' "${C_YELLOW}  ⇩ Ejecutando 'npm install' porque: $MOTIVO_INSTALAR${C_RESET}"
  npm install   # ↑ Con `set -e`, si esto falla el script se detiene aquí mismo.
  # ↑ Los saltos de línea van en el FORMATO de printf, nunca dentro del texto:
  #   printf sólo interpreta los \n de la cadena de formato, no de los argumentos.
  printf '\n%s\n\n' "${C_GREEN}  ✔ Dependencias listas.${C_RESET}"
fi

# ══════════════════════════════════════════════════════════════
# 7) MENSAJE DE CIERRE
# ══════════════════════════════════════════════════════════════
# ↑ `trap ... EXIT` registra una función que se ejecuta siempre al salir,
#   sin importar si el script terminó bien, falló o el usuario hizo Ctrl+C.
#   Importante: la función NO llama a `exit`, para no pisar el código de salida
#   original de Vite (que es el que devuelve el shell).
despedida() {
  printf '\n'
  printf '%s\n' "${C_CYAN}  ─────────────────────────────────────────────────────${C_RESET}"
  printf '%s\n' "${C_CYAN}  Servidor de desarrollo detenido.${C_RESET}"
  printf '%s\n' "${C_CYAN}  Para volver a levantarlo: ./local.sh${C_RESET}"
  printf '%s\n' "${C_CYAN}  Para generar el build de GitHub Pages: npm run build${C_RESET}"
  printf '\n'
}
trap despedida EXIT

# ══════════════════════════════════════════════════════════════
# 8) LEVANTAMOS EL SERVIDOR DE VITE
# ══════════════════════════════════════════════════════════════
# ↑ `npm run dev` es un atajo de `npx vite` definido en package.json.
#   Los argumentos extra que reciba el script se deben pasar después del `--`
#   (separador estándar de npm), porque si no, npm se los queda para sí mismo.
if [ "$#" -gt 0 ]; then
  # ↑ Ejemplos:  ./local.sh --host   ·   ./local.sh --port 3000   ·   ./local.sh --host 0.0.0.0
  npm run dev -- "$@"
else
  # ↑ Sin argumentos NO añadimos nada: se respeta el default de Vite (localhost).
  npm run dev
fi
