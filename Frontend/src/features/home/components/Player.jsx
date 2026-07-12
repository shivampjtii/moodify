import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SongContext } from "../song.context";
import { useSong } from "../hooks/useSong";
import "./player.scss";

const playbackRates = [0.75, 1, 1.25, 1.5];

const Player = () => {
  const audioRef = useRef(null);
  const { song } = useSong();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [queue, setQueue] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSong = useMemo(() => {
    if (!queue.length) return song;
    return queue[activeIndex] || song;
  }, [activeIndex, queue, song]);

  useEffect(() => {
    if (!song?.url) return;

    setQueue((prev) => {
      if (prev.some((item) => item.url === song.url)) return prev;
      return [song, ...prev].slice(0, 6);
    });
    setActiveIndex(0);
  }, [song?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;
  }, [playbackRate, currentSong?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.url) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      handleNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong?.url]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Unable to play audio", error);
    }
  };

  const seek = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const stepBy = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || audio.duration || 0);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleNext = () => {
    if (!queue.length) return;
    setActiveIndex((prev) => (prev + 1) % queue.length);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    if (!queue.length) return;
    setActiveIndex((prev) => (prev - 1 + queue.length) % queue.length);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (value) => {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player-shell">
      <audio ref={audioRef} src={currentSong?.url} preload="metadata" />
      <div className="player-card">
        <img
          className="player-cover"
          src={currentSong?.posterUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80"}
          alt={currentSong?.title || "Now playing"}
        />

        <div className="player-details">
          <span className="player-badge">● {currentSong?.mood || "chill"}</span>
          <h3 className="player-title">{currentSong?.title || "Moodify player"}</h3>
          <p className="player-subtitle">Modern listening experience with smart controls</p>

          <div className="player-progress-wrap">
            <input
              className="player-timeline"
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(event) => seek(Number(event.target.value))}
            />
            <div className="player-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-controls">
            <div className="control-group">
              <button className="control-btn" onClick={() => stepBy(-5)} aria-label="Rewind 5 seconds">
                ⏪
              </button>
              <button className="control-btn primary" onClick={togglePlay} aria-label="Play or pause">
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className="control-btn" onClick={() => stepBy(5)} aria-label="Forward 5 seconds">
                ⏩
              </button>
            </div>

            <div className="control-group">
              <div className="speed-group">
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    className={`speed-btn ${playbackRate === rate ? "active" : ""}`}
                    onClick={() => setPlaybackRate(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="player-controls">
            <div className="control-group">
              <button className="control-btn" onClick={handlePrevious} aria-label="Previous song">
                ⏮
              </button>
              <button className="control-btn" onClick={handleNext} aria-label="Next song">
                ⏭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;