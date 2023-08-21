import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigations/Index';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { UserContextProvider } from './src/context/userContext';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserContextProvider>
          <Navigation />
          <Toast config={toastConfig} />
        </UserContextProvider>
      </PersistGate>
    </Provider>
  );
};


export default App;
