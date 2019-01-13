import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from '../../components';
import { View,Platform ,Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

@connect(({global})=>({global}))
class Account extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon
        width={32}
        height={32}
        tintColor={focused ? tintColor : 'gray'}
        type='person'
      />
    )
  }
  componentWillMount() {
    if(Platform.OS==='android'){
      SplashScreen.hide();
    }
  }

  render() {
    const { global } = this.props;
    return (
      <View style={[{flex:1}]}>
        <Text>user</Text>
      </View>
    )
  }
}

export default Account;
