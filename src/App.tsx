import ThemeProvider from '@mui/material/styles/ThemeProvider';

import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { AppRouter } from './router';
import { themes } from './utils/theme'
import { useRecoilState } from 'recoil'
import { themeValue } from './atoms/settingsAtom';
//import { notificationToggle, themeValue } from './atoms/settingsAtom'



function App() {
  // console.log(themeValue, useRecoilState(notificationToggle));
  // const [settings, setSettings] = 
  
  const [theme] = useRecoilState(themeValue);
 // const [notifToggle,setNotifToggle] = useRecoilState(notificationToggle);





  return (
    <ThemeProvider theme={themes[theme]}>
      <div>
        <Header />
        <AppRouter
        />  
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}

export default App;
