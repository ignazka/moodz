import { openDB, IDBPDatabase } from 'idb';



// create a function to save the notification time to the IndexedDB
export async function setNotificationTime(time: string) {
  try {
    // Open the IndexedDB
    const db: IDBPDatabase<any> = await openDB('notification-db', 2);

    // Create the 'notification-time' object store if it doesn't already exist
    if (!db.objectStoreNames.contains('notification-time')) {
      db.createObjectStore('notification-time');
    }

    // Start a "readwrite" transaction
    const tx = db.transaction('notification-time', 'readwrite');

    // Save the notification time to the store
    tx.store.put(time, 'time');

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
    const notificationTime =  tx.store.get('time');
    await tx.done;

    return notificationTime;
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
    return undefined;
  }
}
  


export async function checkNotificationTime() {
  try {
    // Get the notification time from the IndexedDB
    const notificationTime: any = await getNotificationTime();

    // Compare the current time with the notification time
    const currentTime = new Date();
    const [notificationHour, notificationMinute] = notificationTime.split(':');
    if (currentTime.getHours() === Number(notificationHour) && currentTime.getMinutes() === Number(notificationMinute)) {
      // Show the notification if it's time
      sendNotification();
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user here, if desired
  }
}


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

  export const sendNotification = () => {
    console.log("sendNotification executed");

    Notification.requestPermission().then(async (result) => {

        if (result === 'granted') {
            showNotification('What is your Mood right now? \n Click on this Notification to add a new MOODZ value');
        }else { 
            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
    
                if (permission === 'granted') {
                    showNotification('Notifications are now activated');
                }
            }
        }
        
        
    });

};

   


