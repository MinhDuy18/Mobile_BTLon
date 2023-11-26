import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {View} from "react-native";
import React, { createContext, useContext, useState } from "react";
import PlayList from "./components/PlayList";
import MiniPlay from "./components/MiniPlayer";
import { SongProvider, useSong } from "./components/SongContext";
const Tab = createBottomTabNavigator();

import React, { createContext, useState } from "react";
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

