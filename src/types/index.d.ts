interface Customer {
    username: string;
    createdAt: Date;
    email: string;
    phoneNumber: string;
    address: string;
    isAdmin: boolean;
}
interface LoginState {
    username: string;
    password: string;
    isLoading: boolean;
    isError: boolean;
    message: string;
    error: string;
}
interface RegisterState {
    username: string;
    password: string;
    password2: string;
    isLoading: boolean;
    isError: boolean;
    message: string;
    error: string;
}
interface CustomerState {
    customer: Customer | {};
    accessToken: string;
}

interface Action {
    type: string;
    [key: string]: any;
}

interface DefaultContext {
    [key: string]: string;
}

interface ContextProviderProps {
    children: React.ReactNode;
}

interface DecodedPayload {
    username: string,
    createdAt: Date
}

interface BodyProps {
    [key: string]: React.ReactNode;
}