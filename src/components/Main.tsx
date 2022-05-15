import { useEffect } from 'react'
import { useMoodz } from '../hooks/useMoodz'
import { useRecoilState } from 'recoil';
import { submitMood } from '../atoms/moodzAtom';
import FormCard from './FormCard';
import Moodchart from './Moodchart';
function Main({ handleInput }: any) {

    const [submit, setSubmit] = useRecoilState(submitMood)
    const { getMoodz, moodz } = useMoodz()
    useEffect(() => {

        getMoodz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit]);


    // const { data, loading, error } = useFetch(() => { }, []);

    // const theme = createTheme({
    //   palette: {
    //     mode: 'dark',
    //     //mode: 'light',
    //     primary: {
    //       // light: will be calculated from palette.primary.main,
    //       main: '#ace6ac',
    //       // #b99747 dark: will be calculated from palette.primary.main,
    //       // contrastText: will be calculated to contrast with palette.primary.main
    //     },
    //     background: {
    //       default: '#ace6ac',

    //     },
    //     secondary: {
    //       main: '#ffd7a3',
    //       // #0044ff dark: will be calculated from palette.secondary.main,
    //       contrastText: '#2c2c2c',
    //     },
    //     // Used by `getContrastText()` to maximize the contrast between
    //     // the background and the text.
    //     contrastThreshold: 3,
    //     // Used by the functions below to shift a color's luminance by approximately
    //     // two indexes within its tonal palette.
    //     // E.g., shift from Red 500 to Red 300 or Red 700.
    //     tonalOffset: 0.2,


    //   },


    // });

    /**
     * send data to firebase
     **/



    // form handler

    const handleInputChange = (inputTerm: any) => {

        handleInput(inputTerm)

    };


    return (

        <div className='Main'>

            {/* ------------- CHART -------------- */}

            < Moodchart
                // primaryColor={themes.palette.primary.main}
                // secondaryColor={theme.palette.secondary.main}
                moodz={moodz}
                style={{ margin: 15, marginTop: 80, padding: 10, paddingTop: 20, height: 300, maxHeight: 400 }
                }
            />


            {/* ------------- FORM -------------- */}



            <FormCard
                handleInput={handleInputChange}
                style={{ marginTop: 50, margin: 15, padding: 0, marginBottom: 85 }}

            />

        </div>
    )
}

export default Main