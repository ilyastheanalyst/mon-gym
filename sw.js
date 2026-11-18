// Mon Gym — cache hors ligne. Change VERSION à chaque mise à jour de l'app.
const VERSION = 'mon-gym-v2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png',
  './img/band-assisted-pull-up-0.jpg',
  './img/band-assisted-pull-up-1.jpg',
  './img/barbell-bench-press-medium-grip-0.jpg',
  './img/barbell-bench-press-medium-grip-1.jpg',
  './img/barbell-incline-bench-press-medium-grip-0.jpg',
  './img/barbell-incline-bench-press-medium-grip-1.jpg',
  './img/bicycling-stationary-0.jpg',
  './img/bicycling-stationary-1.jpg',
  './img/crunches-0.jpg',
  './img/crunches-1.jpg',
  './img/dumbbell-bicep-curl-0.jpg',
  './img/dumbbell-bicep-curl-1.jpg',
  './img/dumbbell-incline-row-0.jpg',
  './img/dumbbell-incline-row-1.jpg',
  './img/dumbbell-shoulder-press-0.jpg',
  './img/dumbbell-shoulder-press-1.jpg',
  './img/face-pull-0.jpg',
  './img/face-pull-1.jpg',
  './img/hammer-curls-0.jpg',
  './img/hammer-curls-1.jpg',
  './img/incline-dumbbell-press-0.jpg',
  './img/incline-dumbbell-press-1.jpg',
  './img/leg-extensions-0.jpg',
  './img/leg-extensions-1.jpg',
  './img/leg-press-0.jpg',
  './img/leg-press-1.jpg',
  './img/leverage-chest-press-0.jpg',
  './img/leverage-chest-press-1.jpg',
  './img/leverage-shoulder-press-0.jpg',
  './img/leverage-shoulder-press-1.jpg',
  './img/one-arm-dumbbell-row-0.jpg',
  './img/one-arm-dumbbell-row-1.jpg',
  './img/plank-0.jpg',
  './img/plank-1.jpg',
  './img/reverse-crunch-0.jpg',
  './img/reverse-crunch-1.jpg',
  './img/romanian-deadlift-0.jpg',
  './img/romanian-deadlift-1.jpg',
  './img/seated-cable-rows-0.jpg',
  './img/seated-cable-rows-1.jpg',
  './img/seated-leg-curl-0.jpg',
  './img/seated-leg-curl-1.jpg',
  './img/side-lateral-raise-0.jpg',
  './img/side-lateral-raise-1.jpg',
  './img/standing-calf-raises-0.jpg',
  './img/standing-calf-raises-1.jpg',
  './img/triceps-pushdown-0.jpg',
  './img/triceps-pushdown-1.jpg',
  './img/walking-treadmill-0.jpg',
  './img/walking-treadmill-1.jpg',
  './img/wide-grip-lat-pulldown-0.jpg',
  './img/wide-grip-lat-pulldown-1.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
