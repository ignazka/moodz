import { Card } from '@mui/material';
// import { useRecoilState } from 'recoil';
// import { notificationTimes,timer } from '../atoms/settingsAtom';

// import NotificationComponent from '../components/NotificationComponent';
import Theme from '../components/Theme';
import NotificationTimeInput from '../components/NotificationTimeInput';
import {onSave} from '../components/notification-utils';


const Settings = (props: any): any => {
    
    //  const [notifTimes,setNotifTimes] = useRecoilState(notificationTimes);
    //  const [intervalTimer,setIntervalTimer] = useRecoilState(timer);

    // const settings = useRef({notificationToggle:notifRef});

    // console.log({...props});
    // let val = {...props};
    // val=val.props;
    // console.log("val",val);
    // console.log("notificationTimes",notifTimes);
    // console.log("intervalTimer",intervalTimer);


    
    
//   const handleSettingsChange = (e: any) => {
//     console.log("setNotificationToggle",e);
//     // const { name, value } = test;
//     val.setNotificationToggle(e);
//   };



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
                    {/* <NotificationComponent 
                    notificationToggle={val.notificationToggle}
                    notificationTimes={notifTimes}
                    setNotifTimes={setNotifTimes}
                    intervalTimer={intervalTimer}
                    setIntervalTimer={setIntervalTimer} 
                    handleSettingsChange={handleSettingsChange}
                    /> */}
                    <NotificationTimeInput onSave={onSave}/>

                </div>
            </Card >

        </div>
    )
};

export default Settings;


