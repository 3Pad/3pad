'use strict';
const cacheName = '3pad.1.0';
const startPage = '/';
const offlinePage = '';
const filesToCache = [];
const neverCacheUrls = '/';
// Install
self.addEventListener('install', function(e) {
console.log('Service worker installation calling!');
});

// Activate
self.addEventListener('activate', function(e) {
console.log('Service worker activation calling!');
});

// Fetch
self.addEventListener('fetch', function(e) {
console.log('Service worker fetch calling!');

// Return if request url protocal isn't http or https
if ( ! e.request.url.match(/^(http|https):\/\//i) )
return;

// Return if request url is from an external domain.
if ( new URL(e.request.url).origin !== location.origin )
return;
});