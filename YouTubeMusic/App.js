import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useState } from "react";
import MiniPlay from "./components/MiniPlayer";
import { SongProvider } from "./components/SongContext";
import BottomTab from "./components/BottomTab";
export default function App() {
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

