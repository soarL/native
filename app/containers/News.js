import React, { Component } from 'react';
import { 
  Platform,
  ToastAndroid,
  BackHandler
} from 'react-native';
import { WebView } from "react-native-webview";

export default class News extends Component{
  state={
    isReady:false,
    backButtonEnabled:false
  }
  static navigationOptions = {
    title: '新闻',
  }
  componentWillMount(){
  }

  //componentDidMount() {
    // let { dispatch } = this.props;
    // dispatch({
    //   type:'home/test'
    // })
  //}

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack
    });
  };
  // 监听原生返回键事件
  componentDidMount() {
    if (Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    if (this.state.backButtonEnabled) {
      this.refs['webView'].goBack();
      return true;
    } else {
      //if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //  return false;
      //}
      //this.lastBackPressed = Date.now();
      //ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return false;
    }
  };
  render() {
    return (
     <WebView
        source={{ uri: "https://www.baidu.com" }}
        style={{ width: '100%', height: '100%' }}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        allowFileAccess={true}
        startInLoadingState={true}
        ref="webView"
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}
