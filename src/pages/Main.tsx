import React, { useEffect, useState } from 'react';
import useAuth from '../context/authContext';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AppBar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


//components
import FormCard from '../components/FormCard';
import Moodchart from '../components/Moodchart';
import BottomNav from '../components/BottomNav';
// import { useFetch } from '../hooks/useFetch';




function Main() {

  const { user } = useAuth();
  // const { data, loading, error } = useFetch(() => { }, []);

  const [inputTerm, setInputTerm] = useState({ value: 0, note: '' });
  const [moodz, setMoodz] = useState<any | null>([{}]);

  let sliderValue: number;
  let newNote: string;





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
        note: newNote,
        user: user?.uid,
        addedAt: Timestamp.fromDate(new Date()),
      });
      setInputTerm({ value: 0, note: '' });
    } catch (e) {
      console.log(e);
    } finally {
      setInputTerm({ value: 0, note: '' });
      getMoodz();
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

  const handleSliderChange = (newValue: number) => {
    sliderValue = newValue;
  };
  const handleTextfieldChange = (note: string) => {
    newNote = note;
  };


  useEffect(() => {
    getMoodz();

  }, []);

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

        <Moodchart
          primaryColor={theme.palette.primary.main}
          secondaryColor={theme.palette.secondary.main}
          moodz={moodz}
          style={{ margin: 15, marginTop: 80, padding: 10, paddingTop: 20, height: 300, maxHeight: 400 }}
        />


        {/* ------------- FORM -------------- */}



        <FormCard
          handleSliderChange={handleSliderChange}
          handleTextfieldChange={handleTextfieldChange}
        />

        <BottomNav
          setMood={setMood}
        />


      </div>
    </ThemeProvider>
  );
}

export default Main;
