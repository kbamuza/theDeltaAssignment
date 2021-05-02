import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Keyboard} from 'react-native';
import { Text, View } from 'react-native';

import { BottomBarTabs, Game, Store } from '../../types/shop';
import { filterGamesByStoreId, filterStoresBySearchTerm } from '../../Services/StoreService';

import StoreContainer from './StoreContainer';
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import { optionsForNoTopBar } from '../navigationOptions';
import { Navigation } from 'react-native-navigation';

interface AllStoresScreenProps {
    componentId: string
    game: Game
    availableGames: Game[]
    stores: Store[]
}

interface AllStoresScreenState {
    searchTerm: string,
    isSaleFilterSelected: boolean
}

class AllStoresScreen extends React.Component<AllStoresScreenProps, AllStoresScreenState> {

    static options() {
        return optionsForNoTopBar()
    }

    constructor(props: AllStoresScreenProps) {
        super(props)
        this.state = {
            searchTerm: "",
            isSaleFilterSelected: false
        }
    }

    componentDidMount = () => {

    }

    handleSearchInputChange = (text: string) => {
        this.setState({ searchTerm: text })
    }

    goToDealsForStore = (storeID: string) => {
        if(!storeID) {return}
        console.log("AllStoresScreen.goToDealsForStore.storeID", storeID)
        Navigation.push(this.props.componentId, {
            component: {
                name: "AllDealsScreen",
                passProps: {
                    storeID
                }
            },
        });
        console.log("AllStoresScreen.goToDealsForStore.storeID.2")
    };

    render() {
    const {stores, availableGames} = this.props
    const {searchTerm,} = this.state
    const filteredStoresList = filterStoresBySearchTerm(searchTerm, stores)

    return (
        <SafeAreaView style={styles.pageContainer}>
            <TopBar heading={"CheapShark"}/>
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
                    data={filteredStoresList}
                    renderItem={({item, index}) => (
                        <StoreContainer goToDealsForStore={this.goToDealsForStore} dealsPerStore={filterGamesByStoreId(item.storeID, availableGames).length} store={item}/>
                    )}
                    keyExtractor={(item, index) => (item.storeID)}
                />
            </View>
            <BottomBar activeTab={BottomBarTabs.Stores}/>
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

export default connect(mapStateToProps, null)(AllStoresScreen);

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