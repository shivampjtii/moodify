import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/shivamPjti/moodify/songs/Jatt_Mehkma__RiskyjaTT.CoM__Qp1tneYCx.mp3",
        "posterUrl": "https://ik.imagekit.io/shivamPjti/moodify/posters/Jatt_Mehkma__RiskyjaTT.CoM__yCmfkABYY.jpeg",
        "title": "Jatt Mehkma (RiskyjaTT.CoM)",
        "mood": "happy",
    });
    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider
            value={{ song, setSong, loading, setLoading }}
        >
            {children}
        </SongContext.Provider>
    );
};