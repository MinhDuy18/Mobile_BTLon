import React, { createContext, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioURL, setAudioURL] = useState(""); // URL của audio đang phát
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát/nghỉ của audio

  return (
    <AudioContext.Provider
      value={{
        audioURL,
        setAudioURL,
        isPlaying,
        setIsPlaying
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
