import { Card } from '@mui/material';
import NotificationComponent from '../components/NotificationComponent'
import Theme from '../components/Theme';

const Settings = (props: any): any => {

    return (
        <Card sx={{
            padding: '2em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100vw'
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
