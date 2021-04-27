
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { goToAllDeals, goToAllStores } from './navigation';
import { connect } from 'react-redux';
import { getAllStores } from "../Services/StoreService";
import { saveStores } from "../Redux/Actions/StoreActions";
import { Store } from "../types/shop";

interface LoadingProps {
  componentId: string,
  saveStores: (stores: Store[]) => void
}

class Loading extends Component<LoadingProps> {

  constructor(props: LoadingProps) {
    super(props)
    this.state = {

    }
}

    async componentDidMount() {
      this.getAllStoresList()
        
        // goToAllStores()
    }

    getAllStoresList = () => {
      getAllStores().then((allStores) => {
          console.log("Loading.getAvailableDeals.allStores", allStores)
          this.props.saveStores(allStores)
          goToAllDeals()
      })
      .catch((err) => {
          console.log("Loading.getAvailableDeals.err", err)
          goToAllDeals()
      })
  }
  
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }

  const mapDispatchToProps = (dispatch: any) => ({
    saveStores: (stores: Store[]) => dispatch(saveStores(stores)),
    dispatch
  })

export default connect(null, mapDispatchToProps)(Loading)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });