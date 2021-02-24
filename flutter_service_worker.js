'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d10856ba71ff412706713ccd36dfd7d9",
"assets/assets/fonts/SourceSansPro-Bold.ttf": "8669b8706bbbdd1482e2fccc4ed96850",
"assets/assets/fonts/SourceSansPro-Regular.ttf": "c1678b46f7dd3f50ceac94ed4e0ad01a",
"assets/assets/fonts/SourceSansPro-SemiBold.ttf": "83476a890be79f84e97b792c9c40d743",
"assets/assets/icons/bahasa.png": "3219c3752603abe2b5ba970880becc9b",
"assets/assets/icons/calianaicon.png": "13d2f53cd541f897cdf4d633676ee73b",
"assets/assets/icons/calianalogocolor.png": "f419ae0812dec921f75fd03b847e6d62",
"assets/assets/icons/confetti.png": "c1102de48acaa29ad76139096a98b87f",
"assets/assets/icons/datapersonal.png": "289b508d77b361a909407102727b9665",
"assets/assets/icons/data_personal.png": "2b2705cf8b5e16da87ff956963a5b9c1",
"assets/assets/icons/english.png": "f61cd3b8f0aafa8c51ecfcbf1c48c275",
"assets/assets/icons/google.png": "2de368502c14077f6c070626cc5f51a3",
"assets/assets/icons/home_black.png": "922b07dbc4c7c37354f9221eced0d943",
"assets/assets/icons/home_white.png": "3b32e99d48ae0465e76aca7b7bf1c995",
"assets/assets/icons/icon%2520back.png": "51696c755d82c51bba08fcd93a312559",
"assets/assets/icons/icon%2520capture%2520selfie.png": "d892e4de7e65d001f89029fba4c03a4b",
"assets/assets/icons/icon%2520password.png": "b6937d16e91eba8e9e1ae5b232061226",
"assets/assets/icons/icon%2520profil%2520white.png": "83d6986633c95cc16aa5fc4427593bd4",
"assets/assets/icons/iconcamera.png": "af022332680a429d8d575cfa35c62d7a",
"assets/assets/icons/iconkeluar.png": "6d7a036ee00dfd09a0c06f4be2162cc6",
"assets/assets/icons/iconprofile.png": "d20ce751b735561c968a7e68b8fa0c31",
"assets/assets/icons/icons.png": "5133b52b99167c458dcb965de27b5116",
"assets/assets/icons/logout.png": "1cebe1e66ccd217d49ddb382d2ae785e",
"assets/assets/icons/profile.png": "8e2fd2125cad8eec1b36bf60ef24cdcf",
"assets/assets/icons/visitor.png": "eb9cdea2ca94ddf2d97f259825c8440e",
"assets/assets/images/bgAHM.png": "29519b234c2059d45920f13615070f6b",
"assets/assets/images/selfie.jpg": "6871422cc9716325a5a8506fab73a9f8",
"assets/assets/images/vector%2520kode%2520akses.png": "42d3c450b10e9cc448859e9a219cb033",
"assets/FontManifest.json": "eb89bb4dd9d3e17ff0b3e723a46d5df0",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "150cae55b1eae33705693c1dd624cf03",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"firebase-messaging-sw.js": "9df68976145355fc249847eade6d23ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "0d5ae815b17fdd2d41da5d09cf3a1019",
"/": "0d5ae815b17fdd2d41da5d09cf3a1019",
"init.js": "cb875dfcdfee67a8658ed89e06b458f3",
"main.dart.js": "f4d725a7fb7702f02a08f48289958fe5",
"manifest.json": "1a38255cadf4fa6b34ea3242272b1bb8",
"version.json": "0db3714fd6f0e9107b2355edc2c54ff0"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
