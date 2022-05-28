import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';


import { TextField } from '@mui/material';

function NotificationComponent() {
    const [notificationToggle, setNotificationToggle] = useState(false);
    const [open, setOpen] = useState(false);
    let notificationTimer = ["13:49","13:51"];

    const [timeTextfield, setTimeTextfield] = useState('14:10');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTimeTextfield(event.target.value);
    };

    let intervalID: NodeJS.Timeout;

    useEffect(() => {
        console.log("notificationToggle",notificationToggle);
        if (notificationToggle) {
            
            
            console.log("timer running");
            // eslint-disable-next-line react-hooks/exhaustive-deps
            notificationTimer = [timeTextfield];
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
            intervalID = setInterval(() => {
               //  console.log(intervalID);
                // eslint-disable-next-line array-callback-return
                notificationTimer.map((notificationTime) => {

                    const now = new Date();
                    const checkTime = now.getHours()+":"+now.getMinutes();
                    
                    console.log("check currentMinute", checkTime);
                    console.log("notificationTime", notificationTime);

                   

                    if (checkTime === notificationTime) {
                        // console.log("check time executed");
                        sendNotification();
                    }
        
                });
            }, 60000);//check every minute
        }
        return () => clearInterval(intervalID);
    }, [open]);


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
          }}
          
          >
            <FormControlLabel
            label="show notifications"
            labelPlacement="start"
            sx={{paddingBottom:2}}
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
            <TextField
        id="outlined-name"
        label="send notification at"
        value={timeTextfield}
        onChange={handleChange}
        
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


