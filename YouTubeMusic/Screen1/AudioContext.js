// AudioContext.js

import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false); 

  return (
    <AudioContext.Provider value={{ currentSong, setCurrentSong, isMinimized, setIsMinimized }}>
    {children}
  </AudioContext.Provider>
  );
};
