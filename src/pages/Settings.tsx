import { Card } from '@mui/material';
import { useState } from 'react';
import { notificationToggle } from '../atoms/settingsAtom';
import NotificationComponent from '../components/NotificationComponent'
import Theme from '../components/Theme';


const Settings = (props: any): any => {
    console.log({...props});
    const intervalIDArray:number[] = [];

    const handleIntervalChange = (intervalID:number) =>{
        // const values = {intervalID};
        console.log("handleIntervalChange Values: ",intervalID);
        

        intervalIDArray.push(intervalID);
        console.log(intervalIDArray);
        // setIntervalIDArray();
        //  setIntervalIDArray(...intervalIDArray.push(intervalID));
        return (intervalIDArray)
    };

    return (
        <div>
            <Card
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 15, marginTop: 80, padding: 10, paddingTop: 20 }}>
                <div className='settings-ctn'>
                    <Theme />
                </div>

            </Card >
            <Card
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: 15, padding: 10, paddingTop: 20 }}>
                <div className='settings-ctn'>
                    <NotificationComponent 
                    notificationToggle={notificationToggle}
                    handleIntervalChange={handleIntervalChange}
                    handleSettingsChange={props.handleSettingsChange}/>
                </div>
            </Card >

        </div>
    )
};

export default Settings;
