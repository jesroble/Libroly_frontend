import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Las URLs de los backends se configuran con variables VITE_* (ver .env.example y src/config.ts).
// El antiguo proxy '/api' de desarrollo se ha eliminado: ningún código lo usaba.
export default defineConfig(({ mode }) => {
  // loadEnv incluye tanto los archivos .env* como las variables del entorno (p. ej. las de Vercel).
  const env = loadEnv(mode, '.', 'VITE_')

  return {
    plugins: [react()],
    // VITE_DEMO_MODE siempre tiene valor (por defecto 'false') para que en el build sea un literal
    // y, con la demo desactivada, todo su código y sus datos se eliminen del bundle.
    define: {
      'import.meta.env.VITE_DEMO_MODE': JSON.stringify(env.VITE_DEMO_MODE ?? 'false'),
    },
    css: {
      devSourcemap: true
    }
  }
})
