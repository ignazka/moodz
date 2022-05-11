import React, { useState } from 'react';


import { TextField } from '@mui/material';



interface handleFunctions {
    handleTextfieldChange: (note: string) => void
}

const MoodNote = ({ handleTextfieldChange = (note: string) => { } }: handleFunctions): any => {

 
    const [moodNote, setMoodNote] = useState({note: '' });





    /* const handleChange = (event: Event, newValue: number | number[]) => {
        console.log(newValue);
        handleSliderChange(newValue as number);
        setSliderValue(newValue as number);
    }; */

    const handleChange = ({ target }: any) => {
        const { note, value } = target;
        setMoodNote({ ...note, [note]: value });
      };

    return (
        
        <TextField
        sx={{
            margin: '.5em',
            width: '100%',
            maxWidth: 400,
        }}
        color='secondary'
        variant='outlined'
        label='Add Note (optional)'
        name='note'
        multiline={true}
        id='note'
    />
              

    );
};

export default MoodNote;

