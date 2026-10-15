const CACHE_NAME = 'aac-board-cache-v1';
const FILES_TO_CACHE = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
  el('confirmAdd').onclick = ()=>{
  const label = el('newWordLabel').value.trim();
  const emoji = el('newWordEmoji').value.trim() || '💬';
  const pos = el('newWordPos').value;
  if(!label || !currentStudent) return;
  if(!customWords[currentTab]) customWords[currentTab] = [];
  const exists = customWords[currentTab].some(w=>w[0].toLowerCase()===label.toLowerCase());
  if(exists){ alert('That word is already on this tab.'); return; }
  customWords[currentTab].push([label, emoji, pos]);
  if(saveCustomWords(currentStudent, customWords)){
    closeModal();
    renderGrid();
  }
};
});
