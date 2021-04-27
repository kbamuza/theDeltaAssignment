import React from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, View, Button } from 'react-native';
import { Navigation } from "react-native-navigation";
import { getDealsForGame } from '../../Services/StoreService';
import { Deal, Game } from '../../types/shop';

interface DetailsScreenProps {
    game: Game
}


interface DetailsScreenState {
    dealsForGame: Deal[]
}

export default class DetailsScreen extends React.Component<DetailsScreenProps, DetailsScreenState> {

    constructor(props: DetailsScreenProps) {
        super(props)
        this.state = {
            dealsForGame: []
        }
    }

    componentDidMount = () => {
        const {game} = this.props
        console.log("DetailsScreen.componentDidMount.game", this.props.game)
        this.getDealsForGame(game.steamAppID)
    }

    getDealsForGame = (steamAppID: string) => {
        getDealsForGame(steamAppID).then((dealsForGame) => {
            console.log("AllDealsScreen.getDealsForGame.dealsForGame", dealsForGame)
            this.setState({dealsForGame})
        }).catch((err) => {
            console.log("AllDealsScreen.getDealsForGame.err", err)
        })
    }

    render() {
    const {game} = this.props
    const hasDiscount = !!Number(game?.salePrice)
    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.productName}>{game?.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={[styles.productPrice, hasDiscount && styles.priceDiscountIndication]}>{game?.normalPrice || ""}</Text>
                    {hasDiscount && <Text style={styles.discountedPrice}>{game?.salePrice || ""}</Text>}
                </View>
                {hasDiscount && <Text style={styles.savings}>{`You save ${game?.savings || ""}`}</Text>}
                <Text style={styles.subheading}>{`Available at`}</Text>
                <View style={styles.imageContainer}>
                    {!!game.thumb && <Image resizeMode="contain" style={styles.image} source={{uri: `${game.thumb}`}}/>}
                </View>
                <Text style={styles.subheading}>{`Other deals for this game`}</Text>
            </View>
        </SafeAreaView>
    );
    }
};

//screen title
DetailsScreen.navigationOptions = {
    title: 'Detail Screen'
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        padding: 20
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '800'
    },
    discountedPrice: {
        fontSize: 22,
        color: "#228B22",
        fontWeight: '800'
    },
    priceContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    priceDiscountIndication: {
        textDecorationLine: 'line-through',
        paddingRight: 10,
    },
    savings: {
        fontSize: 22,
        fontWeight: '800'
    },
    subheading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
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