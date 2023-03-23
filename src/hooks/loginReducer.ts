export const loginReducer = (state: LoginState, Action: Action) => {
    switch (Action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [Action.field]: Action.payload.field
            }
        case "LOGIN":
            return {
                ...state,
                isLoading: true,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                username: "",
                password: "",
                isLoading: false,
                isError: false,
                error: "",
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                username: "",
                password: "",
                isLoading: false,
                isError: true,
                message: "",
                error: Action.payload
            }
        default:
            throw new Error();
    }
}

export const loginInitialState: LoginState = {
    username: "",
    password: "",
    isLoading: false,
    isError: false,
    message: "",
    error: ""
}