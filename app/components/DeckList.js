import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'

import { blue, gray, white } from '../utils/colors'
import DeckView from '../components/DeckView'
import Deck from '../components/Deck'



class DeckList extends React.Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        const { decks } = this.props
        if (!decks) {
            return <Text>No decks yet</Text>
        }
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}> Mobile Flashcards</Text>
                {decks &&
                    Object.values(decks).map(deck => {
                        return (
                            <Deck key={deck.title} deck={deck} navigation={this.props.navigation} />
                        );
                    })}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        color: blue,
        fontSize: 30,
        marginBottom: 60,
        marginTop: 25,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: blue,
        padding: 20,
        paddingLeft: 60,
        paddingRight: 60,
        marginBottom: 20,
        width: 300,
    },
    itemText: {
        color: white,
        textAlign: 'center',
        fontSize: 22,

    }
})

function mapStateToProps(state) {
    return {
        decks: state
    }
};

export default connect(
    mapStateToProps
)(DeckList);