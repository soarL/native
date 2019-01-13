import React, { PureComponent } from 'react'
import { BackHandler ,View,Platform,Dimensions} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from './common/routes'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import * as Containers from './containers'

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

export const getActiveRouteName = function(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ global, router }) => ({ global, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen !== 'Home' && currentScreen !== 'Account') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { global,dispatch, router } = this.props;
    if(Platform.OS === 'ios'){
      return (
        <View style={{marginTop:isIphoneX() ? 44 : 44,flex:1}}>
          <App dispatch={dispatch} state={router} />
        </View>
      )
    }else if(Platform.OS === 'android'){
      return (
        <App dispatch={dispatch} state={router} />
      )
    }
  }
}


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

function isIphoneX() {
    return (
        Platform.OS === 'ios' &&((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}


export default Router
