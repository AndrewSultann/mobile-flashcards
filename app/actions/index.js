import { getDecks } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}

// card must be an object with question and answer
export function addCard(title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}


// try make an action to deleteCard

export function handleInitialData() {
    return dispatch => {
        return getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
    }
}