import { Card, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useRecoilState } from 'recoil'
import { themeValue } from '../atoms/settingsAtom'



const Settings = (props: any): any => {

    const [, setTheme] = useRecoilState(themeValue)

    const handleChange = ({ target }: any) => {
        switch (target.defaultValue) {
            case 'dark':
                setTheme(0)
                break;
            case 'light':
                setTheme(1)
                break;
            default:
        }
    }
    return (
        <div className='Settings'>
            <Card>

                <Paper sx={{ padding: '2em' }}>

                    <FormControl>
                        <FormLabel>Theme</FormLabel>
                        <RadioGroup
                            defaultValue="dark"
                            name="radio-buttons-group"
                            onChange={handleChange}

                        >
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                            <FormControlLabel value="light" control={<Radio />} label="Light" />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Card>
        </div >

    );
}

export default Settings;
