import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useRecoilState } from 'recoil'
import { themeValue, notificationValue } from '../atoms/settingsAtom'




const Settings = (props: any): any => {

    const [theme, setTheme] = useRecoilState(themeValue);
    const [notification, setNotification] = useRecoilState(notificationValue);

    const handleChange = ({ target }: any) => {
        console.log(target.defaultValue)
        setTheme(target.defaultValue)
        //  setNotification(target.defaultValue)
    }

    async function showNotification() {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
            const noti = new Notification('Hello!', {
                body: 'It’s me.',
                // icon: 'mario.png'
            });
            noti.onclick = () => alert('clicked');
            setNotification(1);
        }
    }
    showNotification();

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
