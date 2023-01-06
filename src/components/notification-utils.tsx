/* eslint-disable no-restricted-globals */
import { openDB, IDBPDatabase } from 'idb';
// import {register} from '../serviceWorkerRegistration';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  navigator.serviceWorker.register('/service-worker.js');
  });
}


if('serviceWorker' in navigator) {
  // register();
  // .then((serviceWorkerRegistration: any) => {
    const registration = window.self.navigator.serviceWorker;
    console.log({registration});
    console.log('service worker registered', ServiceWorkerRegistration);
    
 


    // navigator.serviceWorker.addEventListener('message', ({data}) => {
    //   const message = data.msg;

    //   console.log(`FROM SW:`, message);
    // });
  //  })
  // .catch((err) => {
  //   console.log('error registering service worker', err);
  // });
}


// create a function to save the notification time to the IndexedDB
export async function setNotificationTime(time: string) {
  console.log('Get the notification time from the IndexedDB');
  try {
    // Get the notification time from the IndexedDB
    const db: IDBPDatabase<any> = await openDB('notification-db', 1, {
      upgrade(db) {
        // Create the 'notification-time' object store if it doesn't already exist
        if (!db.objectStoreNames.contains('notification-time')) {
          console.log('database not found. create new database "notification-time" ');
          db.createObjectStore('notification-time');
        }
      },
    });

    // Start a "readwrite" transaction
    const tx =  db.transaction('notification-time', 'readwrite');

    // Save the notification time to the store
    await tx.store.put(time, 'time');

    // Wait for the transaction to complete before returning
    await tx.done;
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
  }
}



// get the notification time from the IndexedDB
export async function getNotificationTime() {
  try {
    // Open the IndexedDB
    const db: IDBPDatabase<any> = await openDB('notification-db', 1);

    // Get the notification time from the store
    const tx = db.transaction('notification-time', 'readonly');
    const notificationTime = tx.store.get('time');
    await tx.done;

    return notificationTime;
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
    return undefined;
  }
}

export const checkNotificationTime = async () =>{
  try {
    console.log("checkNotificationTime: Get the notification time from the IndexedDB");
    // Get the notification time from the IndexedDB
    const notificationTime: any = await getNotificationTime();

    // Check that the notification time is defined
    if (!notificationTime) {
      console.error('The notification time is not defined and will be set to 12:00');
       setNotificationTime('12:00');
       return;
    }

    // Compare the current time with the notification time
    const currentTime = new Date();
    const [notificationHour, notificationMinute] = notificationTime.split(':');
    if (currentTime.getHours() === Number(notificationHour) && currentTime.getMinutes() === Number(notificationMinute)) {
      // Show the notification if it's time
      sendNotification();
      console.log("checkNotificationTime",true);
    return true;
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
  }
}


// const notification = document.querySelector('#notification');
// const sendButton = document.querySelector('#send');


const showNotification = async (body: any) => {
  // const registration = await navigator.serviceWorker.getRegistration();
  let registration:any = await self.ServiceWorker;
  console.log(await registration);
  registration = registration.ServiceWorkerRegistration;
  const title = 'MOODZ: Friendly Reminder.';
  const payload = {
      body,
  };

  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification("Vibration Sample");
  });
  
  if (await registration) {
      if ('showNotification' in registration) {
          registration.showNotification(title, payload);
      } else {
          // new Notification(title, payload);
          registration.showNotification(title, payload);
      }
  }
};

export const sendNotification = async () => {
  console.log("sendNotification executed");

  if (Notification.permission === 'granted') {
      await showNotification('What is your Mood right now?');
  } else {
      if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();

          if (permission === 'granted') {
             await showNotification('Notifications are now activated');
          }
      }
  }
};


export const requestNotificationPermission = async () => {
  if (!("Notification" in self)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (self.Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    showNotification("Hi there!");
    // …
    return 'granted';
  } else if (self.Notification.permission !== "denied") {
    // We need to ask the user for permission
    self.Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        showNotification("Hi there!");
        // …
      }
    });
    return '';
  }
};
    


// Function to be called when the values are saved
export const onSave = (hours: String, minutes: String) => {
  // Set the time to show the notification
    // const sheduleNotification: Date = new Date();
    // sheduleNotification.setHours(Number(hours));
    // sheduleNotification.setMinutes(Number(minutes));
    // sheduleNotification.setSeconds(Number(seconds));

    console.log('setNotificationTime to:',hours+':'+minutes);

    setNotificationTime(hours+':'+minutes);

    // localStorage.setItem('timeToShowNotification',sheduleNotification.toLocaleTimeString());

    // console.log(`Notification time changed to ${sheduleNotification}`);

  // Check if the Push API is supported by the browser
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
};


