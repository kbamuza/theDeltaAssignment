import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Game } from '../../types/shop';

interface DealContainerProps {
    game: Game
    goToDetails: (game: Game) => void
}


interface DealContainerState {

}

export default class DealContainer extends React.Component<DealContainerProps, DealContainerState> {

    constructor(props: DealContainerProps) {
        super(props)
        this.state = {

        }
    }

      render() {
        const {game} = this.props
        const hasDiscount = !!Number(game?.salePrice)
        return (
                <View style={styles.contentContainer}>
                    <Text style={styles.productName}>{game?.title || ""}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.productPrice, hasDiscount && styles.priceDiscountIndication]}>{"$" + game?.normalPrice || ""}</Text>
                        {hasDiscount && <Text style={styles.discountedPrice}>{"$" + game?.salePrice || ""}</Text>}
                    </View>
                    <View style={styles.viewMoreButtonContainer}>
                        <TouchableOpacity
                            style={styles.viewMoreButton}
                            onPress={() => this.props.goToDetails(game)}
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
        color: "#008f7a",
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
    }
})