import React, { useState } from 'react';


import { TextField } from '@mui/material';



interface handleFunctions {
    handleTextfieldChange: (note: string) => void
}

const MoodNote = ({ handleTextfieldChange = (note: string) => { } }: handleFunctions): any => {


    const [moodNote, setMoodNote] = useState({ note: '' });



    const handleChange = ({ target }: any) => {
        const { value } = target;
        setMoodNote({ note: value });
        handleTextfieldChange(value as string);
    };

    return (

        <TextField
            sx={{
                margin: '.5em',
                width: '100%',
                maxWidth: 400,
            }}
            onChange={handleChange}
            color='secondary'
            variant='outlined'
            label='Add Note (optional)'
            name='note'
            multiline={true}
            value={moodNote.note}
            id='note'
        />


    );
};

export default MoodNote;

