import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useRecoilState } from 'recoil';
import { themeValue } from '../atoms/settingsAtom';
function Theme() {
    const [theme, setTheme] = useRecoilState(themeValue);

    const handleChange = ({ target }: any) => {
        setTheme(target.defaultValue);
    }
    return (
        <FormControl>
            <h1>Theme</h1>
            <RadioGroup
                defaultValue={theme}
                name="radio-buttons-group"
                onChange={handleChange}
            >
                <FormControlLabel value={0} control={<Radio />} label="Dark" />
                <FormControlLabel value={1} control={<Radio />} label="Light" />
            </RadioGroup>
        </FormControl>
    )
}
export default Theme