import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Keyboard} from 'react-native';
import { Text, View } from 'react-native';
import { Navigation } from "react-native-navigation";
import DealContainer from './DealContainer';
import { BottomBarTabs, Game, Store } from '../../types/shop';
import { filterGamesBySaleItems, filterGamesBySearchTerm, getAllGames, getAllStores } from '../../Services/StoreService';
import FilterSection from './FilterSection';
import { connect } from "react-redux";
import BottomBar from './BottomBar';
import TopBar from './TopBar';

import { optionsForNoTopBar } from '../navigationOptions';

interface AllDealsScreenProps {
    componentId: string,
    stores: Store[]
    availableGames: Game[]
}


interface AllDealsScreenState {

    searchTerm: string,
    isSaleFilterSelected: boolean
}

class AllDealsScreen extends React.Component<AllDealsScreenProps, AllDealsScreenState> {

    static options() {
        return optionsForNoTopBar()
    }

    constructor(props: AllDealsScreenProps) {
        super(props)
        this.state = {
            searchTerm: "",
            isSaleFilterSelected: false
        }
    }

    componentDidMount = () => {

    }

    goToDetails = (game: Game) => {
        console.log("AllDealsScreen.goToDetails.game", game)
        Navigation.push(this.props.componentId, {
            component: {
                name: "DetailsScreen",
                passProps: {
                    game
                }
            },
        });
        console.log("AllDealsScreen.goToDetails.2")
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
    const {availableGames} = this.props
    const {searchTerm, isSaleFilterSelected} = this.state
    const filteredResultsBySearchTerm = filterGamesBySearchTerm(searchTerm, availableGames)
    const filteredResultsBySaleItems = filterGamesBySaleItems(isSaleFilterSelected, filteredResultsBySearchTerm)

    return (
        <SafeAreaView style={styles.pageContainer}>
            <TopBar heading={"CheapShark"}/>
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
                        <DealContainer goToDetails={this.goToDetails} game={item}/>
                    )}
                    keyExtractor={(item, index) => (item.dealID)}
                />
            </View>
            <BottomBar activeTab={BottomBarTabs.Deals}/>
        </SafeAreaView>
    );
    }
};

const mapStateToProps = (state: any) => {
    return {
        stores: state.storeReducer.stores,
        availableGames: state.storeReducer.availableGames,
    }
}

export default connect(mapStateToProps, null)(AllDealsScreen);

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
