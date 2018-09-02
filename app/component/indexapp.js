import React from 'react';
import { createStackNavigator } from 'react-navigation';
import app from './App'
import main from './main'
import news from './news'
import chat from './talk'
import newtie from './newtie'
export default createStackNavigator(
  {
    Home: main,
    Login: app, 
    News: news,
    Chat:chat,
    Newtie:newtie
  },
  {
    initialRouteName:'Home',
  }
)