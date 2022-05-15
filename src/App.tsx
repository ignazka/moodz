import { useState } from 'react';
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
      <AppRouter 
      settings = {settings}
      handleSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default App;
