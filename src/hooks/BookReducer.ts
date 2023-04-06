export function BookReducer(state: BookState[], Action: Action) {
    switch (Action.type) {
        case "INITIALIZE_BOOKS": {
            return Action.payload;
        }
        case "ADD_BOOKS": {
            const payloadBooks = Action.payload;
            const newBooks = [...state, ...payloadBooks];
            return newBooks;
        }
        default: {
            throw new Error();
        }
    }
}

export const BookInitialState: BookState | [] = []