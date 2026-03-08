import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({children}) =>{

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/shivamPjti/cohort-2/moodify/songs/Chot_Dil_Pe_Lagi__From__Ishq_Vishk_Rebound____DownloadMing.WS__IknL2rNxu.mp3",
        "posterUrl": "https://ik.imagekit.io/shivamPjti/cohort-2/moodify/posters/Chot_Dil_Pe_Lagi__From__Ishq_Vishk_Rebound____DownloadMing.WS__Rj9dMtLay.jpeg",
        "title": "Chot Dil Pe Lagi (From \"Ishq Vishk Rebound\") [DownloadMing.WS]",
        "mood": "happy",
    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{loading, setLoading, song, setSong}}>
            {children}
        </SongContext.Provider>
    )
}