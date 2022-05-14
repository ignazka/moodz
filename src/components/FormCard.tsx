import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import MoodSlider from './MoodSlider';
import MoodNote from './MoodNote';



interface handleFunctions {
    handleInputChange: (props: any) => void;

}

const FormCard = ({ style }: any, { handleInputChange = (props: any) => { } }: handleFunctions): any => {

    return (
        <Card style={style}>

            <form
                className='flex justify-center flex-col items-center m-9'
            >
                <Typography

                    style={{ textAlign: "center" }}>
                    {/* Hi, {user?.email}<br /> */}
                    How is your MOOD level?

                </Typography>

                <MoodSlider
                    handleInputChange={handleInputChange}
                />

                <MoodNote
                    handleInputChange={handleInputChange}
                />
            </form>
        </Card>
    );
};

export default FormCard;

