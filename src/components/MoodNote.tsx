import React, { useState } from 'react';


import { TextField } from '@mui/material';



interface handleFunctions {
    handleTextfieldChange: (newNote: string) => void
}

const MoodNote = ({ handleTextfieldChange = (newNote: string) => { } }: handleFunctions): any => {


    const [moodNote, setMoodNote] = useState({ newNote: '' });



    const handleChange = ({ target }: any) => {
        const { value } = target;
        setMoodNote({ newNote: value });
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
            value={moodNote.newNote}
            id='note'
        />


    );
};

export default MoodNote;

