import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import MoodSlider from './MoodSlider';
import MoodNote from './MoodNote';



interface handleFunctions {

    handleSliderChange: (newValue: number) => void;
    handleTextfieldChange: (note: string) => void;

}
const FormCard = ({ handleSliderChange = (newValue: number) => { }, handleTextfieldChange = (note) => { } }: handleFunctions): any => {

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

                <MoodNote
                    handleTextfieldChange={handleTextfieldChange}
                />
            </form>
        </Card>
    );
};

export default FormCard;

