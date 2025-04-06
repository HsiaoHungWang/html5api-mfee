const cacheName = "cache-v1";
//要快取的檔案
const urlsToCache = [ 
  '/main.html',
  '/stylesheets/main.css'
];

//註冊Service Worker 時，會觸發 install 事件
self.addEventListener("______", function(event) {
  //todo 在此事件中開啟會建立Cache Storage
  //todo 並將指定的檔案快取起來
  
});

//使用者每次請求時，會觸發 fetch 事件
self.addEventListener("________", function(event) {
  //todo 在此事件中比對 Cache Storage 中有無 Request 的檔案
  //todo 有就直接回傳，沒有就透過網路到伺服器端請求
 
});

// Cache Storage 的名稱如果有更改，會重新註冊 Servcie Worker
// 這時候會觸發 activate 事件
self.addEventListener("__________", function(event) {
  //todo 在此事件中清除舊的 Cache Storage
 
});


