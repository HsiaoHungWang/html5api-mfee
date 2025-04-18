const cacheName = "cache-v2";
//要快取的檔案
const urlsToCache = [ 
  '/main.html',
  '/stylesheets/main.css'
];

//註冊Service Worker 時，會觸發 install 事件
self.addEventListener("install", function(event) {
  //todo 在此事件中開啟會建立Cache Storage
  //todo 並將指定的檔案快取起來
  event.waitUntil(
    caches.open(cacheName).then(function(cache){
      return cache.addAll(urlsToCache);
    })
  )
  
});

//使用者每次請求時，會觸發 fetch 事件
self.addEventListener("fetch", function(event) {
  //todo 在此事件中比對 Cache Storage 中有無 Request 的檔案
  //todo 有就直接回傳，沒有就透過網路到伺服器端請求
 event.respondWith(
  caches.match(event.request).then(function(response){
    return response || fetch(event.request);
  })
 )
});

// // Cache Storage 的名稱如果有更改，會重新註冊 Servcie Worker
// // 這時候會觸發 activate 事件
self.addEventListener("activate", function(event) {
  //todo 在此事件中清除舊的 Cache Storage
  caches.keys().then(function(catchNames){
    return Promise.all(
      catchNames.map(function(name){
        if(name !== cacheName){
          return caches.delete(name);
        }
      })
    )
  })
});


