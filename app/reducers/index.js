import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions/index'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case ADD_DECK:
            // I also need to add the questions object
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }

            }

        case DELETE_DECK:
            // brilliant
            const { titleId } = action;
            const { [titleId]: value, ...restDeck } = state;
            return restDeck;

        // doesn't work :(
        // const obj = state
        // const predicate = action.titleId
        // return Object.filter = (obj, predicate) =>
        //     Object.keys(obj)
        //         .filter(key => predicate(obj[key]))
        //         .reduce((res, key) => (res[key] = obj[key], res), {})

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