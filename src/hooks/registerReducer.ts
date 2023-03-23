export const registerReducer = (state: RegisterState, Action: Action) => {
    switch (Action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [Action.field]: Action.payload.field
            }
        case "REGISTER":
            return {
                ...state,
                isLoading: true,
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                username: "",
                password: "",
                password2: "",
                isLoading: false,
                isError: false,
                error: "",
            }
        case "REGISTER_FAILURE":
            return {
                ...state,
                username: "",
                password: "",
                password2: "",
                isLoading: false,
                isError: true,
                message: "",
                error: Action.payload
            }
        default:
            throw new Error();
    }
}

export const registerInitialState = {
    username: "",
    password: "",
    password2: "",
    isLoading: false,
    isError: false,
    message: "",
    error: ""
}