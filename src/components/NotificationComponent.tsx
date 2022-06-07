import Switch from '@mui/material/Switch';
import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import SelectTime from './SelectTime';


function NotificationComponent() {
    const _ = require('lodash'); 
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [open, setOpen] = useState(false);


    const initialNotifications = [{ hour: 8, minute: 30 }, { hour: 15, minute: 0 }, { hour: 20, minute: 0 }];
    const [notificationTimer, setNotificationTimer] = useState(initialNotifications);

    const [notifications, setNotifications] = useState(initialNotifications);
    const handleSelectTimeChange = (props:any) => {
       
  
        setOpen(false);
        setNotificationToggle(false);


        setNotifications({...notifications,[props.index]: {hour:props.hour,minute:props.minute}});

        setNotificationTimer({ ...notifications, [props.index]: {hour:props.hour,minute:props.minute} });

    };



    let intervalID: NodeJS.Timeout;

    useEffect(() => {
        console.log("notificationToggle", notificationToggle);
        if (notificationToggle) {
            console.log("notificationTimer is running...");
            console.table(notificationTimer);





            // eslint-disable-next-line react-hooks/exhaustive-deps
            intervalID = setInterval(() => {                    
                console.log(notificationTimer);
                // eslint-disable-next-line array-callback-return
                Object.keys(notificationTimer).map((item, i) => {
                    const now = new Date();
                    // const checkTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
                    const checkTime = { hour: now.getHours(), minute: now.getMinutes() };



                    console.log("compare current checkTime: "+Object.values(checkTime)+" with notificationTimer: "+ Object.values(notificationTimer[i]));
  
                  
                    if (_.isEqual(checkTime, notificationTimer[i]) ) {
                        console.log("send notification!");
                        sendNotification();
                    }
                    else{
                        console.log("not the same time");
                    }
                    

                });


            }, 60000);//60000 = check every minute
        }
        return () => clearInterval(intervalID);
    }, [open,notifications]);


    const showNotification = async (body: any) => {
        const registration = await navigator.serviceWorker.getRegistration();
        const title = 'moodZ: Friendly Reminder.';
        const payload = {
            body,
        };
        if (registration) {
            if ('showNotification' in registration) {
                registration.showNotification(title, payload);
            } else {
                new Notification(title, payload);
            }
        }
    };

    const sendNotification = async () => {
        console.log("sendNotification executed");

        if (Notification.permission === 'granted') {
            showNotification('What is your Mood?');
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
                        // checked={open}
                        checked={notificationToggle}
                        onClick={() => {
                            setOpen(!open);
                            setNotificationToggle(!notificationToggle)
                        }}

                    />
                }

            />
{Object.values(notificationTimer).map((timer,index) => (
    <SelectTime 
                index={index}
                notificationValues={timer}
                // onClick={handleTimeChange}
                handleSelectTimeChange={handleSelectTimeChange}
                    
                value={timer} 
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


