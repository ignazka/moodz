import { openDB } from 'idb';


// Function to be called when the values are saved



export const onSave = (hours: String, minutes: String, seconds: String) => {
  // Set the time to show the notification
    const sheduleNotification: Date = new Date();
    sheduleNotification.setHours(Number(hours));
    sheduleNotification.setMinutes(Number(minutes));
    sheduleNotification.setSeconds(Number(seconds));
    console.log(sheduleNotification.toLocaleTimeString());
    setNotificationTime(sheduleNotification.toLocaleTimeString());

    localStorage.setItem('timeToShowNotification',sheduleNotification.toLocaleTimeString());

    console.log(`Notification time changed to ${sheduleNotification}`);

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


export const setNotificationTime = async (time: any) => {
    console.log('time',time);
    try {
      // Open the IndexedDB
      console.log('open db');
      const db = await openDB('notification-db', 1, {
        upgrade(db) {
          // Create the 'notification-time' object store
          db.createObjectStore('notification-time');
          console.log('db created');
        },
      });
  
      // Add the notification time to the store
      console.log('write into db');
      const tx = db.transaction('notification-time', 'readwrite');
      tx.store.put(time,'time');
      console.log('write ', time, 'into db');
      await tx.done;
      console.log('time saved');
    } catch (error) {
      console.error(error);
      // Display an error message to the user here, if desired
    }
  };

export const showNotification = (title: string, body: string, imageUrl: string) => {
    Notification.requestPermission().then((permission) => {
    console.log('permission',permission);
    // If the user accepts, let's create a notification
    if (permission === "granted") {
        new Notification("Hi there!");
    
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
    } else {
      console.log('Notification permission denied');
    }
  });
};