
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { goToAllDeals, goToAllStores } from './navigation';
import { connect } from 'react-redux';
import { getAllGames, getAllStores } from "../Services/StoreService";
import { saveAvailableGames, saveStores } from "../Redux/Actions/StoreActions";
import { Game, Store } from "../types/shop";

interface LoadingProps {
  componentId: string,
  saveStores: (stores: Store[]) => void
  saveAvailableGames: (stores: Game[]) => void
}

class Loading extends Component<LoadingProps> {

  constructor(props: LoadingProps) {
    super(props)
    this.state = {

    }
}

    async componentDidMount() {
      // this.getAllStoresList()
        
        // goToAllStores()

        this.getStoresAndGames()
    }

    getAllStoresList = () => {
      getAllStores().then((allStores) => {
          console.log("Loading.getAvailableDeals.allStores", allStores)
          goToAllDeals()
      })
      .catch((err) => {
          console.log("Loading.getAvailableDeals.err", err)
          goToAllDeals()
      })
  }

  getAllGamesList = () => {
    getAllGames().then((allGames) => {
      console.log("AllDealsScreen.getAvailableDeals.allGames", allGames)
      
    }).catch((err) => {
        console.log("AllDealsScreen.getAvailableDeals.err", err)
    })
  }

  getStoresAndGames = async () => {
    try {
      const allStores = await getAllStores()
      const availableGames = await getAllGames()

      this.props.saveAvailableGames(availableGames)
      this.props.saveStores(allStores)

      goToAllDeals()
    } catch(err) {
      console.log("AllDealsScreen.getAvailableDeals.err", err)
    }
  }
  
  render(){
    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }

  const mapDispatchToProps = (dispatch: any) => ({
    saveStores: (stores: Store[]) => dispatch(saveStores(stores)),
    saveAvailableGames: (games: Game[]) => dispatch(saveAvailableGames(games)),
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