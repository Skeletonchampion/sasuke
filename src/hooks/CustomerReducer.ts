import jwt_decode from "jwt-decode";

export function customerReducer(state: CustomerState, Action: Action) {
    switch(Action.type) {
        case "CUSTOMER_VALID":
            return {
                ...state
            }
        case "CUSTOMER_AUTHORIZE":
            const { accessToken } = Action.payload;
            const decoded: DecodedPayload = jwt_decode(accessToken);
            const { username, createdAt } = decoded;
            const customer = { username, createdAt };
            return {
                ...state,
                customer,
                accessToken,
            }
        case "CUSTOMER_UNAUTHORIZE":
            return {
                customer: {},
                accessToken: ""
            }
        default:
            throw new Error();
    }
}

export const customerInitialState = {
    customer: {},
    accessToken: "",
}