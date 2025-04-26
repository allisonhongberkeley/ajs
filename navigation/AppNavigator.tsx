import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AuthNavigator from './AuthNavigator';

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}