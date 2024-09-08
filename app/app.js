import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '../components/MainNavigator';


export default function App() {
  return (
    
      <NavigationContainer independent={true}>
        <MainNavigator />
      </NavigationContainer>

  );
}
