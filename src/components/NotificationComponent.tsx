import Switch from "@mui/material/Switch"
import { useState, useEffect } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from '@mui/icons-material/Close';
import Card from "@mui/material/Card"




function NotificationComponent() {

    const [notificationToggle, setNotificationToggle] = useState(false)
    const [open, setOpen] = useState(false)

    const now = new Date()
    const eightOClock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0, 0).getTime() - now.getTime();
    const twelveOClock = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0).getTime() - now.getTime();
    const sixOClockPM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 35, 0, 0).getTime() - now.getTime();


    useEffect(() => {
        let timer1;
        let timer2;
        let timer3;
        if (notificationToggle) {
            timer1 = setTimeout(function () {
                sendNotification()
            }, eightOClock);
            timer2 = setTimeout(function () { sendNotification() }, twelveOClock);
            timer3 = setTimeout(function () { sendNotification() }, sixOClockPM);

        } else {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)

        }
    }, [notificationToggle])


    const showNotification = async (body: any) => {
        const registration = await navigator.serviceWorker.getRegistration();
        const title = 'moodZ: Friendly Reminder.';
        const payload = {
            body
        };
        if (registration) {
            if ('showNotification' in registration) {
                registration.showNotification(title, payload);
            }
            else {
                new Notification(title, payload);
            }
        }
    }

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
        <Card>

            <FormControlLabel
                control={
                    <Switch name="notification-toggle" value={notificationToggle} onClick={() => {

                        setNotificationToggle(!notificationToggle)
                        if (!notificationToggle) {
                            setOpen(true)

                        }
                        if (notificationToggle) {
                            setTimeout(function () { setOpen(false) }, 4000);
                        }
                    }} />

                }
                label="Enable/Disable Notifications"
            />
            {
                (notificationToggle && open) && (
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

                )
            }
        </Card>
    )
}

export default NotificationComponent