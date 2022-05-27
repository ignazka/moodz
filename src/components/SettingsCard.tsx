import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

function SettingsCard(props: any) {
    return (
        <Card style={props.style}>
            <form
                className='flex justify-center flex-col items-center m-9'
            >
                <Typography
                    style={{ textAlign: "center" }}>
                    How is your MOOD level?
                </Typography>
            </form>
        </Card>
    );
};

export default SettingsCard;

