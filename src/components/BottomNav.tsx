import React from 'react';
import useAuth from '../context/authContext';

import { BottomNavigation, BottomNavigationAction, Fab, Paper} from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';

interface handleFunctions{
    setMood: ()=>void
}


const BottomNav=({ setMood = () => {}}: handleFunctions):any => {
const { logout } = useAuth();

// const handleSubmit = (event: any) => {
//     event.preventDefault();
//     setMood();
//     getMoodz();
//   };
   
    return (
        <Paper>
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

<Fab
          style={{
            minWidth: 'auto',
            bottom: 20,
            transform: 'scale(1.4)',
            position: 'fixed',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
          }}
          color="primary"
          aria-label="save"
          onClick={setMood}
          type="submit"
        >
          <SaveIcon />
        </Fab>
        </Paper>
    );
};

export default BottomNav;