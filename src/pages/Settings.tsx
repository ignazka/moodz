import { Card } from '@mui/material';
import NotificationComponent from '../components/NotificationComponent'
import Theme from '../components/Theme';

const Settings = (props: any): any => {

    return (
        <Card         
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 15, marginTop: 80, padding: 10, paddingTop: 20 }}>
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
