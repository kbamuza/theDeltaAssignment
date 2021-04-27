
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { goToAllDeals, goToAllStores } from './navigation';
import { connect } from 'react-redux';

class Loading extends Component {
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

export default connect(null, null)(Loading)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });