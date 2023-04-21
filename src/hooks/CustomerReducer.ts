import jwt_decode from "jwt-decode";

export function customerReducer(state: CustomerState, Action: Action): CustomerState {
    switch (Action.type) {
        case "CUSTOMER_VALID":
            return {
                ...state
            }
        case "CUSTOMER_AUTHORIZE": {
            const { accessToken } = Action.payload;
            const decoded: Customer = jwt_decode(accessToken);
            return {
                customer: decoded,
                accessToken
            };
        }
        case "CUSTOMER_UNAUTHORIZE":
            return customerInitialState;
        case "CUSTOMER_ADD_ITEM": {
            const cart = state.customer.cart;
            const bookID = Action.payload;

            const existingCartItemIndex = cart.findIndex((item) => item.bookID === bookID);
            if (existingCartItemIndex === -1) {
                cart.push({ bookID, quantity: 1 });
            } else {
                ++cart[existingCartItemIndex].quantity;
            }

            return {
                ...state
            }
        }
        case "CUSTOMER_REMOVE_ITEM": {
            const cart = state.customer.cart;
            const bookID = Action.payload;

            const existingCartItemIndex = cart.findIndex((item) => item.bookID === bookID);

            if (existingCartItemIndex !== -1) {
                if (cart[existingCartItemIndex].quantity > 1) {
                    --cart[existingCartItemIndex].quantity;
                } else {
                    cart.splice(existingCartItemIndex, 1);
                }
            }

            return {
                ...state
            };
        }
        case "CUSTOMER_UPDATE_DETAILS": {
            const { fullname, address, phoneNumber, email } = Action.payload;

            
        }
        case "CUSTOMER_PLACE_ORDER": {
            const newState = {...state};
            newState.customer.cart = Action.payload;

            return newState;
        }
        default:
            throw new Error();
    }
}

export const customerInitialState: CustomerState = {
    customer: {
        _id: "",
        username: "",
        createdAt: new Date(),
        fullname: "",
        email: "",
        phoneNumber: "",
        address: "",
        isAdmin: false,
        cart: []
    },
    accessToken: "",
}