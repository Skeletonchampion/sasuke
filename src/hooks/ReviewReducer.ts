interface ReviewState {
    isEnabled: boolean,
    isLoading: boolean;
    isRefreshed: boolean;
    comment: string;
    rating: number;
}

export function ReviewReducer(state: ReviewState, Action: Action) {
    switch (Action.type) {
        case "SET_FIELD": {
            const { field, payload } = Action;
            
            return { ...state, [field]: payload };
        }
        case "OPEN_REVIEW": {
            return { ...ReviewInitialState, isEnabled: true };
        }
        case "FINISH_REVIEW": {
            return ReviewInitialState;
        }
        case "CLEAR_REVIEW": {
            return ReviewInitialState;
        }
        default: {
            throw new Error();
        }
    }
}

export const ReviewInitialState: ReviewState = {
    isEnabled: false,
    isLoading: false,
    isRefreshed: false,
    comment: "",
    rating: 5
}