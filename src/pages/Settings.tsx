import { Card } from '@mui/material';
import NotificationComponent from '../components/NotificationComponent'
import Theme from '../components/Theme';

const Settings = (props: any): any => {

    return (
        <Card sx={{
            padding: '2em', margin: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '70vw'
        }}>
            <div className='settings-ctn'>
                <Theme />
            </div>
            <div className='settings-ctn'>
                <NotificationComponent />
            </div>
        </Card >
    )
};

export default Settings;
