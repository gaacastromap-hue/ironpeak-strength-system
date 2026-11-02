const CACHE_NAME = "ironpeak-static-v6-1-1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./logo-team-gabriel-castro.png", "./presets-data.json", "./presets/Modulo-Basico-Original.xlsx", "./presets/Modulo-Intermediario-Original.xlsx", "./presets/Modulo-Avancado-Original.xlsx", "./presets/Tabela-de-Porcentagens-Original.xlsx", "./presets/Mobilidades-Original.docx"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("ironpeak-static-") && k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", event => {
 if (event.request.method !== "GET") return;
 const url = new URL(event.request.url);
 const isAppShell = url.pathname.endsWith("/index.html") || url.pathname.endsWith("/") || url.pathname.endsWith("/presets-data.json");
 if (isAppShell) { event.respondWith(fetch(event.request).then(response => { if (response.ok) { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)); } return response; }).catch(()=>caches.match(event.request).then(cached=>cached || caches.match("./index.html")))); return; }
 event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));} return response; })));
});
