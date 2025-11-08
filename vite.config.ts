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
      includeAssets: ['background.jpg', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: 'Disneyland Paris - Discovery Quest',
        short_name: 'Discovery Quest',
        description: "Une application de jeu d'orientation immersive pour Disneyland Paris. Résolvez des énigmes complexes en explorant le parc pour découvrir des trésors cachés et des secrets magiques.",
        theme_color: '#4f46e5',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})