import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View, Button } from 'react-native';
import { Navigation } from "react-native-navigation";

export default class DealContainer extends React.Component {

    goToDetails = () => {
        Navigation.push(this.props.componentId, {
          component: {
            name: "DetailsScreen",
          },
        });
      };

      render() {
        return (
            <SafeAreaView style={styles.pageContainer}>
                <View style={styles.contentContainer}>
                <Text style={styles.pageTitle}>Batman</Text>
                <Text style={styles.pageTitle}>{"$24"}</Text>
                    <Button
                        color="#0064e1"
                        title="View More"
                        onPress={this.goToDetails}
                    />
                </View>
            </SafeAreaView>
        );
      }
};

//screen title
DealContainer.navigationOptions = {
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
    productName: {
        fontSize: 24
    },
    productPrice: {
        fontSize: 20
    },

})