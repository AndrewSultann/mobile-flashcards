import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './app/reducers'
import middleware from './app/middleware'

import { blue } from './app/utils/colors';
import Navigation from './app/config/navigation'

import { setLocalNotification } from './app/utils/helpers'


function AppStatusBar({ backgroundColor, ...props }) {
  // I can import Constants from 'expo-constants' and use Constants.statusBarHeight
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends Component {
  componentDidMount() {
    // Notifications
    setLocalNotification()
  }

  render() {
    const store = createStore(reducer, middleware)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={blue} />
          <Navigation />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default (App)