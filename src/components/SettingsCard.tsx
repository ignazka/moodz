import React from 'react';
import Card from '@mui/material/Card';
import { Button, Typography } from '@mui/material';

import { createTheme } from '@mui/material/styles';


const SettingsCard = (props: any): any => {
    const { name, value } = props;
    console.log(props);
    const theme = createTheme({
        palette: {
            mode: 'dark',
            //mode: 'light',
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#ace6ac',
                // #b99747 dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            background: {
                default: '#ace6ac',

            },
            secondary: {
                main: '#ffd7a3',
                // #0044ff dark: will be calculated from palette.secondary.main,
                contrastText: '#2c2c2c',
            },
            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold: 3,
            // Used by the functions below to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,


        },


    });

    const handleInputChange = (props:any) => {
        const { name, value } = props;
        // console.log("inputTerm", { ...inputTerm, [name]: value });
        props.setSettings({ ...props.settings, [name]: value });
      };

    return (
        <Card style={props.style}>

            <form
                className='flex justify-center flex-col items-center m-9'
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

