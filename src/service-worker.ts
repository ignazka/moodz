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
import {showNotification, setNotificationTime} from './components/notification-utils';

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
    
    // event.waitUntil(
    //     self.clients.matchAll().then(matchedClients =>
    //     {
    //         for (let client of matchedClients)
    //         {
    //             if (client.url.indexOf(rootUrl) >= 0)
    //             {
    //               console.log("client.url",client.url);
    //                 // return client.focus();
    //             }
    //         }
    //         return self.clients.openWindow(rootUrl);

    //         // return self.clients.openWindow(rootUrl).then(function (client) { client.focus(); });
    //     })
    // );
});



//by chatbot


self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  
  setNotificationTime(new Date());
  console.log('local storage set');
 
});



// Check the notification time every minute


setInterval(async () => {
  try {
    // Open the IndexedDB
    const db = await openDB('notification-db', 1);

    // Get the notification time from the store
    const tx = db.transaction('notification-time', 'readonly');
    const notificationTime = tx.store.get('time');
    await tx.done;

    // Make sure notificationTime is an instance of Date
    if (notificationTime instanceof Date) {
      // Compare the current time with the notification time
      const currentTime = new Date();
      if (currentTime.getTime() >= notificationTime.getTime()) {
        // Show the notification if it's time
        showNotification('test', 'body-test', '/');
      }
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
  }
}, 1000); // Check every minute




  // Register the service worker
  // navigator.serviceWorker.register('/').then((registration: any) => {
    // console.log('Service worker registered by service-worker.tsx');
    // // Check if the user has granted permission to show notifications
    // Notification.requestPermission().then((permission: any) => {
    //   if (permission === 'granted') {
    //     console.log('Notification permission granted');
    //     // Check if there is a time stored in local storage

    // eslint-disable-next-line @typescript-eslint/no-unused-vars


    /* -----------
    setInterval(() => {
      console.log('Hello from the service worker!')
      
      const timeToShowNotification = window.localStorage.getItem('timeToShowNotification');
        if (timeToShowNotification) {
          // setInterval(() => {
            // Get the stored time to show the notification from local storage
            const storedTime = window.localStorage.getItem('timeToShowNotification');
            // Get the current time
            const currentTime = new Date();
            // Check if the current time matches the stored time
            if (currentTime.toLocaleTimeString() === storedTime) {
              // Show the notification
              showNotification('test', 'body-test', '/');
            }
            console.log('compare: '+currentTime.toLocaleTimeString()+' with: '+ storedTime);
            
          // }, 1000); // 1000 milliseconds = 1 second
        }
        else{
          console.log('no time stored in local storage!');
          const currentTime = new Date();
          window.localStorage.setItem('timeToShowNotification', currentTime.toLocaleTimeString());
        };

    }, 1000);

*/



    // const checkTimes = ()=>{
    //     const timeToShowNotification = localStorage.getItem('timeToShowNotification');
    //     if (timeToShowNotification) {
    //       setInterval(() => {
    //         // Get the stored time to show the notification from local storage
    //         const storedTime = localStorage.getItem('timeToShowNotification');
    //         // Get the current time
    //         const currentTime = new Date();
    //         // Check if the current time matches the stored time
    //         if (currentTime.toLocaleTimeString() === storedTime) {
    //           // Show the notification
    //           showNotification('test', 'body-test', '/');
    //         }
    //         console.log('compare: '+currentTime.toLocaleTimeString()+' with: '+ storedTime);
            
    //       }, 1000); // 1000 milliseconds = 1 second
    //     }
    //     else{
    //       console.log('no time stored in local storage!');
    //       const currentTime = new Date();
    //       localStorage.setItem('timeToShowNotification',currentTime.toLocaleTimeString());
    //     };
    //   };  















          // Use the PushManager API to schedule the push event to be delivered at the specified time
          // registration.pushManager.schedulePush({}, new Date(timeToShowNotification).getTime());
          // console.log(`Push event scheduled for ${timeToShowNotification}`);
  //       }
  //     } else {
  //       console.log('Notification permission denied');
  //     }
  //   });
  // // });

