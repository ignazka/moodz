import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Box } from '@mui/material';
import {setNotificationTime} from './notification-utils';
import { showNotification } from '../service-worker';

// type Props = {
//   onSave: (hours: number, minutes: number, seconds: number) => void;
// };
type Props = {
   
    onSave: (hours: String, minutes: String) => void;
    
  };

const NotificationTimeInput: React.FC<Props> = ({ onSave }) => {
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
//   const [seconds, setSeconds] = useState<string>('');

   const handleSave = async () => {
    // Convert the values to numbers and call the onSave function
    // onSave(Number(hours), Number(minutes), Number(seconds));
    // onSave(hours, minutes, seconds);
    
    // const sheduleNotification: Date = new Date();
    // sheduleNotification.setHours(Number(hours));
    // sheduleNotification.setMinutes(Number(minutes));
    // sheduleNotification.setSeconds(Number(seconds));
    console.log(hours+':'+minutes);
    await setNotificationTime(hours+':'+minutes);

//    await showNotification('moodz', 'settings saved', '/');
  };

  return (
    <Box

            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',
            }}

        >
      <FormControl sx={{ paddingBottom: 2 }}>
        <InputLabel htmlFor="hours">Hours</InputLabel>
        <Input id="hours" value={hours} onChange={(e) => setHours(e.target.value)} type="number" />
      </FormControl>
      <FormControl sx={{ paddingBottom: 2 }}>
        <InputLabel htmlFor="minutes">Minutes</InputLabel>
        <Input id="minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} type="number" />
      </FormControl>
      {/* <FormControl sx={{ paddingBottom: 2 }}>
        <InputLabel htmlFor="seconds">Seconds</InputLabel>
        <Input id="seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} type="number" />
      </FormControl> */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>

      <Button variant="contained" color="secondary" onClick={() => {showNotification('It is time for your notification!', { body: 'This is the body of the notification' });}}>
        show notification
      </Button>
    </Box>
  );
};

export default NotificationTimeInput;