import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false)
    return (
        <AuthContext.Provider value={{username, loading, setUsername, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}