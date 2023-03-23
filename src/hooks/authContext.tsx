import axios from 'axios';
import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { loginReducer, loginInitialState } from './loginReducer';
import { registerReducer, registerInitialState } from './registerReducer';
import { useGlobal } from './globalContext';
import { useCustomer } from './CustomerContext';

const AuthContext = React.createContext<AuthContext | null>(null);

export const useAuth = () => {
    return React.useContext(AuthContext) as AuthContext;
}

export function AuthProvider({children}: ContextProviderProps) {
    const navigate = useNavigate();
    const [loginState, loginDispatch] = React.useReducer(loginReducer, loginInitialState);
    const [registerState, registerDispatch] = React.useReducer(registerReducer, registerInitialState);
    const { customerState, customerDispatch = () => {}, authConfig } = useCustomer();
    const { URL, POST_LOGIN, POST_REGISTER, POST_TOKEN } = useGlobal();

    const performLogin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            
            const { username, password } = loginState;

            loginDispatch({ type: "LOGIN" });
            const { data } = await axios.post(`${URL}/${POST_LOGIN}`, {username, password});
            
            const { accessToken, err } = data;

            if(err) {
                return loginDispatch({ type: "LOGIN_FAILURE", payload: err });
            }

            loginDispatch({ type: "LOGIN_SUCCESS" });
            customerDispatch({ type: "CUSTOMER_AUTHORIZE", payload: {
                accessToken
            }});
            navigate("/");
        }
        catch(err: any) {
            throw new Error(err);
        }
    }

    const performRegister = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const { username, password, password2 } = registerState;

            if(password !== password2) {
                return registerDispatch({ type: "REGISTER_FAILURE", payload: "Two passwords do not match!" });
            }
            registerDispatch({ type: "REGISTER" });
            const { data } = await axios.post(`${URL}/${POST_REGISTER}`, { username: username, password: password });
            const { message, err } = data;

            if(err) {
                return registerDispatch({ type: "REGISTER_FAILURE", payload: err });
            }

            registerDispatch({ type: "REGISTER_SUCCESS" });
            navigate("/");
        }
        catch(err: any) {
            throw new Error(err);
        }
    }

    const checkAuth = async () => {
        try {
            if(!customerState?.accessToken) {
                return authorizeUser();
            }

            // const isTokenExpired = checkIsTokenExpired(userState.accessToken);
            // if(isTokenExpired) {
            //     return authorizeUser();
            // }

            customerDispatch({ type: "CUSTOMER_VALID" });
        }
        catch(err) {
            customerDispatch({ type: "CUSTOMER_UNAUTHORIZE" });
            navigate("/");
            // throw new Error(err);
        }
    }

    const authorizeUser = async () => {
        try {
            const { data } = await axios.post(`${URL}/${POST_TOKEN}`, authConfig);
            const { accessToken } = data;

            customerDispatch({ type: "CUSTOMER_AUTHORIZE", payload: {
                accessToken
            }});
        }
        catch(err) {
            customerDispatch({ type: "CUSTOMER_UNAUTHORIZE" });
            // navigate("/"); 
            // throw new Error(err);
        }
    }

    const performLogout = () => {
        Cookies.remove("refreshToken");
        customerState.accessToken = "";
    }

    return (
        <AuthContext.Provider value={{loginState, loginDispatch, performLogin, checkAuth, performLogout,
                                      registerState, registerDispatch, performRegister}}>
            {children}
        </AuthContext.Provider>
    )
}
