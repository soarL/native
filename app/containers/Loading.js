import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLOR } from '../themeColor';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLOR.theme}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
