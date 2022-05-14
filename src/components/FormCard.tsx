import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import MoodSlider from './MoodSlider';
import MoodNote from './MoodNote';


const FormCard = (props: any): any => {


    return (
        <Card style={props.style}>

            <form
                className='flex justify-center flex-col items-center m-9'
            >
                <Typography

                    style={{ textAlign: "center" }}>
                    {/* Hi, {user?.email}<br /> */}
                    How is your MOOD level?

                </Typography>

                <MoodSlider
                    handleInputChange={props.handleInputChange}
                />

                <MoodNote
                    handleInputChange={props.handleInputChange}
                />
            </form>
        </Card>
    );
};

export default FormCard;

