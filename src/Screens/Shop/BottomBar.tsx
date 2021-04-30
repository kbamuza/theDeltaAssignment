import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, } from 'react-native';
import { BottomBarTabs } from '../../types/shop';
import { goToAllDeals, goToAllStores } from '../navigation';

interface BottomBarProps {
    activeTab: BottomBarTabs
}


interface BottomBarState {

}

export default class BottomBar extends React.Component<BottomBarProps, BottomBarState> {

    constructor(props: BottomBarProps) {
        super(props)
        this.state = {

        }
    }

      render() {
        const {activeTab} = this.props
        return (
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={goToAllDeals} style={styles.bottomBarButton}>
                        <Text style={[styles.bottomBarButtonText, (activeTab == BottomBarTabs.Deals) && styles.activeTabText]}>{"Deals"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomBarButton}>
                        <Text style={[styles.bottomBarButtonText, (activeTab == BottomBarTabs.Games) && styles.activeTabText]}>{"Games"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToAllStores} style={styles.bottomBarButton}>
                        <Text style={[styles.bottomBarButtonText, (activeTab == BottomBarTabs.Stores) && styles.activeTabText]}>{"Stores"}</Text>
                    </TouchableOpacity>
                </View>
        );
      }
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#eee',
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomBarButtonText: {
        fontSize: 24,
    },
    activeTabText: {
        fontWeight: 'bold'
    },
    bottomBarButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewMoreButtonTitle: {
        fontSize: 16
    }
})