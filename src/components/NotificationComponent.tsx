import Switch from '@mui/material/Switch';
import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import SelectTime from './SelectTime';


function NotificationComponent(props: any) {

    const notifRef = useRef(props.notificationToggle.value||false);
   

    console.log("---------------------------FIRST RENDER--------------------------")
    const _ = require('lodash');
    const [notificationToggle, setNotificationToggle] = useState(notifRef.current);
    const [open, setOpen] = useState(false);


    const initialNotifications = [{ hour: 8, minute: 30 }, { hour: 15, minute: 0 }, { hour: 18, minute: 7 }];
    const [notificationTimer, setNotificationTimer] = useState(initialNotifications);

    const [notifications, setNotifications] = useState(initialNotifications);
    // const [intervalIDArray,setIntervalIDArray] = useState({});


    const handleSelectTimeChange = (props: any) => {


        setOpen(false);
        setNotificationToggle(false);

        setNotifications({ ...notifications, [props.index]: { hour: props.hour, minute: props.minute } });

        setNotificationTimer({ ...notifications, [props.index]: { hour: props.hour, minute: props.minute } });


    };



    let intervalID: NodeJS.Timeout;
    let intervalIDArray: any[] = [];

    let lastSetTimeoutId: any = null;

    const checkTimeAndStartLoop = (toggle: boolean) => {
        console.log("toggle?", toggle);
        if (toggle) {
            try {
                console.log("notificationToggle?", notificationToggle);
                // const browser = await puppeteer.launch();
                // const page = await browser.newPage();
                // await page.goto(url);
                // const content = await page.content();
                // console.log(content);
                // await browser.close();
                console.log("TICK", lastSetTimeoutId);
                if (notificationToggle) {
                    console.log("toggle?", toggle);
                    lastSetTimeoutId = setTimeout(checkTimeAndStartLoop, 3 * 1000);

                }
                else {
                    console.log("clear TICK", lastSetTimeoutId);
                    clearTimeout(lastSetTimeoutId);
                }
            }
            catch (err) {
                console.error("Error in checkTimeAndStartLoop: %o", err);
            }
        }
    };



    const setGlobalNotifications = (): (() => void) | undefined => {

        console.log("notificationToggle", notificationToggle);

        
        console.log("notifComp",props.handleSettingsChange({notificationToggle:notificationToggle}));
        // props.handleSettingsChange({"notificationToggle":notificationToggle});

        if (notificationToggle && open) {
            console.log("notificationTimer is running...");
            console.table(notificationTimer);





            // eslint-disable-next-line react-hooks/exhaustive-deps
            const intervalID = setInterval(() => {
                // intervalID = setInterval(() => {                    
                console.log(notificationTimer);
                // eslint-disable-next-line array-callback-return
                Object.keys(notificationTimer).map((item, i) => {
                    const now = new Date();
                    // const checkTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
                    const checkTime = { hour: now.getHours(), minute: now.getMinutes() };



                    console.log("compare current checkTime: " + Object.values(checkTime) + " with notificationTimer: " + Object.values(notificationTimer[i]));


                    if (_.isEqual(checkTime, notificationTimer[i])) {
                        console.log("send notification!");
                        sendNotification();
                    }
                    else {
                        console.log("not the same time");
                    }


                });


            }, 6000);//60000 = check every minute
            console.log("intervalID", intervalID);
            intervalIDArray = props.handleIntervalChange(intervalID);

            // invervalIDArray.push(...invervalIDArray,intervalID);
            // ...intervalIDArray,intervalID;
            // intervalIDArray.push(intervalID);
            // console.log(intervalIDArray);
            // intervalIDArray.push(...intervalIDArray, intervalID);
            return () => {
                window.clearTimeout(lastSetTimeoutId);
                // intervalIDArray.map((intervalID,index) => (
                clearInterval(intervalID);


            };
        }

        // else {
        //     // intervalIDArray.push(intervalID);
        //     // console.table(intervalIDArray);
        //     window.clearTimeout(lastSetTimeoutId);
        //     // return () => {
        //     //     window.clearTimeout(lastSetTimeoutId);
        //     //     // intervalIDArray.map((intervalID,index) => (
        //     //     clearInterval(intervalID);


        //     // };
        // }
    };
    let times: (number | NodeJS.Timeout | undefined)[]=[];
    let timerID: number | NodeJS.Timeout | undefined;
    const testTimer = () => {
        
        console.log("testTimer toggle",notificationToggle);
        

        if (notificationToggle) {
            timerID = setTimeout(function doSomething() {
                console.log("3 seconds, ",timerID);
                setTimeout(doSomething, 3000);
            }, 3000);
            console.log(timerID);
            
            return timerID;
        } else {
            clearTimeout(Number(timerID));
        }
        times.push(...times,timerID);
            console.log(times);
        return timerID;
    };



    useEffect(() => {
        console.log(testTimer);
        
        
        if(open){
            setNotificationToggle(true);
            
        }else{
            setNotificationToggle(false);
            // clearTimeout(testTimer.timerID);
        }

        // const interval = setInterval(() => console.log("lala"), 1000);
        // return () => {
        //   clearInterval(interval);
        // };

        // const timer = setTimeout(() => console.log("lala"), 1000);

        //   return () => clearTimeout(timer);

        // console.log("notificationToggle", notificationToggle);
        // if (notificationToggle) {

        //     console.log("notificationTimer is running...");
        //     console.table(notificationTimer);


        //     checkTimeAndStartLoop();


        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        //     intervalID = setInterval(() => {                    
        //         console.log("check time",notificationTimer);
        //         // eslint-disable-next-line array-callback-return
        //         Object.keys(notificationTimer).map((item, i) => {
        //             const now = new Date();
        //             // const checkTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
        //             const checkTime = { hour: now.getHours(), minute: now.getMinutes() };



        //             // console.log("compare current checkTime: "+Object.values(checkTime)+" with notificationTimer: "+ Object.values(notificationTimer[i]));


        //             if (_.isEqual(checkTime, notificationTimer[i]) ) {
        //                 console.log("send notification!");
        //                 sendNotification();
        //             }
        //             else{
        //                 console.log("not the same time");
        //             }


        //         });


        //     }, 5000);//60000 = check every minute
        // }
        // return () => clearInterval(intervalID);
        // }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    // }, [open]);

    // useEffect(() => {
    //     let isCurrent = true;

    //       if (isCurrent) {
    //         checkTimeAndStartLoop(notificationToggle)
    //         console.log("do something");
    //       }

    //     return () => {
    //       isCurrent = false;
    //     }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [notificationToggle]);

    const showNotification = async (body: any) => {
        const registration = await navigator.serviceWorker.getRegistration();
        const title = 'MOODZ: Friendly Reminder.';
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
            showNotification('What is your Mood right now?');
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
                            setGlobalNotifications();
                            // let nT = !notificationToggle;
                            // setNotificationToggle(!notificationToggle);
                            testTimer();
                        }}

                    />
                }

            />
            {Object.values(notificationTimer).map((timer, index) => (
                <SelectTime key={index}
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


