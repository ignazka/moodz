import React, { useState } from 'react';
import { TextField } from '@mui/material';



interface handleFunctions {
    handleInputChange: (props: any) => void;
}

const MoodNote = ({ handleInputChange = (props: any) => { } }: handleFunctions): any => {


    const [moodNote, setMoodNote] = useState({ moodNote: '' });

    const handleChange = ({ target }: any) => {
        const { value } = target;
        setMoodNote({ moodNote: value });
        handleInputChange(target as any);
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
            name='moodNote'
            multiline={true}
            value={moodNote.moodNote}
            id='note'
        />


    );
};

export default MoodNote;

