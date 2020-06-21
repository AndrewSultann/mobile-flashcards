import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { gray, blue, white } from '../utils/colors'
import { addCard } from '../actions/index'
import { connect } from 'react-redux'

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }
    handleQuestionChange = (question) => {
        this.setState({ question })
    }
    handleAnswerChange = (answer) => {
        this.setState({ answer })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { title } = this.props.route.params
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        dispatch(addCard(title, card))
        this.props.navigation.navigate('DeckList')
    }
    isDisabled = () => {
        return this.state.question === '' || this.state.answer === ''
    }
    render() {
        const { question, answer } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add a card to deck "{this.props.route.params.title}" </Text>
                <TextInput
                    style={styles.TextInput}
                    value={question}
                    name='question'
                    placeholder='Enter your question'
                    onChangeText={this.handleQuestionChange}
                />
                <TextInput
                    style={styles.TextInput}
                    value={answer}
                    name='answer'
                    placeholder='Enter the answer'
                    onChangeText={this.handleAnswerChange}

                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={(e) => this.handleSubmit(e)}
                    disabled={this.isDisabled()}
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
        alignItems: 'center'
    },
    title: {
        fontSize: 27,
        color: blue,
        marginBottom: 40,
        marginTop: 20,
        fontWeight: 'bold'
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
    }
})


export default connect()(AddCard)