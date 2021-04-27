import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Keyboard} from 'react-native';
import { Text, View } from 'react-native';
import { Navigation } from "react-native-navigation";
import DealContainer from './DealContainer';
import { Game, Store } from '../../types/shop';
import { filterGamesBySaleItems, filterGamesBySearchTerm, getAllDeals, getAllStores } from '../../Services/StoreService';
import FilterSection from './FilterSection';
import { connect } from "react-redux";

interface AllDealsScreenProps {
    componentId: string,
    stores: Store[]
}


interface AllDealsScreenState {
    allDeals: Game[],
    allStores: Store[],
    searchTerm: string,
    isSaleFilterSelected: boolean
}

class AllDealsScreen extends React.Component<AllDealsScreenProps, AllDealsScreenState> {

    constructor(props: AllDealsScreenProps) {
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

        console.log("AllDealsScreen.componentDidMount.stores", this.props.stores)
    }

    getAvailableDeals = () => {
        getAllDeals().then((allDeals) => {
            console.log("AllDealsScreen.getAvailableDeals.allDeals", allDeals)
            this.setState({allDeals})
        }).catch((err) => {
            console.log("AllDealsScreen.getAvailableDeals.err", err)
        })
    }

    getAllStoresList = () => {
        getAllStores().then((allStores) => {
            console.log("AllDealsScreen.getAvailableDeals.allStores", allStores)
            this.setState({allStores})
        }).catch((err) => {
            console.log("AllDealsScreen.getAvailableDeals.err", err)
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
    const {allDeals, searchTerm, isSaleFilterSelected} = this.state
    const filteredResultsBySearchTerm = filterGamesBySearchTerm(searchTerm, allDeals)
    const filteredResultsBySaleItems = filterGamesBySaleItems(isSaleFilterSelected, filteredResultsBySearchTerm)

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.pageTitle}>Deals</Text>
                <View style={styles.searchInputContainer}>
                    <TextInput style = {styles.searchInput}
                        underlineColorAndroid = "transparent"
                        placeholder = "Search deals by name"
                        placeholderTextColor = "#111"
                        autoCapitalize = "none"
                        onChangeText = {this.handleSearchInputChange}
                    />
                </View>
                <FilterSection 
                    isSaleFilterSelected={isSaleFilterSelected}
                    setSaleFilter={this.setSaleFilter}
                />
                <FlatList
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    keyboardShouldPersistTaps = {'always'}
                    data={filteredResultsBySaleItems}
                    renderItem={({item, index}) => (
                        <DealContainer goToDetails={() => this.goToDetails(item)} game={item}/>
                    )}
                    keyExtractor={(item, index) => (item.dealID)}
                />
            </View>
        </SafeAreaView>
    );
    }
};

const mapStateToProps = (state: any) => {
    return {
        stores: state.storeReducer.stores
    }
}

export default connect(mapStateToProps, null)(AllDealsScreen);

AllDealsScreen.navigationOptions = {
    title: 'All Deals'
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