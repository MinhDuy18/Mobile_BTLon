import { NavigationContainer } from "@react-navigation/native";

import React, { createContext, useState } from "react";
import MiniPlay from "./components/MiniPlayer";
import { SongProvider } from "./components/SongContext";
import BottomTab from "./components/BottomTab";
export default function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [song, setSong] = useState({});

  return (
    <SongProvider>
        <NavigationContainer>
          <BottomTab />
          <MiniPlay song={song} />
        </NavigationContainer>
    </SongProvider>
  );
}
