const CACHE_NAME = 'disney-quest-cache-v2';
const urlsToCache = [
  '.',
  './index.html',
  './index.tsx',
  './App.tsx',
  './constants.ts',
  './types.ts',
  './services/geminiService.ts',
  './hooks/useGeolocation.ts',
  './components/WelcomeScreen.tsx',
  './components/ParkSelectionScreen.tsx',
  './components/LandSelectionScreen.tsx',
  './components/QuestSelectionScreen.tsx',
  './components/GameScreen.tsx',
  './components/RiddleView.tsx',
  './components/CompletionScreen.tsx',
  './components/MiniGameView.tsx',
  './components/MapComponent.tsx',
  './components/icons/SparkleIcon.tsx',
  './components/icons/LightbulbIcon.tsx',
  './components/icons/MapPinIcon.tsx',
  './components/icons/MapIcon.tsx',
  './components/icons/QuestIcon.tsx',
  './components/icons/CompassIcon.tsx',
  './components/icons/GlobeIcon.tsx',
  './components/icons/lands/CastleIcon.tsx',
  './components/icons/lands/PirateIcon.tsx',
  './components/icons/lands/CowboyIcon.tsx',
  './components/icons/lands/RocketIcon.tsx',
  './components/icons/lands/VictorianIcon.tsx',
  './components/icons/lands/CameraIcon.tsx',
  './components/icons/lands/CrayonIcon.tsx',
  './components/icons/lands/BouncingBallIcon.tsx',
  './components/icons/lands/ShieldIcon.tsx',
  './components/icons/lands/HotelIcon.tsx',
  './components/icons/lands/SpiderBotIcon.tsx',
  './background.jpg',
  './fantasyland1.jpg',
  './fantasyland2.jpg',
  './fantasyland3.jpg',
  './fantasyland4.jpg',
  './adventureland1.jpg',
  './adventureland2.jpg',
  './adventureland3.jpg',
  './frontierland1.jpg',
  './frontierland2.jpg',
  './frontierland3.jpg',
  './discoveryland1.jpg',
  './discoveryland2.jpg',
  './discoveryland3.jpg',
  './mainstreet1.jpg',
  './mainstreet2.jpg',
  './mainstreet3.jpg',
  './mainstreet4.jpg',
  './pixar1.jpg',
  './pixar2.jpg',
  './pixar3.jpg',
  './avengers1.jpg',
  './avengers2.jpg',
  './avengers3.jpg',
  './hotel-dlh1.jpg',
  './hotel-ny1.jpg',
  './hotel-nbc1.jpg',
  './hotel-sl1.jpg',
  './hotel-chy1.jpg',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Lato:wght@400;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://aistudiocdn.com/react-dom@^19.2.0/',
  'https://aistudiocdn.com/react@^19.2.0/',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/@google/genai@^1.27.0',
  'https://aistudiocdn.com/react-leaflet@^5.0.0',
  'https://aistudiocdn.com/leaflet@^1.9.4'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});