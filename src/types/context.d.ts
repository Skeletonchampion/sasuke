interface AuthContext {
    loginState: LoginState;
    loginDispatch: React.Dispatch<Action>;
    performLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>;

    registerState: RegisterState;
    registerDispatch: React.Dispatch<Action>;
    performRegister: (e: FormEvent<HTMLFormElement>) => Promise<void>;

    checkAuth: () => Promise<void>;
    performLogout: () => void;
}

interface CustomerContext {
    customerState: CustomerState;
    customerDispatch: React.Dispatch<Action>;
    authConfig: object;
    handleAddItemToCart: (bookID: string) => void;
    handleRemoveItemFromCart: (bookID: string) => void;
    handleDeleteItemFromCart: (bookID: string) => void;
    handleUpdateCustomer: any;
    handlePlaceOrder: any;
}