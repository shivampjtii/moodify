import axois from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})
export const register = async ({username, email, password})=>{
    const res = await api.post("/register",{
        username,
        email,
        password
    });
    return res.data;
}
export const register = async ({email, password})=>{
    const res = await api.post("/login",{
        email,
        password
    });
    return res.data;
}
export const getMe = async ()=>{
    const res = await api.get("/me");
    return res.data;
}
export const logout = async ()=>{
    const res = await api.get("/logout");
    return res.data;
}