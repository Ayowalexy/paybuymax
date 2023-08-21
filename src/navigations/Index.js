import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigations from './Stack';

export default function Navigation() {
  return (
    <NavigationContainer
    >
        <StackNavigations />
    </NavigationContainer>
  );
}

