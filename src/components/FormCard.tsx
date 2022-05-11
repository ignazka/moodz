import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import MoodSlider from './MoodSlider';



interface handleFunctions  {
   
    handleSliderChange : (newValue:number)=>void;
 
}
     const FormCard = ({handleSliderChange=(newValue:number)=>{}}:handleFunctions): any => {
    
    return (
        <Card style={{ marginTop: 30, margin: 15, padding: 0, marginBottom: 50 }}>

            <form
                className='flex justify-center flex-col items-center m-9'
            // onSubmit={handleSubmit}
            >
                <Typography

                    style={{ textAlign: "center" }}>
                    {/* Hi, {user?.email}<br /> */}
                    How is your MOOD level?

                </Typography>

                <MoodSlider
                    handleSliderChange={handleSliderChange}
                />

               {/*  <TextField
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
                /> */}
            </form>
        </Card>
    );
};

export default FormCard;

