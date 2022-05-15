import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { AppRouter } from './router';
import { themes } from './utils/theme'
import { useRecoilState } from 'recoil'
import { themeValue } from './atoms/settingsAtom'


function App() {
  const [settings, setSettings] = useState<any | null>([{}]);
  const [theme] = useRecoilState(themeValue)
  const handleSettingsChange = (props: any) => {
    const { name, value } = props;
    // console.log("inputTerm", { ...inputTerm, [name]: value });
    setSettings({ ...settings, [name]: value });
  };



  return (
    <ThemeProvider theme={themes[theme]}>

      <div>


        <Header />

        <AppRouter
          settings={settings}
          handleSettingsChange={handleSettingsChange}

        />
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}

export default App;
