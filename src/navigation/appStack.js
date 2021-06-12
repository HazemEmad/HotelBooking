import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../screens/dashboard';
import HotelDetails from '../screens/hotelDetails';
import Profile from '../screens/profile';
import Bookings from '../screens/bookings';
import AppBar from '../components/appBar';

const Stack = createStackNavigator();

const AppStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <AppBar {...props} />,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetails}
        initialParams={{title: 'Description'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{title: 'Profile'}}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        initialParams={{title: 'Bookings'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
