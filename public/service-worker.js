// importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js")

// // 'use strict';

// console.log('... Service Worker File Running ...');

// // Listner for Push Notification
// self.addEventListener('push', function (event) {
//     console.log('Received a push message', event);

//     var notification = event.data.json().notification
//     console.log(notification)
//     var title = notification.title || 'Yay a message.';
//     var body = notification.body || 'We have received a push message.';
//     var icon = './images/image/olx.png';
//     // var tag = 'simple-push-demo-notification-tag';

//     event.waitUntil(
//         self.registration.showNotification(title, {
//             body: body,
//             icon: icon,
//             // tag: tag
//         })
//     );

// });

var dataCacheName = 'olx-apps';
var cacheName = 'olx-hachathon';
var filesToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/signup.html',
    '/olx-main.html',
    '/createAd.html',
    '/single-Ad-show.html',
    '/js/bootstrap.min.js',
    '/js/app.js',
    '/js/jquery.js',
    '/css/bootstrap.min.css',
    '/css/style.css',
    '/css/font-cdn.css',
    '/img/olx-logo.png',
    
];


self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});



'use strict';

console.log('... Service Worker File Running ...');

// Listner for Push Notification
self.addEventListener('push', function (event) {
  console.log('Received a push message', event);

  var notification = event.data.json().notification
  console.log(notification)
  var title = notification.title || 'Yay a message.';
  var body = notification.body || 'We have received a push message.';
  var icon = '/images/icon-192x192.png';
  // var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      // tag: tag
    })
  );

});

// on Notification Click do whatever you want...
self.addEventListener('notificationclick', function (event) {
  
  console.log('On notification click: ', event.notification);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));

});

