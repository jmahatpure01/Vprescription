import React from 'react';
import {
  createStackNavigator, createAppContainer 
} from 'react-navigation';

import SplashPage from './SplashScreen';
import home from './home';

const App = createStackNavigator(
  {
    SplashScreen: { screen: SplashPage },
    Home: { screen: home },
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);




export default createAppContainer(App);
