import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useEffect, useRef, useState } from 'react';
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
