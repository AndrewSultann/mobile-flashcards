import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './app/reducers'
import middleware from './app/middleware'

import DeckList from './app/components/DeckList'


class App extends Component {

  render() {
    const store = createStore(reducer, middleware)
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default (App)