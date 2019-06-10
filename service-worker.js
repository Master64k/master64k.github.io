const FILES_TO_CACHE = [
  'index.html',
];

evt.waitUntil(

  caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(FILES_TO_CACHE);
  })

);
