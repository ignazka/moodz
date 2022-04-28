import React, { useEffect, useState } from 'react';
import useAuth from '../context/authContext';

import { BottomNavigation, BottomNavigationAction} from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


function BottomNav(){
const { logout } = useAuth();


   
    return (
        <BottomNavigation
            showLabels={true}
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                zIndex: '1'
            }}
        >
            <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Values" icon={<RestoreIcon />} />
            <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Home" icon={<FavoriteIcon />} />
            {/* placeholder for FAB */}
            <BottomNavigationAction sx={{ minWidth: 'auto' }} label="save" showLabel={false} />;

            <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Settings" icon={<SettingsIcon />} />
            <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Logout" icon={<LogoutIcon />} onClick={logout} />
        </BottomNavigation>



    );
};

export default BottomNav;