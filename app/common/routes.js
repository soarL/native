import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {
  StackViewStyleInterpolator
} from 'react-navigation-stack';
import { Animated, Easing} from 'react-native';
import * as Containers from '../containers';
import * as Components from '../components';

//tabar
const TabNav = createBottomTabNavigator(
  {
    Home: { screen: Containers.Home },
    Account: { screen: Containers.Account },
  },
  {
    initialRouteName:'Home',
  }
)

TabNav.navigationOptions=()=>{
  return{
    header:()=>{}
  }
}

const TabNavigator = createStackNavigator(
  {
    HomeTab: { screen: TabNav },
    News:{screen:Containers.News}
  },
  {
    headerMode: 'float',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 250
      },
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
  }
)



export const AppNavigator = createStackNavigator(
  {
    TabNavigator: { screen: TabNavigator }
  },
  {
    headerMode: 'none',
    initialRouteName:'TabNavigator',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 250
      },
      screenInterpolator:StackViewStyleInterpolator.forHorizontal
    })
  }
)



