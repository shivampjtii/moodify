import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({landmarkerRef, videoRef, streamRef}) => {
    // Load WASM
    const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Create Face Landmarker
    landmarkerRef.current = await FaceLandmarker.createFromOptions(
    vision,
    {
        baseOptions: {
        modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1
    }
    );

    // Start Camera
    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({landmarkerRef, videoRef, setExpression}) => {
    if (!landmarkerRef.current || !videoRef.current) return;

    const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    console.log(getScore("jawOpen"))

    let currentExpression = "Neutral 😐";

    if (smileLeft > 0.6 && smileRight > 0.6) {
        currentExpression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
        currentExpression = "surprised";
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
        currentExpression = "sad";
    }

    setExpression(currentExpression);

    return currentExpression
    }
};