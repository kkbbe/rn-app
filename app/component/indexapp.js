import React from 'react';
import { createStackNavigator } from 'react-navigation';
import app from './App'
import main from './main'
export default createStackNavigator(
  {
    Home: main,
    Login: app, 
  },
  {
    initialRouteName:'Home',
  }
)