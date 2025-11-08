import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Remplacez '<NOM_DU_DEPOT>' par le nom de votre dépôt GitHub.
  // Par exemple, si votre URL est 'https://votre-nom.github.io/discovery-quest/', mettez '/discovery-quest/'
  base: '/<NOM_DU_DEPOT>/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Le plugin utilisera automatiquement 'manifest.json' à la racine.
      // Inutile de le redéfinir ici.
    })
  ],
})
