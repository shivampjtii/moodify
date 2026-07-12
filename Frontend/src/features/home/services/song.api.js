import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// export const uploadSong = async ()=>{
//     const song = await api.post("/",{

//     })
// }

export const getSong = async ({mood})=>{
    const response = await api.get("/api/song?mood="+mood);
    return response.data;
}

