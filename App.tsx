import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SettingsProvider} from './Duckbroodrunaway/Duckbroodrwaystre/duckbroodcnttx';
import Duckbroodrwastacck from './Duckbroodrunaway/Duckbroodrwaynav/Duckbroodrwastacck';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SettingsProvider>
        <Duckbroodrwastacck />
      </SettingsProvider>
    </NavigationContainer>
  );
};

export default App;
