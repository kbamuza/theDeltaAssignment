// src/screens/Loading.js
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
 // import the functions for loading either the login screen or the tabs screen (shows home screen by default)
import { goToAllDeals, goToAllStores } from './navigation';

export default class Loading extends Component {
    async componentDidMount() {
        goToAllDeals()
        // goToAllStores()
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });