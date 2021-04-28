import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, TextInput, Keyboard} from 'react-native';
import { Text, View } from 'react-native';
import { Navigation } from "react-native-navigation";

import { Game, Store } from '../../types/shop';
import { filterStoresBySearchTerm, getAllGames } from '../../Services/StoreService';

import StoreContainer from './StoreContainer';
import { connect } from 'react-redux';

interface AllStoresScreenProps {
    componentId: string
    game: Game
    stores: Store[]
}

interface AllStoresScreenState {
    searchTerm: string,
    isSaleFilterSelected: boolean
}

class AllStoresScreen extends React.Component<AllStoresScreenProps, AllStoresScreenState> {

    constructor(props: AllStoresScreenProps) {
        super(props)
        this.state = {
            searchTerm: "",
            isSaleFilterSelected: false
        }
    }

    componentDidMount = () => {

    }


    goToDetails = (store: Store) => {
        // Navigation.push(this.props.componentId, {
        //     component: {
        //         name: "DetailsScreen",
        //         passProps: {
        //             game
        //         }
        //     },
        // });
    };

    handleSearchInputChange = (text: string) => {
        this.setState({ searchTerm: text })
    }

    render() {
    // show loading indicator
    const {stores} = this.props
    const {searchTerm,} = this.state
    const filteredStoresList = filterStoresBySearchTerm(searchTerm, stores)

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
                    data={filteredStoresList}
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

const mapStateToProps = (state: any) => {
    return {
        stores: state.storeReducer.stores
    }
}

export default connect(mapStateToProps, null)(AllStoresScreen);

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