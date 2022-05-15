import { Card, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { useRecoilState } from 'recoil'
import { themeValue } from '../atoms/settingsAtom'



const Settings = (props: any): any => {

    const [theme, setTheme] = useRecoilState(themeValue)

    const handleChange = ({ target }: any) => {
        console.log(target.defaultValue)
        setTheme(target.defaultValue)
    }
    return (
        <div className='Settings'>
            <Card>

                <Paper sx={{ padding: '2em' }}>

                    <FormControl>
                        <FormLabel>Theme</FormLabel>
                        <RadioGroup
                            defaultValue={theme}
                            name="radio-buttons-group"
                            onChange={handleChange}

                        >
                            <FormControlLabel value={0} control={<Radio />} label="Dark" />
                            <FormControlLabel value={1} control={<Radio />} label="Light" />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Card>
        </div >

    );
}

export default Settings;
