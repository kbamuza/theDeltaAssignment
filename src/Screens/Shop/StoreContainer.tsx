import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import { Navigation } from "react-native-navigation";
import { Store } from '../../types/shop';
import { CHEAPSHARK_BASE_API } from '../../Services/StoreService';

interface StoreContainerProps {
    store: Store
    // goToStoreDeals: (storeId: string) => void
}


interface StoreContainerState {

}

export default class StoreContainer extends React.Component<StoreContainerProps, StoreContainerState> {

    componentDidMount = () => {
        console.log("StoreContainer.componentDidMount.store", this.props.store)
    }

    constructor(props: StoreContainerProps) {
        super(props)
        this.state = {

        }
    }

      render() {
        const {store} = this.props
        if(!store) {return <View/>}
        return (
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        {!!store?.images?.banner && <Image resizeMode="contain" style={styles.image} source={{uri: `${CHEAPSHARK_BASE_API}${store.images?.banner}`}}/>}
                    </View>
                    <Text style={styles.storeName}>{store?.storeName || ""}</Text>
                    <View style={styles.viewMoreButtonContainer}>
                        <TouchableOpacity
                            style={styles.viewMoreButton}
                            // onPress={() => this.props.goToStoreDeals(store.storeID)}
                        >
                            <Text style={styles.viewMoreButtonTitle}>{"View More"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        );
      }
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    storeName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewMoreButtonContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    viewMoreButton: {
        borderColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
    },
    viewMoreButtonTitle: {
        fontSize: 16
    },
    image: {
        height: 300,
        width: Dimensions.get('window').width - 20,
        borderRadius: 5
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
})