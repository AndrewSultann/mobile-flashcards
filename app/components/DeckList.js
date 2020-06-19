import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'

// import { decks } from '../utils/data'
import { blue, gray, white } from '../utils/colors'




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
            <View>

                {decks &&
                    Object.values(decks).map(deck => {
                        return (
                            <TouchableOpacity
                                key={deck.title}
                                style={styles.item}
                            >
                                <Text style={styles.itemText}>{deck.title}</Text>
                                <Text style={[styles.itemText, { color: gray, fontSize: 16 }]}>{deck.questions.length} Cards</Text>
                            </TouchableOpacity>
                        );
                    })}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: blue,
        padding: 20,
        paddingLeft: 60,
        paddingRight: 60,
        marginBottom: 20,
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