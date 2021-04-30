import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

interface TopBarProps {
    heading: String
}


interface TopBarState {

}

export default class TopBar extends React.Component<TopBarProps, TopBarState> {

    constructor(props: TopBarProps) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.topBarHeading}>{this.props.heading}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fefefe',
        height: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#eee",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    topBarHeading: {
        fontSize: 22,
    },

})