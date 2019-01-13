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
    title: 'test',
  }
  componentWillMount(){
  }

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack
    });
  };
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
      return false;
    }
  };
  render() {
    return (
     <WebView
        source={{ uri: "https://wap.91hc.com/borrow" }}
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
