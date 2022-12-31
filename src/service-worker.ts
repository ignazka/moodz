
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

import { openDB } from 'idb';
import {setNotificationTime} from './components/notification-utils';
import { showNotification } from './components/notification-utils';

declare const self: ServiceWorkerGlobalScope;
clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

// self.addEventListener('notificationclick', (event) => {
//   console.log('our user clicked on the notification!', window.location.href);
  
//   // Send user data analytics 🔥 🔥 🔥
// }, false);

self.addEventListener('notificationclick', function (event)
{
    //For root applications: just change "'./'" to "'/'"
    //Very important having the last forward slash on "new URL('./', location)..."
    // const rootUrl = new URL('/', self.location.href).href; 
    event.notification.close();

    // window.location.reload();
    self.clients.openWindow('/');
    
 
});



//by chatbot


self.addEventListener('activate', () => {
  console.log('Service worker activated');

  // Set the notification time to 12:00:00 every day
  setNotificationTime('12:00:00');

  // Check every minute if it's time to show the notification
  setInterval(async () => {
    try {
      // Open the IndexedDB
      const db = await openDB('notification-db', 1);
  
      // Get the notification time from the store
      const tx = db.transaction('notification-time', 'readonly');
      const notificationTime = await tx.store.get('time');
      
      console.log('notificationTime',notificationTime);
      await tx.done;
  
      // Compare the current time with the notification time
      const currentTime = new Date();
      const [notificationHour, notificationMinute] = notificationTime.split(':');
      console.log('current'+currentTime.getHours()+':'+currentTime.getMinutes()+' with '+notificationHour+':'+notificationMinute);
      if (currentTime.getHours() === Number(notificationHour) && currentTime.getMinutes() === Number(notificationMinute)) {
        // Show the notification if it's time
       
        self.registration.showNotification('test');
        showNotification('sw title','blabla body','/');
      }
    } catch (error) {
      console.error(error);
      // Display an error message to the user here, if desired
    }
  }, 5000); // Check every minute
  
});