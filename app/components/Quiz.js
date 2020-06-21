import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { blue, gray, white } from '../utils/colors'
import { ceil } from 'react-native-reanimated'

class Quiz extends React.Component {
    state = {
        showAnswer: false,
        questionsCounter: 0,
        correctAnswers: 0,
    }
    nextQuestion = (isCorrect) => {
        if (isCorrect) {
            this.setState((currentState) => ({
                correctAnswers: currentState.correctAnswers + 1
            }))
            console.log(this.state.correctAnswers)
        }
        this.setState((currentState) => ({
            questionsCounter: currentState.questionsCounter + 1
        }))
    }
    render() {
        const { questions } = this.props.deck
        const { showAnswer, questionsCounter } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Test yourself by recalling the answers</Text>

                {questions || questionsCounter
                    ? (
                        <View>
                            {!showAnswer
                                ? <View style={styles.card}>
                                    <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 35 }}>Question #{questionsCounter + 1}</Text>
                                    <Text style={{ fontSize: 24, textAlign: "center" }} > {questions[questionsCounter].question}</Text>
                                </View>

                                : <View style={styles.card}>
                                    <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 35 }}>Answer</Text>
                                    <Text style={{ fontSize: 24, textAlign: "center" }} > {questions[questionsCounter].answer}</Text>
                                </View>
                            }

                            <View style={{ flex: 1, alignItems: "center", marginTop: 80 }}>
                                <TouchableOpacity
                                    style={styles.showAnswerBtn}
                                    onPress={() => this.setState({ showAnswer: !showAnswer })}
                                // disabled={showAnswer}
                                >
                                    <Text style={styles.btnText}>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        style={[styles.rateBtn, { backgroundColor: 'red', marginRight: 15 }]}
                                        onPress={() => this.nextQuestion(false)}
                                    >
                                        <Text style={[styles.btnText, { fontSize: 16 }]}>Wrong Answer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.rateBtn}
                                        onPress={() => this.nextQuestion(true)}
                                    >
                                        <Text style={[styles.btnText, { fontSize: 16 }]}>Correct Answer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                    : (
                        <View></View>
                    )
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        paddingTop: 20,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 60
    },
    card: {
        backgroundColor: white,
        width: 400,
        maxWidth: 400,
        height: 200,
        padding: 15,
        paddingRight: 30,
        paddingLeft: 30,
    },
    showAnswerBtn: {
        backgroundColor: blue,
        width: 200,
        borderRadius: 3,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 40,
    },
    rateBtn: {
        backgroundColor: 'green',
        width: 160,
        borderRadius: 3,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },
    btnText: {
        color: white,
        textAlign: 'center',
        fontSize: 22,

    }

})

function mapStateToProps(state, { route }) {
    const title = route.params.title
    return {
        deck: state[title]
    }
}
export default connect(mapStateToProps)(Quiz)