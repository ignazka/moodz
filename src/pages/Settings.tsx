import { Card } from '@mui/material';
import { useRecoilState } from 'recoil';
import { notificationTimes, timer, notificationToggle } from '../atoms/settingsAtom';

import NotificationComponent from '../components/NotificationComponent';
import Theme from '../components/Theme';



const Settings = (props: any): any => {

    const [notifTimes, setNotifTimes] = useRecoilState(notificationTimes);
    const [intervalTimer, setIntervalTimer] = useRecoilState(timer);
    const [notifToggle, setNotifToggle] = useRecoilState(notificationToggle);

    let currentNotificationTimes = notifTimes;
    let currentIntervalTimer;
    let currentNotificationToggle: any = notifToggle;

    // const settings = useRef({notificationToggle:notifRef});

    // console.log({...props});
    let val = { ...props };
    val = val.props;
    // console.log("val",val);
    console.log("...notifTimes", { ...notifTimes });
    console.log("intervalTimer", intervalTimer);
    console.log("notifToggle", notifToggle);

    // console.log("##### LOCAL STORAGE: setSettings() #####");
    // setSettings();
    if (localStorage.getItem('notificationToggle')) {
        if (localStorage.getItem('notificationToggle')?.valueOf() === null) {
            // console.log("##### LOCAL STORAGE: variable noch vorhanden #####", localStorage.getItem('notificationToggle')?.valueOf());
            // setNotifToggle(false);
            console.warn("local storage === null");
        }
        else {
            console.log("local storage not defined!");

            // setNotifToggle(localStorage.getItem('notificationToggle') === "true" ? true : false);
            updateSettings();
        }
        console.log('notifToggle '+notifToggle + "localToggle " + localStorage.getItem('notificationToggle'));
        
        // console.log("##### LOCAL STORAGE: variable toggle #####", localStorage.getItem('notificationToggle'));
        
        // currentNotificationToggle=(notifToggle);

    } else {
        console.log("##### LOCAL STORAGE: setSettings() #####");
        setSettings();
    }

    function updateSettings() {
        console.log("set local storage");
        localStorage.setItem('notificationTimes', JSON.stringify({ ...notifTimes }));
        localStorage.setItem('intervalTimer', intervalTimer.toString());
        currentNotificationToggle = (notifToggle);

        localStorage.setItem('notificationToggle', currentNotificationToggle.toString());
        // localStorage.setItem('image', document.getElementById('image').value);

        // setSettings();

        currentNotificationTimes = JSON.parse(localStorage.getItem('notificationTimes')!);
        currentIntervalTimer = localStorage.getItem('intervalTimer')?.valueOf();
        //    currentNotificationToggle = (localStorage.getItem('notificationToggle') === "true" ? true:false);
    }

    function setSettings() {

        console.log("---set Settings---");

        localStorage.setItem('notificationTimes', JSON.stringify({ ...notifTimes }));
        localStorage.setItem('intervalTimer', intervalTimer.toString());
        // localStorage.setItem('notificationToggle', notificationToggle.toString());

        currentNotificationTimes = JSON.parse(localStorage.getItem('notificationTimes')!);
        currentIntervalTimer = localStorage.getItem('intervalTimer')?.valueOf();
        // currentNotificationToggle = localStorage.getItem('notificationToggle') === "true" ? true : false;

        console.log("currentNotificationTimes", currentNotificationTimes);
        console.log("currentIntervalTimer", currentIntervalTimer);
        console.log("currentNotificationToggle", currentNotificationToggle);

    }


    const handleSettingsChange = (e: any) => {
        console.log("setNotificationToggle", e);
        // const { name, value } = test;
        setNotifToggle(e);
        updateSettings();
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
                        notificationToggle={currentNotificationToggle}
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


