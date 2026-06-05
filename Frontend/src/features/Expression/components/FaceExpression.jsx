import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../style.scss"


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression)
        onClick(expression)
    }


    return (
        <div className="video" style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "300px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button className="detect" onClick={handleClick} >Detect Expression</button>
        </div>
    );
}