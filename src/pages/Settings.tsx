import { Card } from '@mui/material';
import { useRecoilState } from 'recoil';
import { notificationTimes,timer } from '../atoms/settingsAtom';

import NotificationComponent from '../components/NotificationComponent';
import Theme from '../components/Theme';



const Settings = (props: any): any => {
    
     const [notifTimes,setNotifTimes] = useRecoilState(notificationTimes);
     const [intervalTimer,setIntervalTimer] = useRecoilState(timer);

    let currentNotificationTimes;
    let currentIntervalTimer;
    let currentNotificationToggle;

    // const settings = useRef({notificationToggle:notifRef});

    // console.log({...props});
    let val = {...props};
    val=val.props;
    // console.log("val",val);
    console.log("...notifTimes",{...notifTimes});
    console.log("intervalTimer",intervalTimer);


    if(localStorage.getItem('notificationToggle')) {
        
        setSettings();

      } else {
        updateSettings();
      }
      
      function updateSettings() {
        console.log("set local storage");
        localStorage.setItem('notificationTimes', JSON.stringify({...notifTimes}));
        localStorage.setItem('intervalTimer', intervalTimer.toString());
        let nT = !val.notificationToggle;
        localStorage.setItem('notificationToggle', nT.toString());
        // localStorage.setItem('image', document.getElementById('image').value);
      
       // setSettings();
      }
      
      function setSettings() {
      
      
        localStorage.setItem('notificationTimes', JSON.stringify({...notifTimes}));
        localStorage.setItem('intervalTimer', intervalTimer.toString());
        localStorage.setItem('notificationToggle', val.notificationToggle);

        currentNotificationTimes = JSON.parse(localStorage.getItem('notificationTimes')!);
        currentIntervalTimer = localStorage.getItem('intervalTimer')?.valueOf();
        currentNotificationToggle = localStorage.getItem('notificationToggle')?.valueOf();

        console.log("currentNotificationTimes",currentNotificationTimes);
        console.log("currentIntervalTimer",currentIntervalTimer);
        console.log("currentNotificationToggle",currentNotificationToggle);
      
      }
      
    
  const handleSettingsChange = (e: any) => {
    console.log("setNotificationToggle",e);
    // const { name, value } = test;
    val.setNotificationToggle(e);
    setSettings();
  };



    return (
        <div>
            <Card
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 15, marginTop: 80, padding: 10, paddingTop: 20 }}>
                <div className='settings-ctn'>
                    <Theme />
                </div>

            </Card >
            <Card
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 15, padding: 10, paddingTop: 20 }}>
                <div className='settings-ctn'>
                    <NotificationComponent 
                    notificationToggle={val.notificationToggle}
                    notificationTimes={currentNotificationTimes}
                    setNotifTimes={setNotifTimes}
                    intervalTimer={currentIntervalTimer}
                    setIntervalTimer={setIntervalTimer} 
                    handleSettingsChange={handleSettingsChange}
                    />
                </div>
            </Card >

        </div>
    )
};

export default Settings;


