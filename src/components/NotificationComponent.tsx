import Switch from '@mui/material/Switch';
import React, { useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import SelectTime from './SelectTime';

const delay = 1;
// https://codesandbox.io/s/toggle-interval-with-useref-spcs2b?file=/src/App.js:1230-2098
function NotificationComponent(props: any) {
    console.log("notifComp", props);
    let notifToggle = props.notificationToggle;
    let intervalTimer = useRef(props.intervalTimer);
    let notificationTimes = props.notificationTimes;

    // const setNotifTimes=props.setNotifTimes;


    // console.log("---------------------------FIRST RENDER--------------------------")
    const _ = require('lodash');
    const notificationToggle = useRef(notifToggle);
    console.log("notificationTimes", notificationTimes);



    const handleSelectTimeChange = (times: any) => {

        console.log("set time change", times);
        props.setNotifTimes({ ...notificationTimes, [times.index]: { hour: times.hour, minute: times.minute } });
        console.log("notificationTimes changed", notificationTimes);



    };


    // const [toggleValue, setToggleValue] = useState(notifToggle);
    //we set toggleValue state to the same like toggleRef to force re-render




    function checkTimes() {
        console.log("checktimes notificationTimes.current", notificationTimes);
        // eslint-disable-next-line array-callback-return
        Object.keys(notificationTimes).map((item, i) => {
            const now = new Date();
            // const checkTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
            const checkTime = { hour: now.getHours(), minute: now.getMinutes() };



            console.log("compare current checkTime: " + Object.values(checkTime) + " with notificationTimer: " + Object.values(notificationTimes[i]));


            if (_.isEqual(checkTime, notificationTimes[i])) {
                console.log("send notification!");
                sendNotification();
            }
            else {
                console.log("not the same time");
            }


        });
    }

    const resetNotifications = () => {
        notifToggle = false;
        notificationToggle.current = notifToggle;
        props.handleSettingsChange(notifToggle);
        clearInterval(intervalTimer.current);

        console.log("reset notifications");
    };


    const setGlobalNotifications = () => {

        console.log("notificationTimer is running...");
        // console.table(notificationTimes.current);


        notificationToggle.current = !notifToggle;
        props.handleSettingsChange(notificationToggle.current);
        // notifToggle = !notifToggle;
        console.log("useEffect notifToggle updated to:", notificationToggle.current);
        // useRef value stored in .current property
        if (notificationToggle.current) {


            //get the latest value of state, not the value of first render
            // setToggleValue((s: boolean) => (s = !s));

            props.setIntervalTimer(intervalTimer.current = setInterval(() => {

                console.log("tick intervalTimer", intervalTimer.current);
                checkTimes();

            }, delay * 60000));
        } else {

            clearInterval(intervalTimer.current);

            console.log("clear tick", intervalTimer.current);
            // setToggleValue((s: boolean) => (s = false));
        }



    };

    const showNotification = async (body: any) => {

        const registration = await navigator.serviceWorker.getRegistration();

        

        const title = 'MOODZ: Friendly Reminder.';
        const img = '/android-icon-192x192.png';
        const notAct = () => {console.log('code to show more images')};

        const notificationsProperties = {
            body,
            icon: img,
            image: "https://picsum.photos/400",
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

    

    const sendNotification = async () => {
        console.log("sendNotification executed");

        if (Notification.permission === 'granted') {
            showNotification('What is your Mood right now? \n Click on this Notification to add a new MOODZ value');
        } else {
            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    showNotification('Notifications are now activated');
                }
            }
        }
    };


    return (
        <Box

            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            }}

        >
            <FormControlLabel
                label="show notifications"
                // labelPlacement="start"
                sx={{ paddingBottom: 2 }}
                control={
                    <Switch
                        name="notification-toggle"
                        checked={notifToggle}
                        onChange={setGlobalNotifications}
                        onClick={() => {
                            console.log("switch toggle clicked");
                            checkTimes();
                            sendNotification();
                        }}

                    />
                }

            />
            {Object.values(notificationTimes).map((timer, index) => (
                <SelectTime
                    key={index}
                    index={index}
                    notificationValues={timer}
                    handleSelectTimeChange={handleSelectTimeChange}
                    value={timer}
                    onClick={() => {
                        resetNotifications();
                    }}
                >
                    {timer}
                </SelectTime>

            ))}


            {/* {open && (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
               setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Notifications are set.
        </Alert>
      )} */}
        </Box>
    );
}

export default NotificationComponent;


