import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Intro from '../screens/intro';
import Auth from '../screens/auth';
import AppBar from '../components/appBar';

const Stack = createStackNavigator();

const AuthStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <AppBar {...props} />,
      }}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
