import React, { useState } from 'react';

import Slider from '@mui/material/Slider';



interface handleFunctions {
    handleSliderChange: (newValue: number) => void
}

const MoodSlider = ({ handleSliderChange = (newValue: number) => { } }: handleFunctions): any => {

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

    );
};

export default MoodSlider;

