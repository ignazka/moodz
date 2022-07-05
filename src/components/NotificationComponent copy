import Switch from '@mui/material/Switch';
import React, { useState, useEffect, useRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import SelectTime from './SelectTime';

const delay = 1;
// https://codesandbox.io/s/toggle-interval-with-useref-spcs2b?file=/src/App.js:1230-2098
function NotificationComponent(props: any) {
    console.log("notifComp",props);
    const notifToggle = props.notificationToggle;
   

    console.log("---------------------------FIRST RENDER--------------------------")
    const _ = require('lodash');
    const [notificationToggle, setNotificationToggle] = useState(notifToggle);
    const [open, setOpen] = useState(false);


    const initialNotifications = props.notificationTimes;
    const [notificationTimer, setNotificationTimer] = useState(initialNotifications);

    const [notifications, setNotifications] = useState(initialNotifications);
    // const [intervalIDArray,setIntervalIDArray] = useState({});


    const handleSelectTimeChange = (props: any) => {


        setOpen(false);
        setNotificationToggle(false);

        setNotifications({ ...notifications, [props.index]: { hour: props.hour, minute: props.minute } });

        setNotificationTimer({ ...notifications, [props.index]: { hour: props.hour, minute: props.minute } });


    };

    const [toggleValue, setToggleValue] = notifToggle;
    //we set toggleValue state to the same like toggleRef to force re-render
  
    let timer = useRef(NodeJS.Timeout); // save timer in useRef and pass it to child
    const [counter, setCounter] = useState(1);

    const intervalTimer = () => {
        notifToggle.current = !notifToggle.current;
        console.log("useEffect notifToggle updated", notifToggle.current);
        // useRef value stored in .current property
        if (notifToggle) {
          //get the latest value of state, not the value of first render
          setToggleValue((s: boolean) => (s = !s));
    
          //timer.current = setInterval(() => setCounter((c) => c + 1), delay * 1000);
          timer.current = setInterval(() => {
            setCounter((c) => c + 1);
            console.log("tick");
          }, delay * 1000);
        } else {
          setCounter(0);
          clearInterval(timer.current);
          setToggleValue((s: boolean) => (s = false));
        }
      };


      // function Child({ counter, currentTimer }) {
  function Child({ notifToggle, currentTimer }) {
    // this will clearInterval in parent component after counter gets to 5
    useEffect(() => {
      //führe den clearInterval gar nicht erst aus, solange der counter nicht bei 5 ist
      // if (counter <= 5) return; //it is a loop condition so to speak
      if (toggleValue) return; //it is a loop condition so to speak
      //currentTimer is also updated because with every call the intervalID changes
      // setCounter(0);
      clearInterval(currentTimer); //currentTimer stores the intervalID
      //counter is the number which counts up with each call
      //}, [toggleRef, currentTimer]); change in toggleRef doesn't force a re-render
      //instead we need observe the toggleValue state change
    }, [notifToggle, currentTimer]);

    return null;
  }

    let intervalID: NodeJS.Timeout;
    let intervalIDArray: any[] = [];

    let lastSetTimeoutId: any = null;

    const checkTimeAndStartLoop = (toggle: boolean) => {
        console.log("toggle?", toggle);
        if (toggle) {
            try {
                console.log("notificationToggle?", notificationToggle);
                console.log("TICK", lastSetTimeoutId);
                if (notifToggle) {
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



    const setGlobalNotifications = (test:any)  => {

        console.log("notificationToggle", notifToggle);
        console.log("setGlobalNotifications props",test);
       

        // console.log("test",test);
        // props.handleSettingsChange{(e) => { props.onChange(e.target.value) }};
      
        //  props.handleSettingsChange(test);
        
        // console.log("notifComp",props.handleSettingsChange({notificationToggle:notificationToggle}));
         props.handleSettingsChange(test);

        if (notifToggle) {
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


    };
    let times: (number | NodeJS.Timeout | undefined)[]=[];
    let timerID: number | NodeJS.Timeout | undefined;
    const testTimer = () => {
        
        console.log("testTimer toggle",notifToggle);
        

        if (notifToggle) {
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
                        checked={notifToggle}
                        onChange={intervalTimer}
                        onClick={() => {
                            setGlobalNotifications(!notifToggle);
                            // setOpen(!open);
                            // setGlobalNotifications(!open);
                            // let nT = !notificationToggle;
                            // setNotificationToggle(!notificationToggle);
                            // testTimer();
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

<Child
        
        currentTimer={timer.current}
        notifToggle={notifToggle}
      />



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


