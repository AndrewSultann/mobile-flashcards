import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { blue, white, gray } from '../utils/colors'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class AddDeck extends React.Component {
    state = {
        title: ''
    }

    createAlert = () =>
        Alert.alert(
            "Error",
            "Text inputs are empty!",
            [
                { text: "OK" },
            ],

            { cancelable: false }
        );

    handleTextChange = (title) => {
        this.setState({ title })
    }
    handleSubmit = () => {
        const { dispatch } = this.props
        const { title } = this.state
        if (this.state.title === '') {
            this.createAlert()
        } else {
            dispatch(addDeck(title))
            this.setState({ title: '' })
            this.props.navigation.navigate('DeckView', { title })
        }


    }
    isDisabled = () => {
        return this.state.title === ''
    }
    render() {
        const { title } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add a New Deck</Text>
                <TextInput
                    style={styles.TextInput}
                    value={title}
                    placeholder='Enter the name of the deck'
                    onChangeText={this.handleTextChange}
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.handleSubmit}
                // disabled={this.isDisabled()}
                >
                    <Text style={styles.submitBtnText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    title: {
        fontSize: 27,
        color: blue,
        marginBottom: 40,
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: "center"

    },
    TextInput: {
        width: 300,
        borderColor: gray,
        borderWidth: 2,
        padding: 8,
        borderRadius: 5,
        marginBottom: 20,

    },
    submitBtn: {
        backgroundColor: blue,
        padding: 24,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 3,
    },
    submitBtnText: {
        color: white,
    },
    cancel: {
        color: blue
    }

})
export default connect()(AddDeck)