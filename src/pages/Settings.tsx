import { Card } from '@mui/material';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { notificationTimes,timer } from '../atoms/settingsAtom';

import NotificationComponent from '../components/NotificationComponent';
import Theme from '../components/Theme';



const Settings = (props: any): any => {
    
     const [notifTimes,setNotifTimes] = useRecoilState(notificationTimes);
     const [intervalTimer,setIntervalTimer] = useRecoilState(timer);

    // const settings = useRef({notificationToggle:notifRef});

    // console.log({...props});
    let val = {...props};
    val=val.props;
    console.log("val",val);
    console.log("notificationTimes",notifTimes);
    console.log("intervalTimer",intervalTimer);
    // const handleSettingsChange = () => props.handleSettingsChange;
    // console.log("settings props handleSettingsChange",handleSettingsChange);
    const intervalIDArray:number[] = [];

    
    
  const handleSettingsChange = (e: any) => {
    console.log("++++++++++handleSettingsChange",e);
    // const { name, value } = test;
    val.setNotificationToggle(e);
    // [...props].setNotificationToggle(e);
    // console.log("notifToggle",val.notificationToggle);
    // settings.current = {notificationToggle:notifRef};
    //  console.log("set new settings ",settings.current); 
    // return (settings);
  };

    // const handleIntervalChange = (intervalID:number) =>{
    //     // const values = {intervalID};
    //     console.log("handleIntervalChange Values: ",intervalID);
        

    //     intervalIDArray.push(intervalID);
    //     console.log(intervalIDArray);
    //     // setIntervalIDArray();
    //     //  setIntervalIDArray(...intervalIDArray.push(intervalID));
    //     return (intervalIDArray)
    // };

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
                    notificationTimes={notifTimes}
                    setNotifTimes={setNotifTimes}
                    intervalTimer={intervalTimer}
                    setIntervalTimer={setIntervalTimer} 
                    handleSettingsChange={handleSettingsChange}
                    />
                </div>
            </Card >

        </div>
    )
};

export default Settings;


