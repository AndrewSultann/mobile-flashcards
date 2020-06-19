import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './app/reducers'
import middleware from './app/middleware'

import DeckList from './app/components/DeckList'
import { blue } from './app/utils/colors';
import Navigation from './app/config/navigation'



function AppStatusBar({ backgroundColor, ...props }) {
  // I can import Constants from 'expo-constants' and use Constants.statusBarHeight
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends Component {

  render() {
    const store = createStore(reducer, middleware)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={blue} />
          <Text style={styles.title}> Mobile Flashcards</Text>
          {/* <DeckList /> */}
          <Navigation />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 25,
  },
  title: {
    color: blue,
    fontSize: 30,
    marginBottom: 60,
    fontWeight: 'bold'
  }
});

export default (App)