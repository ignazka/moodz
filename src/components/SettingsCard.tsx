import React from 'react';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';

function SettingsCard(props: any) {

    const handleInputChange = (props: any) => {
        const { name, value } = props;
        // console.log("inputTerm", { ...inputTerm, [name]: value });
        props.setSettings({ ...props.settings, [name]: value });
    };

    return (
        <Card style={props.style}>

            <form

            >
                <Typography

                    style={{ textAlign: "center" }}>
                    {/* Hi, {user?.email}<br /> */}
                    How is your MOOD level?

                </Typography>
                {/* <Button 
                onClick={handleInputChange({theme})}
                label = 'save' /> */}


            </form>
        </Card>
    );
};

export default SettingsCard;

