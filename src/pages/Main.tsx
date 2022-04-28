import React, { useEffect, useState } from 'react';
import useAuth from '../context/authContext';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AppBar, BottomNavigation, BottomNavigationAction, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';

//components
import Moodchart from '../components/Moodchart';


function Main() {
  const { user, logout } = useAuth();
  // const { data, loading, error } = useFetch(() => {}, []);

  const [inputTerm, setInputTerm] = useState({ value: 0, note: '' });
  const [moodz, setMoodz] = useState<any | null>([{}]);
  const [sliderValue, setSliderValue] = useState(0);




  const theme = createTheme({
    palette: {
      // type:dark,
      mode: 'dark',
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#b8ebb8',
        // #b99747 dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      background: {
        default: '#b8ebb8',

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

  /**
   * send data to firebase
   **/

  const setMood = async () => {
    try {
      await addDoc(collection(db, `users/${user?.uid}/moodz`), {
        value: sliderValue,
        note: inputTerm?.note,
        user: user?.uid,
        addedAt: Timestamp.fromDate(new Date()),
      });
      setInputTerm({ value: 0, note: '' });
    } catch (e) {
      console.log(e);
    } finally {
      setInputTerm({ value: 0, note: '' });
    }
  };

  /**
   * get data from firebase
   */
  const getMoodz = async () => {
    const querySnapshot = await getDocs(
      collection(db, `users/${user?.uid}/moodz`)
    );
    let arr: any = [];
    querySnapshot.forEach(doc => {
      // console.log(doc.id, ' => ', doc.data());
      arr.push({
        name: doc.data().addedAt.seconds,
        moodLevel: doc.data().value,
        note: doc.data().note,
      });
    });
    const sorted = arr.sort((a: any, b: any): any => a.name - b.name);
    arr = [{}];
    sorted.forEach((element: any) => {
      arr.push({
        name: new Date(element.name * 1000).toLocaleDateString(),
        moodLevel: element.moodLevel,
        note: element.note,
      });
    });
    setMoodz(arr);
  };

  // form handler

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMood();
    getMoodz();
  };

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  useEffect(() => {
    getMoodz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliderMarks = [
    {
      value: -10,
      label: '-10',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  return (
    <ThemeProvider theme={theme}
    >
      <div className=''>
        <AppBar className="appbar" color="inherit">
          <Typography className="apptitle" align="center" variant="h3">
            MOODZ
          </Typography>

        </AppBar>

        {/* ------------- CHART -------------- */}
        <Card style={{ margin: 15, marginTop: 80, padding: 10, paddingTop: 20, height: 300, maxHeight: 400 }}>
          <Moodchart 
            primaryColor={theme.palette.primary.main} 
            secondaryColor={theme.palette.secondary.main} 
            moodz={moodz} 
            setMoodz={setMoodz}
          />
        </Card>

        {/* ------------- FORM -------------- */}



        <Card style={{ marginTop: 30, margin: 15, padding: 0, marginBottom:50}}>

          <form
            className='flex justify-center flex-col items-center m-9'
            onSubmit={handleSubmit}
          >
            <p
            style={{textAlign:"center"}}> 
            Hi, {user?.email}<br/>
        How is your MOOD level?
        </p>
            <Slider
              style={{ marginTop:50, marginBottom: 30 }}
              name='value'
              onChange={handleSliderChange}
              defaultValue={0}
              aria-labelledby="discrete-slider-small-steps"
              step={0.5}
              min={-10}
              max={10}
              marks={sliderMarks}
              valueLabelDisplay="on"
              value={sliderValue}
              track={false}
            />


            <TextField
              sx={{
                margin: '.5em',
                width: '100%',
                maxWidth: 400,
              }}
              color='secondary'
              variant='outlined'
              label='Add Note (optional)'
              name='note'
              multiline={true}
              id='note'
              value={inputTerm.note}
              onChange={handleChange}
            />
          </form>
        </Card>




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
          onClick={handleSubmit}
          type="submit"
        >
          <SaveIcon />
        </Fab>

        {/* <div className='flex items-left p-0 m-0 md:space-x-4'>
          {<p className='pr-2 text-sm'>Hello, {user?.email}</p> }
          <StyledButton onClick={logout}>
            <LogoutIcon />
          </StyledButton>
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default Main;
