import useAuth from '../context/authContext';
import { ROUTES } from '../router/constants'
import { BottomNavigation, BottomNavigationAction, Fab, Paper } from '@mui/material';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import { moodzNote, sliderValue, submitMood } from '../atoms/moodzAtom'
import { useRecoilState } from 'recoil';
import { useMoodz } from '../hooks/useMoodz'
import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const BottomNav: any = (props: any) => {
    const [note, setNote] = useRecoilState(moodzNote);
    const [value, setValue] = useRecoilState(sliderValue);
    const [submit, setSubmit] = useRecoilState(submitMood)


    const { setMood, getMoodz } = useMoodz()
    const { logout } = useAuth();

    // const {error, data, loading} = useFetch();

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

                <Link to={ROUTES.settings}>
                    <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Settings" icon={<SettingsIcon />} />
                </Link>
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
                onClick={async () => {
                    try {


                        console.log('click submit')
                        setMood({ sliderValue: value, moodNote: note })
                        setValue(0)
                        setNote('')
                        setSubmit(!submit)
                        console.log(submit)
                    } catch (error) {
                        console.log(error)
                    }
                }}
                type="submit"
            >
                <SaveIcon />
            </Fab>
        </Paper>
    );
};

export default BottomNav;