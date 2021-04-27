import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Keyboard} from 'react-native';
import { Text, View } from 'react-native';
import { Navigation } from "react-native-navigation";
import DealContainer from './DealContainer';
import { Game, Store } from '../../types/shop';
import { filterGamesBySaleItems, filterGamesBySearchTerm, getAllDeals, getAllStores } from '../../Services/StoreService';
import FilterSection from './FilterSection';
import StoreContainer from './StoreContainer';

interface AllStoresScreenProps {
    componentId: string
}


interface AllStoresScreenState {
    allDeals: Game[],
    allStores: Store[],
    searchTerm: string,
    isSaleFilterSelected: boolean
}

export default class AllStoresScreen extends React.Component<AllStoresScreenProps, AllStoresScreenState> {

    constructor(props: AllStoresScreenProps) {
        super(props)
        this.state = {
            allDeals: [],
            allStores: [],
            searchTerm: "",
            isSaleFilterSelected: false
        }
    }

    componentDidMount = () => {
        this.getAvailableDeals()
        this.getAllStoresList()
    }

    getAvailableDeals = () => {
        getAllDeals().then((allDeals) => {
            console.log("AllStoresScreen.getAvailableDeals.allDeals", allDeals)
            this.setState({allDeals})
        }).catch((err) => {
            console.log("AllStoresScreen.getAvailableDeals.err", err)
        })
    }

    getAllStoresList = () => {
        getAllStores().then((allStores) => {
            console.log("AllStoresScreen.getAvailableDeals.allStores", allStores)
            this.setState({allStores})
        }).catch((err) => {
            console.log("AllStoresScreen.getAvailableDeals.err", err)
        })
    }

    goToDetails = (game: Game) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: "DetailsScreen",
                passProps: {
                    game
                }
            },
        });
    };

    handleSearchInputChange = (text: string) => {
        this.setState({ searchTerm: text })
    }

    setSaleFilter = () => {
        this.setState({ isSaleFilterSelected: !this.state.isSaleFilterSelected })
    }

    // setSaleFilter = () => {
    //     this.setState({ searchTerm: text })
    // }

    render() {
    // show loading indicator
    const {allDeals, searchTerm, isSaleFilterSelected, allStores} = this.state
    const filteredResultsBySearchTerm = filterGamesBySearchTerm(searchTerm, allDeals)
    const filteredResultsBySaleItems = filterGamesBySaleItems(isSaleFilterSelected, filteredResultsBySearchTerm)

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.pageTitle}>Stores</Text>
                <View style={styles.searchInputContainer}>
                    <TextInput style = {styles.searchInput}
                        underlineColorAndroid = "transparent"
                        placeholder = "Search stores by name"
                        placeholderTextColor = "#111"
                        autoCapitalize = "none"
                        onChangeText = {this.handleSearchInputChange}
                    />
                </View>
                <FlatList
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    keyboardShouldPersistTaps = {'always'}
                    data={allStores}
                    renderItem={({item, index}) => (
                        <StoreContainer goToDetails={() => this.goToDetails(item)} store={item}/>
                    )}
                    keyExtractor={(item, index) => (item.storeID)}
                />
            </View>
        </SafeAreaView>
    );
    }
};

//screen title
AllStoresScreen.navigationOptions = {
    title: 'Stores'
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
    },
    pageTitle: {
        fontSize: 24,
        paddingHorizontal: 20,
        fontWeight: 'bold'
    },
    searchInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#111"
    },
    searchInputContainer: {
        padding: 20
    }

})