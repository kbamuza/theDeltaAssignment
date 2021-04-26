import React from 'react';
import { SafeAreaView, StyleSheet, FlatList} from 'react-native';
import { Text, View, Button } from 'react-native';
import { Navigation } from "react-native-navigation";
import DealContainer from './DealContainer';
import { Game } from '../../types/shop';

export default class AllDealsScreen extends React.Component {

    goToForgotPassword = () => {
        Navigation.push(this.props.componentId, {
          component: {
            name: "DetailsScreen",
          },
        });
      };

      getAvailableDeals = () => {
        return [
            {title: "Batman", price: "$60.00", discountedPrice: "$11.99"}
        ] as Game[]
      }

      render() {
        // show loading indicator
        const availableDeals = this.getAvailableDeals()
        return (
            <SafeAreaView style={styles.pageContainer}>
                <View style={styles.contentContainer}>
                <Text style={styles.pageTitle}>Deals</Text>
                    <FlatList
                        data={availableDeals}
                        renderItem={({item, index}) => (
                            <DealContainer item={item}/>
                        )}
                        keyExtractor={(item, index) => (item.id)}
                    />
                </View>
            </SafeAreaView>
        );
      }
};

//screen title
AllDealsScreen.navigationOptions = {
    title: 'All Deals'
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        padding: 20
    },
    pageTitle: {
        fontSize: 24
    },

})