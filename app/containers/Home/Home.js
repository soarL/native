import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Icon } from '../../components';
import { RouteTo } from '../../utils';
import { 
  View, 
  Text,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';
import { WebView } from "react-native-webview";

@connect(({home})=>({home}))
export default class Home extends Component{
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon
        width={32}
        height={32}
        tintColor={focused ? tintColor : 'gray'}
        type='home'
      />
    )
  }
  state={
    isReady:false,
    backButtonEnabled:false
  }

  componentWillMount() {
    if(Platform.OS==='android'){
      SplashScreen.hide();
    }
  }

  render() {
    const { home,dispatch} = this.props;
    return (
      <View style={[{flex:1}]}>
        <Text>1</Text>
        <Button title='新闻页面' onPress={e=>dispatch(RouteTo({ routeName: 'News',params:{as:'213'}}))}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  text:{
    fontSize:25,
    width:200,
    color:'red'
  }
});
