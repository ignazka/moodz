import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Box } from '@mui/material';

type Props = {
  onSave: (hours: number, minutes: number, seconds: number) => void;
};

const NotificationTimeInput: React.FC<Props> = ({ onSave }) => {
  const [hours, setHours] = useState<number | string>('');
  const [minutes, setMinutes] = useState<number | string>('');
  const [seconds, setSeconds] = useState<number | string>('');

  const handleSave = () => {
    // Convert the values to numbers and call the onSave function
    onSave(Number(hours), Number(minutes), Number(seconds));
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
      <FormControl sx={{ paddingBottom: 2 }}>
        <InputLabel htmlFor="seconds">Seconds</InputLabel>
        <Input id="seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} type="number" />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default NotificationTimeInput;