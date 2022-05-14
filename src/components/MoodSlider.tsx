import React, { useState } from 'react';
import Slider from '@mui/material/Slider';


interface handleFunctions {
    handleInputChange: (props: any) => void;
}

const MoodSlider = ({ handleInputChange = (props: any) => { } }: handleFunctions): any => {

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

    const handleChange = ({ target }: any) => {
        setSliderValue(target.value as number);
        handleInputChange(target as any);
    };


    return (
        <Slider
            style={{ marginTop: 50, marginBottom: 30 }}
            name='sliderValue'
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

