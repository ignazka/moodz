import { useState } from 'react';
import { TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { moodzNote } from '../atoms/moodzAtom';



function MoodNote() {



    const [note, setNote] = useRecoilState(moodzNote);

    const handleChange = ({ target }: any) => {
        setNote(target.value);
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
            value={note}
            id='note'
        />


    );
};

export default MoodNote;

