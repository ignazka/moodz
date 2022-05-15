import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { AppRouter } from './router';



function App() {
  const [settings, setSettings] = useState<any | null>([{}]);

  const handleSettingsChange = (props: any) => {
    const { name, value } = props;
    // console.log("inputTerm", { ...inputTerm, [name]: value });
    setSettings({ ...settings, [name]: value });
  };



  return (
    <div>
      <Header />

      <AppRouter
        settings={settings}
        handleSettingsChange={handleSettingsChange}

      />
      <BottomNav />
    </div>
  );
}

export default App;
