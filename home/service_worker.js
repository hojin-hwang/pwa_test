const sCacheName = "hello-PWA";//Cache title 
const aFileToCache = ['./', './index.html', './manifest.json', './images/hello-pwa.png', './images/icons/favicon.ico']; // cache할 file 선언

self.addEventListener('install', event =>{
    console.log("서비스 워커 설치함");
    event.waitUntil(
        caches.open(sCacheName)
        .then(pCache =>{
            console.log("파일을 캐시에 저장합");
            return pCache.addAll(aFileToCache);
        })
    );
});

self.addEventListener('activate', event=>{
    console.log("서비스 워커가 기동함");
});

self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
        .then(response =>{
            if(!response)
            {
                console.log("네트워크에서 데이터 요청", event.request);
                return fetch(event.request);
            }
            console.log("Cache에서 파일 가져옴", event.request);
            return response;
        })
        .catch(error => console.log(error))
    );
});