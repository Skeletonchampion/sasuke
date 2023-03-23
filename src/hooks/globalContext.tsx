import axios from 'axios';
import React from 'react';

axios.defaults.withCredentials = true;

const GlobalContext = React.createContext<DefaultContext | null>(null);

export const useGlobal = () => {
    return React.useContext(GlobalContext) as DefaultContext;
}

export function GlobalProvider({ children }: ContextProviderProps) {
    const [URL, setURL] = React.useState("http://localhost:4000");
    const [ROUTE, setROUTE] = React.useState({
        POST_LOGIN: "auth/login",
        POST_REGISTER: "auth/register",
        POST_TOKEN: "auth/token"
    });
    const { POST_LOGIN, POST_REGISTER, POST_TOKEN } = ROUTE;

    return (
        <GlobalContext.Provider
        value={{URL, POST_LOGIN, POST_REGISTER, POST_TOKEN
                }}>
            {children}
        </GlobalContext.Provider>
    )
}
