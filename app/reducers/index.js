import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions/index'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case ADD_DECK:
            return {
                ...state,
                ...action.title
            }

        case DELETE_DECK:
            // brilliant
            const { [action.title]: value, ...rest } = state
            return rest

        case ADD_CARD:
            const { card, title } = action
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [
                        ...state[title].questions,
                        card
                    ]
                }
            }
    }
}

export default decks