const CACHE_NAME = '11-02-25'; // Altere a versão se necessário
const FILES_TO_CACHE = [
    '/',
'/index.html',
'/styles.css',
'/scripts.js',
'/icon-192.png',
'/icon-512.png'
];

// Instalação: armazena arquivos em cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Arquivos armazenados em cache:', FILES_TO_CACHE);
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Busca recursos do cache quando offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Servindo do cache:', event.request.url);
                return response;
            }
            console.log('Buscando da rede:', event.request.url);
            return fetch(event.request);
        })
    );
});
