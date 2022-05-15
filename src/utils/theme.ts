import { createTheme } from "@mui/material";


export const themes = [createTheme({
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
      tonalOffset: 0.2

    }
  }),
    createTheme({
      palette: {
        mode: 'light',
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
          contrastText: '#eee',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      }})
  ]