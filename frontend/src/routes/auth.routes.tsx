import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Login' component={SignIn} />
      <Stack.Screen options={{ headerShown: false }} name='Register' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthRoutes;