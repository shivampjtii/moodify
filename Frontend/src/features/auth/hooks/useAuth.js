import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {login, register, getMe, logout} from "../services/auth.api.js"
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {username, loading, setUsername, setLoading} = context;
    async function handleLogin({username, email, password}){
        setLoading(true);
        const data = await login({username, email, password});
        setUsername(data.user);
        setLoading(false);
    }
    async function handleRegister({username, email, password}){
        setLoading(true);
        const data = await register({username, email, password});
        setUsername(data.user);
        setLoading(false);
    }
    async function handleGetMe(){
        try {
            setLoading(true);
            const data = await getMe();
            setUsername(data.user);
        } catch (err) {
            setUsername(null);
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    }
    async function handleLogout(){
        setLoading(true);
        const data = await logout();
        setUsername(null);
        setLoading(false);
    }

    useEffect( ()=>{
        handleGetMe();
    },[])
    return ({
        username, loading, handleGetMe, handleLogin, handleLogout, handleRegister
    })
}