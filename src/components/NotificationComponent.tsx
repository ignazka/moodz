import Switch from "@mui/material/Switch"
import { useState } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel"




function NotificationComponent() {

    const [notificationToggle, setNotificationToggle] = useState(false)
    const getRegistration = async () => {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            return registration;
        } catch (error) {

        }
    }

    // const now = new Date()
    // const eightOClock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0).getTime() - now.getTime();
    // const twelveOClock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0).getTime() - now.getTime();
    // const sixOClockPM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0).getTime() - now.getTime();

    if (notificationToggle) {

        setTimeout(function () { sendNotification() }, 120000);
        // setTimeout(function () { sendNotification() }, twelveOClock);

        // setTimeout(function () { sendNotification() }, sixOClockPM);
    }


    const showNotification = (body: any) => {
        const title = 'moodZ: Friendly Reminder.';
        const payload = {
            body
        };
        getRegistration().then((registration) => {
            if (registration) {
                if ('showNotification' in registration) {
                    registration.showNotification(title, payload);
                }
                else {
                    new Notification(title, payload);
                }
            }
        })


    };


    const sendNotification = async () => {
        if (Notification.permission === 'granted') {
            showNotification('What is your Mood?');
        }
        else {
            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    showNotification('What is your Mood?');
                }
            }
        }
    };



    return (
        <FormControlLabel
            control={
                <Switch name="notification-toggle" value={notificationToggle} onClick={() => { setNotificationToggle(!notificationToggle) }} />
            }
            label="Enable/Disable Notifications"
        />
    )
}

export default NotificationComponent