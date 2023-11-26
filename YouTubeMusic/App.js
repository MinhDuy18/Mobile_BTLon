import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import playPage from './Screen1/playPage';
import listPlay from './Screen1/listPlay';
import { AudioProvider } from './Screen1/AudioContext';

<<<<<<< Updated upstream
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
=======
import HomeScreen from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {View} from "react-native";
import React, { createContext, useContext, useState } from "react";
import PlayList from "./components/PlayList";
import { SongProvider, useSong } from "./components/SongContext";
import MiniPlay from "./components/MiniPlayer";
import BottomTab from "./components/BottomTab";
const Tab = createBottomTabNavigator();
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
>>>>>>> Stashed changes
}

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName='listPlay'>
          <Stack.Screen name="playPage" component={playPage} />
          <Stack.Screen name="listPlay" component={listPlay} />
        </Stack.Navigator>
      </NavigationContainer>
    </AudioProvider>

   
  );
}
