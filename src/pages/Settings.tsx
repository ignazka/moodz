import React, { useEffect, useState } from 'react';
import { AppBar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//components
import SettingsCard from '../components/FormCard';
// import Moodchart from '../components/Moodchart';
import BottomNav from '../components/BottomNav';
// import { useFetch } from '../hooks/useFetch';




const Settings= (props: any): any => {


    // const { data, loading, error } = useFetch(() => { }, []);

   


    
    // // form handler

    //   const handleInputChange = (props: any) => {
    //     const { name, value } = props;
    //     // console.log("inputTerm", { ...inputTerm, [name]: value });
    //     setSettings({ ...settings, [name]: value });
    //   };


    //   useEffect(() => {

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, []);

    return (
        <ThemeProvider theme={props.theme}
        >
            <div className=''>
                <AppBar className="appbar" color="inherit">
                    <Typography className="apptitle" align="center" variant="h3">
                        MOODZ
                    </Typography>

                </AppBar>




                {/* ------------- FORM -------------- */}



                <SettingsCard
                    handleInputChange={props.handleSettingsChange}
                    style={{ marginTop: 50, margin: 15, padding: 0, marginBottom: 85 }}

                />

                <BottomNav
                    setSettings={props.setSettings}
                />

            </div>
        </ThemeProvider>
    );
}

export default Settings;
