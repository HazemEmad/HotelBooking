import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './appStack';
import AuthStack from './authStack';
import auth from '@react-native-firebase/auth';

const MainNavigator = props => {
  const [user, setUser] = useState();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  const onAuthStateChanged = user => {
    setUser(user);
  };
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
