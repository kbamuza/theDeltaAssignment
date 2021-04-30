import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'react-native';
import { Navigation } from "react-native-navigation";
import { Deal, Game, Store } from '../../types/shop';

interface AdditionalDealContainerProps {
    deal: Deal
    store?: Store
    viewMoreInfo: (deal: Deal) => void
}


interface AdditionalDealContainerState {

}

export default class AdditionalDealContainer extends React.Component<AdditionalDealContainerProps, AdditionalDealContainerState> {

    constructor(props: AdditionalDealContainerProps) {
        super(props)
        this.state = {

        }
    }

      render() {
        const {deal, store} = this.props
        const hasDiscount = !!Number(deal?.savings)
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.productName}>{store?.storeName || ""}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.productPrice, hasDiscount && styles.priceDiscountIndication]}>{"$" + deal?.retailPrice || ""}</Text>
                        {hasDiscount && <Text style={styles.discountedPrice}>{"$" + deal?.price || ""}</Text>}
                    </View>
                </View>
                <View style={styles.spacer}/>
                <View style={styles.viewMoreButtonContainer}>
                    <TouchableOpacity
                        style={styles.viewMoreButton}
                        onPress={() => this.props.viewMoreInfo(deal)}
                    >
                        <Text style={styles.viewMoreButtonTitle}>{"View More"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
      }
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "#e32"
    },
    contentContainer: {
        // flex: 1,
        flexDirection: 'column'
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '800'
    },
    discountedPrice: {
        fontSize: 18,
        color: "#228B22",
        fontWeight: '600'
    },
    priceContainer: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    priceDiscountIndication: {
        textDecorationLine: 'line-through',
        paddingRight: 10,
    },
    viewMoreButtonContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
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
    spacer: {
        flex: 1
    }
})