import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useRecoilState } from 'recoil'
import { themeValue } from '../atoms/settingsAtom'
import { useState } from 'react'




const Settings = (props: any): any => {

    const [theme, setTheme] = useRecoilState(themeValue);
    const [count, setCount] = useState(0)
    // const [notification, setNotification] = useRecoilState(notificationValue);

    const handleChange = ({ target }: any) => {
        setTheme(target.defaultValue)
        //  setNotification(target.defaultValue)
    }

    async function showNotification(body: any) {
        const registration = await navigator.serviceWorker.getRegistration();
        const title = 'How is your MOOD level?';


        const payload = {
            body
        }
        if (registration) {

            if ('showNotification' in registration) {
                registration.showNotification(title, payload);
                console.log(count)

            } else {
                new Notification(title, payload);
                console.log(count)

            }
        }



    }

    const sendNotification = async () => {
        const notification: any = document.getElementById('notification')
        console.log(notification.value)
        if (Notification.permission === 'granted') {
            showNotification(notification!.value)
            setCount(count + 1)
        } else {
            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    showNotification(notification!.value)
                    setCount(count + 1)

                }
            }
        }
    }

    // const notifyMe = ():any => {

    //     setNotification(1);

    //          console.log("target",notification);
    //         let duration = 2000;
    //         let count = 3;
    //     // console.log("duration", props.target.timeOut);
    //     // console.log("count", props.target.count);

    //     // Let's check if the browser supports notifications
    //     if (!("Notification" in window)) {
    //         alert("This browser does not support desktop notification");
    //     }

    //     // Let's check whether notification permissions have alredy been granted
    //     else if (Notification.permission === "granted") {
    //         // If it's okay let's create a notification
    //         var n = new Notification("Hi there!");
    //         console.log(n);

    //         new Notification(
    //             'MOODZ', 
    //             { 
    //             body: 'Buzz! Buzz! Notification Nr.:' + notification, 
    //             vibrate: [200, 100, 200, 100, 200, 100, 200], 
    //             tag: 'vibration-sample'
    //         });
    //         var i = notification;
    //         // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
    //         var interval = window.setInterval(function () {
    //             console.log("i", i);
    //             // Thanks to the tag, we should only see the "Hi! 9" notification
    //             var n = new Notification("Hi! " + i, {tag: 'MOODZ Notification'});
    //             console.log(n);
    //             // new Notification(
    //             //     'MOODZ', 
    //             //     { 
    //             //     body: 'Buzz! Buzz! Notification Nr.:' + i, 
    //             //     vibrate: [200, 100, 200, 100, 200, 100, 200], 
    //             //     tag: 'vibration-sample'
    //             // });

    //             setNotification(i);

    //             if (i++ === count) {
    //                 window.clearInterval(interval);
    //                 console.log("end notifications");
    //                 i = 1;
    //                 setNotification(i);
    //             }
    //         }, duration);
    //     }

    //     // Otherwise, we need to ask the user for permission
    //     else if (Notification.permission !== 'denied') {
    //         Notification.requestPermission(function (permission) {
    //             // If the user accepts, let's create a notification
    //             if (permission === "granted") {
    //                 new Notification("Hi there! You will get "+count+' notifications within '+(duration/1000)+' seconds apart');
    //             }
    //         });
    //     }

    //     // At last, if the user has denied notifications, and you
    //     // want to be respectful there is no need to bother them any more.
    // };

    return (
        <div className='Settings'>


            {/* <Paper > */}
            <Card sx={{ padding: '2em', margin: 15 }}>
                <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <RadioGroup
                        defaultValue={theme}
                        name="radio-buttons-group"
                        onChange={handleChange}

                    >
                        <FormControlLabel value={0} control={<Radio />} label="Dark" />
                        <FormControlLabel value={1} control={<Radio />} label="Light" />
                    </RadioGroup>
                </FormControl>
                <TextField type="text" label="Notification" id="notification" value="How is your Mood?"></TextField>
                <Button onClick={sendNotification}>Notification</Button>
                {count && <p>{count}</p>}
            </Card>

            {/* <Card sx={{ padding: '2em', margin: 15 }}>
                <FormControl>
                    <FormLabel>Notifications</FormLabel>
                    <Button
                        // onClick={notifyMe}    
                        onClick={showNotification}                    
                    >
                        notify me
                    </Button>
                    <Typography>
                        {notification}
                    </Typography>


                </FormControl>

            </Card> */}
            {/* </Paper> */}

        </div >

    );
}

export default Settings;
