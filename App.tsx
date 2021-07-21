import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppContext from './src/utils/AppContext'

import Amplify, {Auth} from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config)
Auth.configure(config)

/*Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:4f5df84e-8314-4099-b80c-b246a1183d90',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: ' us-east-1_xdMuMmmMs',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6b004cp9d0cfashe87rvg2o52d',

  }
});*/

export default function App() {

  const [userId, setUserId] = useState(null)

  useEffect(() =>{

  }, [userId])

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value = {{userId, setUserId}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}
