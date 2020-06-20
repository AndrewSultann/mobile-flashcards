import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray, blue, white, red } from '../utils/colors'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions'


class DeckView extends React.Component {
    deleteDeckFunc = (title) => {
        const { dispatch } = this.props
        dispatch(deleteDeck(title))
        this.props.navigation.navigate('DeckList')
    }
    render() {
        const { title } = this.props.route.params
        const { questions } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{title}</Text>
                    <Text style={[styles.itemText, { color: gray, fontSize: 16 }]}>{questions} Card</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={[styles.item, { backgroundColor: gray }]}
                        onPress={() => this.props.navigation.navigate('AddCard', { title })}
                    >
                        <Text style={[styles.itemText, { color: '#000' }]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item]}>
                        <Text style={styles.itemText}>Start a Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: 100 }}
                        onPress={(title) => this.deleteDeckFunc(title)}
                    >
                        <Text style={[{ color: red, textAlign: "center" }]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        flex: 1,
        alignItems: "center"
    },
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


export default connect()(DeckView)



/* <View>
<View style={styles.item}>
    <Text style={styles.itemText}>Deck Title</Text>
    <Text style={[styles.itemText, { color: gray, fontSize: 16 }]}>1 Card</Text>
</View>
<View style={{ flex: 1, justifyContent: 'center' }}>
    <TouchableOpacity style={[styles.item, { backgroundColor: gray }]}>
        <Text style={[styles.itemText, { color: '#000' }]}>Add Card</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.item]}>
        <Text style={styles.itemText}>Start a Quiz</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ margin: 100 }}>
        <Text style={[{ color: red, textAlign: "center" }]}>Delete Deck</Text>
    </TouchableOpacity>
</View>
</View > */