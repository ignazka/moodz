import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { useRecoilState } from 'recoil';
import { sliderValue } from '../atoms/moodzAtom';

function MoodSlider() {

    const [value, setValue] = useRecoilState(sliderValue);


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
        setValue(target.value as number);
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
            value={value}
            track={false}
        />
    );
};

export default MoodSlider;

