import { useState, useEffect} from 'react';
import Box from '@mui/material/Box';


import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function SelectTime(props: any) {
    // console.log("props",props);

    const index = props.index;
    const [hour, setHour] = useState(props.children.hour);
    const [minute, setMinute] = useState(props.children.minute);


    const handleHourChange = (event: SelectChangeEvent) => {
        setHour(event.target.value);
    };

    const handleMinuteChange = (event: SelectChangeEvent) => {
        setMinute(event.target.value);
    };



    useEffect(() => {

        const timer = { index: index, hour: hour, minute: minute };

        props.handleSelectTimeChange(timer);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hour, minute]);

    return (
        <Box onClick={props.onClick}

            sx={{
                display: 'flex',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center',marginBottom:3.5,
            }}
     

        >
            <FormControl
            sx={{
                paddingRight:1,
            }}>
                <InputLabel id="demo-simple-select-label">Hour</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    name="hour"

                    value={hour.toString()}
                    label="Hour"
                    onChange={handleHourChange}
                >

                    <MenuItem value={6} key={6}>06</MenuItem>
                    <MenuItem value={7} key={7}>07</MenuItem>
                    <MenuItem value={8} key={8}>08</MenuItem>
                    <MenuItem value={9} key={9}>09</MenuItem>
                    <MenuItem value={10} key={10}>10</MenuItem>
                    <MenuItem value={11} key={11}>11</MenuItem>
                    <MenuItem value={12} key={12}>12</MenuItem>
                    <MenuItem value={13} key={13}>13</MenuItem>
                    <MenuItem value={14} key={14}>14</MenuItem>
                    <MenuItem value={15} key={15}>15</MenuItem>
                    <MenuItem value={16} key={16}>16</MenuItem>
                    <MenuItem value={17} key={17}>17</MenuItem>
                    <MenuItem value={18} key={18}>18</MenuItem>
                    <MenuItem value={19} key={19}>19</MenuItem>
                    <MenuItem value={20} key={20}>20</MenuItem>
                    <MenuItem value={21} key={21}>21</MenuItem>
                    <MenuItem value={22} key={22}>22</MenuItem>
                    <MenuItem value={23} key={23}>23</MenuItem>

                    {/* {hours.map((hour) => (
                    <MenuItem value={hour}>
                        {hour}
                    </MenuItem> 
                ))} */}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Minute</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    name="minute"
                    value={minute.toString()}
                    label="Minute"


                    onChange={handleMinuteChange}
                >

                    <MenuItem value={0o0} key={0}>00</MenuItem>
                    <MenuItem value={15}  key={15}>15</MenuItem>
                    <MenuItem value={30} key={30}>30</MenuItem>
                    <MenuItem value={45} key={45}>45</MenuItem>

                    {/* {hourElements} */}
                </Select>
            </FormControl>


        </Box>
    );
}

export default SelectTime;


