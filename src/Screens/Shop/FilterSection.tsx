import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box'

interface FilterSectionProps {
    isSaleFilterSelected: boolean
    setSaleFilter: () => void
}


interface FilterSectionState {
    filterOptionIsVisible: boolean
}

export default class FilterSection extends React.Component<FilterSectionProps, FilterSectionState> {

    constructor(props: FilterSectionProps) {
        super(props)
        this.state = {
            filterOptionIsVisible: false
        }
    }

    showFilterOption = () => {
        this.setState({filterOptionIsVisible: !this.state.filterOptionIsVisible})
    }

      render() {
        const {isSaleFilterSelected, setSaleFilter} = this.props
        const {filterOptionIsVisible} = this.state
        return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.showFilterOption} style={styles.headingContainer}>
                            <Text style={styles.filterSectionHeading}>{"Filters"}</Text>
                        </TouchableOpacity>
                        {filterOptionIsVisible && <View style={styles.checkboxContainer}>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={setSaleFilter}
                                isChecked={isSaleFilterSelected}
                                leftText={"On Sale"}
                            />
                        </View>}
                    </View>
                </View>
        );
      }
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        // flex: 1
    },
    checkbox: {

    },
    checkboxContainer: {

    },
    headingContainer: {
        paddingVertical: 20
    },
    filterSectionHeading: {
        fontSize: 20
    }
})