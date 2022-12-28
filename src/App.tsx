import ThemeProvider from '@mui/material/styles/ThemeProvider';

import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { AppRouter } from './router';
import { themes } from './utils/theme'
import { useRecoilState } from 'recoil'
import { notificationToggle, themeValue } from './atoms/settingsAtom'



function App() {
  // console.log(themeValue, useRecoilState(notificationToggle));
  // const [settings, setSettings] = 
  
  const [theme] = useRecoilState(themeValue);
  const [notifToggle,setNotifToggle] = useRecoilState(notificationToggle);



  

// by chatbot 


// Check if the Push API is supported by the browser
if ('PushManager' in window) {
  // Check if the user has granted permission to show notifications
  Notification.requestPermission().then((permission: any) => {
    if (permission === 'granted') {
      // Register the service worker
      navigator.serviceWorker.register('/service-worker.js').then((registration: any) => {
        // Get the current time
        const currentTime: Date = new Date();
  
        // Set the time to show the notification to be 12:00 PM (noon)
        const timeToShowNotification: Date = new Date();
        timeToShowNotification.setHours(10);
        timeToShowNotification.setMinutes(40);
  
        // If the current time is before noon, set the notification to be shown
        // at noon today. If the current time is after noon, set the notification
        // to be shown at noon tomorrow.
        if (currentTime.getTime() < timeToShowNotification.getTime()) {
          localStorage.setItem('timeToShowNotification', timeToShowNotification.toString());
        } else {
          timeToShowNotification.setDate(timeToShowNotification.getDate() + 1);
          localStorage.setItem('timeToShowNotification', timeToShowNotification.toString());
        }
  
        // Use the PushManager API to schedule the push event to be delivered at the specified time
        registration.pushManager.schedulePush({}, timeToShowNotification.getTime() - currentTime.getTime());
      });
    }
  });
}

//-----------------



  // console.log("notifRef from SettingsAtom",notifRef); //funktioniert!
  // console.log("settings",settings);
  // const updates = useRef([{updates:0,...settings}]);



  



//  // function Child({ counter, currentTimer }) {
//   function Child(props:any) {
//     console.log("props",props);
//     // console.log("settings child component", settings);

//     // handleSettingsChange(props);

//     // this will clearInterval in parent component after counter gets to 5
//     // useEffect(() => {
//     //   //führe den clearInterval gar nicht erst aus, solange der counter nicht bei 5 ist
//     //   // if (counter <= 5) return; //it is a loop condition so to speak
//     //   // if (toggleValue) return; //it is a loop condition so to speak
//     //   //currentTimer is also updated because with every call the intervalID changes
//     //   // setCounter(0);
//     //   // clearInterval(currentTimer); //currentTimer stores the intervalID
//     //   //counter is the number which counts up with each call
//     //   //}, [toggleRef, currentTimer]); change in toggleRef doesn't force a re-render
//     //   //instead we need observe the toggleValue state change

      
//     // });
//     // 

//     return null;
//   }

  return (
    <ThemeProvider theme={themes[theme]}>
      <div>
        <Header />
        <AppRouter
          // settings={settings}
           notificationToggle={notifToggle}
           setNotificationToggle={setNotifToggle}
          //  intervalTimer={intervalTimer}
          //  setIntervalTimer={setIntervalTimer}
          // handleSettingsChange={handleSettingsChange}
          // updates={updates}
        />
         {/* <Child
        // props={[notifRef]}
        // notificationToggle={notifRef}
      /> */}
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}

export default App;
