import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { blue, gray, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

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
        }
        this.setState((currentState) => ({
            questionsCounter: currentState.questionsCounter + 1,
            showAnswer: false
        }))

        // Notifications
        clearLocalNotification()
            .then(setLocalNotification)
    }
    repeatQuiz = () => {
        this.setState({ questionsCounter: 0, correctAnswers: 0, showAnswer: false })
        this.props.navigation.navigate('Quiz')
    }
    render() {
        const { questions } = this.props.deck
        const { showAnswer, questionsCounter, correctAnswers } = this.state
        return (
            <View style={styles.container}>
                {questions && questions.length > 0//If questions exist
                    ? (
                        questionsCounter < questions.length  // if questions are not finished
                            ? (
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={styles.title}>Test yourself by recalling the answers</Text>
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
                                            style={styles.btn}
                                            onPress={() => this.setState({ showAnswer: !showAnswer })}
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

                            : ( // if questions are finished
                                <View style={styles.container}>
                                    <Text style={[styles.title, { fontWeight: "bold" }]}>Your Score</Text>
                                    <View style={styles.scoreCard}>
                                        <Text style={[styles.scoreCardTxt,]}>{correctAnswers}</Text>
                                    </View>
                                    <Text style={styles.scoreText}>
                                        You have answered <Text>{correctAnswers} </Text>
                                    questions out of <Text>{questions.length}</Text> correctly
                                </Text>
                                    <View style={{ flexDirection: "row", marginTop: 100 }}>
                                        <TouchableOpacity
                                            style={[styles.scoreBtn, { marginRight: 15, backgroundColor: gray }]}
                                            onPress={() => this.props.navigation.navigate('DeckView')}

                                        >
                                            <Text style={[styles.btnText, { fontSize: 18 }]}>Go Back</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.scoreBtn]}
                                            onPress={this.repeatQuiz}
                                        >
                                            <Text style={[styles.btnText, { fontSize: 18 }]}>Repeat Quiz</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                    )
                    : ( // if questions don't exist
                        <View>
                            <Text style={styles.title}>No Cards In This Deck</Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => this.props.navigation.navigate('DeckView')}
                            >
                                <Text style={styles.btnText}>Add Cards</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingRight: 15,
        paddingLeft: 15,
    },
    title: {
        marginTop: 25,
        marginBottom: 60,
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.7)',
        textAlign: 'center'
    },
    card: {
        backgroundColor: white,
        width: 400,
        maxWidth: 350,
        height: 250,
        maxHeight: 400,
        padding: 15,
        paddingRight: 30,
        paddingLeft: 30,
    },
    btn: {
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

    },
    scoreCard: {
        backgroundColor: blue,
        width: 100,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3,
        marginBottom: 60,

    },
    scoreCardTxt: {
        color: white,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold"
    },
    scoreText: {
        fontSize: 20,
        textAlign: "center"
    },
    scoreBtn: {
        backgroundColor: blue,
        width: 150,
        borderRadius: 3,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
    }

})

function mapStateToProps(state, { route }) {
    const title = route.params.title
    return {
        deck: state[title]
    }
}
export default connect(mapStateToProps)(Quiz)