import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import { TextField, Typography } from '@mui/material';


interface handleFunctions {
    handleSliderChange: (newValue: number) => void
}

const FormCard = ({ handleSliderChange = (newValue: number) => { } }: handleFunctions): any => {

    const [sliderValue, setSliderValue] = useState(0);

    const sliderMarks = [
        {
            value: -10,
            label: '-10',
        },
        {
            value: 10,
            label: '10',
        },
    ];



    const handleChange = (event: Event, newValue: number | number[]) => {
        console.log(newValue);
        handleSliderChange(newValue as number);
        setSliderValue(newValue as number);
    };

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
                <Slider
                    style={{ marginTop: 50, marginBottom: 30 }}
                    name='value'
                    onChange={handleChange}
                    aria-labelledby="discrete-slider-small-steps"
                    defaultValue={0}
                    step={0.5}
                    min={-10}
                    max={10}
                    marks={sliderMarks}

                    valueLabelDisplay="on"
                    value={sliderValue}
                    track={false}
                />


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
            </form>
        </Card>
    );
};

export default FormCard;

