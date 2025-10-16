// App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from './src/redux/store/store';
import AppNavigator from './src/navigations/AppNavigator'; 
import { initializeFirebase } from './src/configs/firebase'; 
import { Colors, ThemeContext } from './src/constants/Colors';

const App = () => {
  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ colors: Colors}}>
        <AppNavigator />
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;