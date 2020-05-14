import React from 'react';
import Fonts from './Fonts'
import Home from './Home'
import 'react-native-gesture-handler';
import mockdata from './mockdata';
import Todolist from './components/ToDoList'
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import themeReducer from './reduxStore/themeReducer'
import APIKeys from './APIkeys';
import * as firebase from 'firebase';

const myStore = createStore(combineReducers({themeReducer}), applyMiddleware(thunk))

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    }
    if (!firebase.apps.length) {firebase.initializeApp(APIKeys.FirebaseConfig);}
  }

  render() {
    return (
      <Provider store= { myStore }>
        <Home />
      </Provider>
    );
  }
}


