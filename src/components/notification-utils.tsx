import { openDB } from 'idb';


// Function to be called when the values are saved



export const onSave = (hours: number, minutes: number, seconds: number) => {
  // Set the time to show the notification
  const sheduleNotification: Date = new Date();
  sheduleNotification.setHours(hours);
  sheduleNotification.setMinutes(minutes);
  sheduleNotification.setSeconds(seconds);
//   console.log(sheduleNotification.toLocaleTimeString());
setNotificationTime(sheduleNotification);

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

export async function setNotificationTime(notificationTime: Date) {
    const db = await openDB('notification-db', 1, {
      upgrade(db) {
        // Create a store for the notification time
        db.createObjectStore('notification-time');
      },
    });
  
    // Save the notification time to the store
    const tx = db.transaction('notification-time', 'readwrite');
    tx.store.put(notificationTime, 'time');
    await tx.done;
  }


export const showNotification = (title: string, body: string, imageUrl: string) => {

    // Check if the Push API and the Notification API are supported by the browser
    // if ('PushManager' in window && 'Notification' in window) {
      // Check if the user has granted permission to show notifications
    //   const permission = await Notification.requestPermission();
      Notification.requestPermission().then((permission: any) => {
        console.log('permission',permission);
        if (permission === 'granted') {
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
    // } else {
    //   console.log('Push and/or Notification API not supported');
    // }
  };
//   console.log(showNotification);