// const sendNotification = async () => {
//     console.log("sendNotification executed");
  
//     if (Notification.permission === 'granted') {
//       showNotification('MOODZ', 'what is your mood right now?', '/');
//     } else {
//         if (Notification.permission !== 'denied') {
//             const permission = await Notification.requestPermission();
  
//             if (permission === 'granted') {
//               showNotification('test', 'Notifications enabled', '/');
//             }
//         }
//     }
//   };



/*
export const showNotification = (title: string, body: string, imageUrl: string) => {
    // Notification.requestPermission().then((permission) => {
    // console.log('permission',permission);
    // If the user accepts, let's create a notification
    // if (permission === "granted") {
    //     new Notification("Hi there!");
    
      console.log('Notification permission granted' );
      // Define the options for the notification
      const notificationOptions = {
        body: body,
        vibrate: [200, 100, 200],
        image: imageUrl,
        data: {
          url: '/', // The URL to open when the user clicks on the notification
        },
      };
      // Create the notification
      new Notification(title, notificationOptions);
    // } else {
    //   console.log('Notification permission denied');
    // }
//   });
};*/

// export const showNotification = (_title: string, _body: string, _imageUrl: string) => {
//     // Define the options for the notification
//     /*const notificationOptions = {
//       body: body,
//       vibrate: [200, 100, 200],
//       imageUrl: imageUrl,
//       data: {
//         url: '/', // The URL to open when the user clicks on the notification
//       },
//     };*/
//     // Show the notification
//     showNotification('bla','test','/');
//   };

/*
const showNotification = async (body: any) => {
  console.log("showNotification");

    const registration = await navigator.serviceWorker.getRegistration();

    

    const title = 'MOODZ: Friendly Reminder.';
    const img = '/android-icon-192x192.png';
    const notAct = () => {console.log('code to show more images')};

    const notificationsProperties = {
        body,
        icon: img,
        image: "/android-icon-192x192.png",
        // A badge is an image we display
        // when there is not enough space to display the notification
        badge: "https://picsum.photos/300/200",
        // Direction decides if the notification goes
        // from left to right, right to left or let the browser decide
        //  dir: "ltr",
        // As part of the direct user experience we also have 
        // Audio- ....
         silent: false,
        // ... sensorial
        vibrate: [400, 100, 400],
        onshow: () => console.log("We are showing a Notification"),
        // onerror: () => console.log("There was an error showing a Notification"),
        // onclose: () => console.log("Closing the Notification"),
        // Informs the user if a notification replaced a previous one
        // renotify: null,
        // If set to true the notification will stick to the screen until the user interacts with it
        requireInteraction: true,
        // We'll get into actions later
        actions: [
            
            {
                action: 'like', 
                title: '👍Like'},
            
            { action: ''+{notAct},
            title: 'test'

            },
            
            
            ],

    };

    


    // const payload = {
    //     body, icon: img,
    // };
    if (registration) {
        if ('showNotification' in registration) {
            // alert("show Notif true");
            console.log("show notif");
            registration.showNotification(title, notificationsProperties);
            
        } else {
            // let not = new Notification(title, notificationsProperties);
            // alert("show Notif false");
            // not.onclick = function() { alert("onclick"); console.log("bla bla "); };
        }
    }
};


*/

/*
  export const sendNotification = () => {
    console.log("sendNotification executed");

    Notification.requestPermission().then(async (result) => {

        if (result === 'granted') {
            showNotification('What is your Mood right now? \n Click on this Notification to add a new MOODZ value');
        }else { 
            if (result !== 'denied') {
                const permission = await Notification.requestPermission();
    
                if (permission === 'granted') {
                    showNotification('Notifications are now activated');
                }
            }
        }
        
        
    });

};*/

//v2
/*
export function sendNotification() {
  // Declare the self variable with the correct type and the const keyword, and assign it the value of the global self object
  const self: ServiceWorkerGlobalScope = null;

  // Check if the service worker is running in a context where the Notification API is not available
  if (typeof self === 'undefined' || !self.registration) {
    console.error('The Notification API is not available in this context');
    return;
  }

  // Check if the user has granted permission to show notifications
  if (Notification.permission === 'granted') {
    // Show the notification
    self.registration.showNotification('Its time for your notification!');
  } else {
    // Request permission from the user
    Notification.requestPermission().then((permission: NotificationPermission) => {
      if (permission === 'granted') {
        // Show the notification if permission is granted
        self.registration.showNotification('Its time for your notification!');
      } else {
        console.error('The user did not grant permission to show a notification');
      }
    });
  }
}
*/
   


