import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'




class DeckList extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { decks } = this.props
        console.log(decks)
        return (
            <View>
                {Object.values(decks).map(deck => {
                    return (
                        <View>
                            <Text>{deck.title}</Text>
                        </View>
                    );
                })}
            </View>
        )

    }
}

function mapStateToProps(state) {
    return {
        decks: state
    }
};

export default connect(
    mapStateToProps
)(DeckList);